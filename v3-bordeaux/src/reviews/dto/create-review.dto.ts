export class CreateReviewDto {
  readonly userId: string;
  readonly stationId: string;
  readonly rating: number;
  readonly comment?: string;
}
