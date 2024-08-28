import { Test, TestingModule } from '@nestjs/testing';
import { DailywordsController } from './dailywords.controller';
import { DailywordsService } from './dailywords.service';

describe('DailywordsController', () => {
  let controller: DailywordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailywordsController],
      providers: [DailywordsService],
    }).compile();

    controller = module.get<DailywordsController>(DailywordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
