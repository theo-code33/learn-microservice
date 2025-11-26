import { Injectable } from '@nestjs/common';
import { API_CITYBIK_URL } from './constant';
import { HttpService } from '@nestjs/axios';
import { ResponseApiCityBik, Stations } from './types';
import { GeopfService } from 'src/geopf/geopf.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly geopfService: GeopfService,
  ) {}

  getStations(): Promise<Stations> {
    const stations = this.httpService.axiosRef
      .get<ResponseApiCityBik>(API_CITYBIK_URL)
      .then((response) => response.data.network.stations);
    return stations;
  }

  async searchStations(
    address: string,
    wishes: 'rent' | 'return',
  ): Promise<{
    centerCoordinates: { latitude: number; longitude: number };
    stations: Stations;
  }> {
    const stations = await this.getStations();
    const coords = await this.geopfService.getAddressInfo(address);
    if (!coords) {
      return {
        centerCoordinates: {
          latitude: 44.837789,
          longitude: -0.57918,
        },
        stations: [],
      };
    }
    let availableStations: Stations = [];
    const { x, y } = coords;

    let radiusInKm = 1;
    const maxRadiusKm = 10;

    while (radiusInKm <= maxRadiusKm) {
      const radiusInDegrees = radiusInKm / 111;

      const stationsWithinRadius = stations.filter((station) => {
        const latDiff = Number(station.latitude) - y;
        const lngDiff = Number(station.longitude) - x;
        return (
          latDiff * latDiff + lngDiff * lngDiff <=
          radiusInDegrees * radiusInDegrees
        );
      });

      availableStations = stationsWithinRadius.filter((station) =>
        wishes === 'rent'
          ? Number(station.free_bikes) > 0
          : Number(station.empty_slots) > 0,
      );

      if (availableStations.length > 0) {
        break;
      }

      radiusInKm += 1;
    }

    return {
      centerCoordinates: { latitude: y, longitude: x },
      stations: availableStations,
    };
  }
}
