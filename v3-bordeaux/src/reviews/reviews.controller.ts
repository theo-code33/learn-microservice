import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@User() user: any, @Body() createReviewDto: CreateReviewDto) {
    console.log(user);

    return this.reviewsService.createReview({
      ...createReviewDto,
      userId: user.sub,
    });
  }

  @Get('station/:stationId')
  getReviewsByStation(stationId: string) {
    return this.reviewsService.getReviewsByStation(stationId);
  }

  @Get('stations/avg')
  getAverageReviewsForAllStations() {
    return this.reviewsService.getAverageRatingsForAllStations();
  }
}
