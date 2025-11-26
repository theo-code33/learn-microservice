import { Test, TestingModule } from '@nestjs/testing';
import { GeopfService } from './geopf.service';

describe('GeopfService', () => {
  let service: GeopfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeopfService],
    }).compile();

    service = module.get<GeopfService>(GeopfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
