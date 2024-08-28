import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, throwError } from 'rxjs';
import { Public } from 'src/public/public.decorator';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Inject(HttpService)
  private httpService: HttpService;
  @Public()
  @Get()
  async getWather(@Query('location') location: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=8ce662d03a414fde85dc2d6623122d24`,
      ),
    );
    const locationInfo = data?.['location']?.[0];

    if (!locationInfo) {
      throw new BadRequestException('没有对应的城市信息');
    }

    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://devapi.qweather.com/v7/weather/7d?location=${locationInfo.id}&key=8ce662d03a414fde85dc2d6623122d24`,
      ),
    );
    return { weatherData, location: locationInfo };
  }
  // 获取最近24小时天气
  @Public()
  @Get('/recently')
  async getRecentlyWeather(@Query('location') location: string) {
    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://devapi.qweather.com/v7/weather/24h?location=${location}&key=8ce662d03a414fde85dc2d6623122d24`,
      ),
    );
    return { weatherData };
  }
  // 获取预警消息
  @Public()
  @Get('warning')
  async getWarnings(@Query('location') location: string) {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://devapi.qweather.com/v7/warning/now?location=${location}&key=8ce662d03a414fde85dc2d6623122d24`,
      ),
    );
    return res.warning;
  }
  // 获取天气指数
  @Public()
  @Get('indices')
  async getIndices(
    @Query('type') type: string,
    @Query('location') location: string,
  ) {
    try {
      const { data: res } = await firstValueFrom(
        this.httpService.get(
          `https://devapi.qweather.com/v7/indices/1d?type=${type}&location=${location}&key=8ce662d03a414fde85dc2d6623122d24`,
        ),
      );
      return res.daily || [];
    } catch (error) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
  }
}
