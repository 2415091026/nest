import { Controller, Get } from '@nestjs/common';
import { DailywordsService } from './dailywords.service';

@Controller('dailywords')
export class DailywordsController {
  constructor(private readonly dailywordsService: DailywordsService) {}
  @Get()
  getList() {
    return this.dailywordsService.getList();
  }
}
