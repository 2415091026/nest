import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule.register({ timeout: 5000 }), ScheduleModule.forRoot()],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
