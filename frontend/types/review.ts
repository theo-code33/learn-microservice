export type Review = {
  id: string;
  userId: string;
  stationId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}