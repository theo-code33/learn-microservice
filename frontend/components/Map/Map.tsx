import { Point } from '@/types/map'
import dynamic from 'next/dynamic'

const MapLayer = dynamic(() => import('./components/MapLayer'), {
  ssr: false,
})


type MapProps = {
  points: Point[];
  zoom?: number;
  className?: string
}

export default function Map({ points, className, zoom }: MapProps) {
  return <MapLayer points={points} zoom={zoom} className={className} />
}