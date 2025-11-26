'use client'
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  center: [number, number];
  zoom: number;
};

export default function MapController({ center, zoom }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.2,
    });

  }, [center, zoom, map]);

  return null;
}
