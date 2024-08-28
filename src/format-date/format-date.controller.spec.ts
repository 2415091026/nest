import { Test, TestingModule } from '@nestjs/testing';
import { FormatDateController } from './format-date.controller';
import { FormatDateService } from './format-date.service';

describe('FormatDateController', () => {
  let controller: FormatDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatDateController],
      providers: [FormatDateService],
    }).compile();

    controller = module.get<FormatDateController>(FormatDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
