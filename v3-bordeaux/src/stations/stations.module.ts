import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { HttpModule } from '@nestjs/axios';
import { GeopfModule } from 'src/geopf/geopf.module';

@Module({
  imports: [HttpModule, GeopfModule],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
