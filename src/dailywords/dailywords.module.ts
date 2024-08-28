import { Module } from '@nestjs/common';
import { DailywordsService } from './dailywords.service';
import { DailywordsController } from './dailywords.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  controllers: [DailywordsController],
  providers: [DailywordsService],
})
export class DailywordsModule {}
