import { Test, TestingModule } from '@nestjs/testing';
import { DailywordsService } from './dailywords.service';

describe('DailywordsService', () => {
  let service: DailywordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailywordsService],
    }).compile();

    service = module.get<DailywordsService>(DailywordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
