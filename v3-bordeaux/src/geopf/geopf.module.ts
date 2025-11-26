import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeopfService } from './geopf.service';

@Module({
  imports: [HttpModule],
  providers: [GeopfService],
  exports: [GeopfService],
})
export class GeopfModule {}
