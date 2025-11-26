import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async getReviewsByStation(stationId: string): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { stationId } });
  }

  async getAverageRating(stationId: string): Promise<number> {
    const { avg } = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.stationId = :stationId', { stationId })
      .getRawOne();
    return parseFloat(avg as string) || 0;
  }

  async getAverageRatingsForAllStations(): Promise<Record<string, number>> {
    const results = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('review.stationId', 'stationId')
      .addSelect('AVG(review.rating)', 'averageRating')
      .groupBy('review.stationId')
      .getRawMany();

    // create an object with stationId as key and averageRating as value
    const resultObj: { [key: string]: number } = {};
    results.forEach((result) => {
      resultObj[result.stationId] =
        parseFloat(result.averageRating as string) || 0;
    });

    return resultObj;
  }
}
