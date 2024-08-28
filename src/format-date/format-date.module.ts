import { Module } from '@nestjs/common';
import { FormatDateService } from './format-date.service';
import { FormatDateController } from './format-date.controller';

@Module({
  controllers: [FormatDateController],
  providers: [FormatDateService],
})
export class FormatDateModule {}
