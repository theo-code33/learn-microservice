export enum PointDisplay {
    MARKER = 'marker',
    CIRCLE = 'circle',
  }
  
export type Point = {
    id: string;
    lat: number;
    lng: number;
    address: string;
    freebikes: number;
    empty_slots: number;
    reviewAverage?: number;
    onClick?: () => void;
  } & (
    | {
        display: PointDisplay.MARKER;
      }
    | {
        display: PointDisplay.CIRCLE;
        radius: number;
      }
  );