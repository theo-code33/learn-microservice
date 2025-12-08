'use client';

import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';
import { memo } from 'react';

import iconBike from '@/public/bike.svg';
import { cn } from '@/lib/utils';
import { Point, PointDisplay } from '@/types/map';
import { useMemo } from 'react';
import MapController from './MapController';

type Props = {
  points: Point[];
  className?: string;
  zoom?: number;
};

const MapLayer = ({ points, zoom = 12.5, className }: Props) => {
  const currentZoom = useMemo(() => {
    return zoom;
  }, [zoom]);

  const center = useMemo(() => {
    return points[0] || { lat: 0, lng: 0 };
  }, [points]);

  const icon = useMemo(() => {
    return L.icon({
      iconUrl: iconBike.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  }, []);

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <MapContainer
      zoom={currentZoom}
      zoomAnimation={true}
      center={[center.lat, center.lng]}
      scrollWheelZoom={false}
      className={cn("min-h-[300px] h-max w-full z-10", className)}
    >
      <MapController
        center={[center.lat, center.lng]}
        zoom={currentZoom}
      />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {
        points.map((point) =>
          point.display === PointDisplay.MARKER ? (
            <Marker
              key={`marker-${point.lat}-${point.lng}-${point.id ?? ''}`}
              position={[point.lat, point.lng]}
              icon={icon}
              eventHandlers={{
                click: point.onClick,
              }}
            >
              <Popup>
                Adresse: {point.address} <br />
                Vélos disponibles: {point.freebikes} <br />
                Emplacements libres: {point.empty_slots} <br />
                Avis: {point.reviewAverage ? ` ${point.reviewAverage}/5` : ' Aucun avis'}
              </Popup>
            </Marker>
          ) : point.display === PointDisplay.CIRCLE ? (
            <Circle
              key={`circle-${point.lat}-${point.lng}-${point.id ?? ''}`}
              center={[point.lat, point.lng]}
              radius={point.radius}
              fillOpacity={0.4}
            />
          ) : null,
        )
      }
    </MapContainer >
  );
}

export default memo(MapLayer);
