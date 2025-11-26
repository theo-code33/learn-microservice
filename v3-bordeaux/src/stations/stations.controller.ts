import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async getStations() {
    return this.stationsService.getStations();
  }

  @Get('search')
  async searchStations(
    @Query('address') address: string,
    @Query('wishes') wishes: 'rent' | 'return',
  ) {
    if (!address) {
      throw new Error('address parameter is required');
    }
    try {
      const data = await this.stationsService.searchStations(address, wishes);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search stations');
    }
  }
}
