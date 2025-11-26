import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AddressResult } from './types';

@Injectable()
export class GeopfService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressInfo(address: string): Promise<AddressResult> {
    if (!address) {
      throw new Error('address parameter is required');
    }
    const response = await this.httpService.axiosRef
      .get<{
        results: AddressResult[];
      }>(
        `https://data.geopf.fr/geocodage/completion/?text=${address}&&terr=DOMTOM,METROPOLE&type=StreetAddress&maximumResponses=1`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => res.data);
    return response.results[0];
  }
}
