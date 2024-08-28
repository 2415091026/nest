import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './weather/weather.module';
import { OssModule } from './oss/oss.module';
import { HistoryModule } from './history/history.module';
import { QrModule } from './qr/qr.module';
import { NewsModule } from './news/news.module';
import { DailywordsModule } from './dailywords/dailywords.module';
import { FormatDateModule } from './format-date/format-date.module';
import { HolidayModule } from './holiday/holiday.module';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { RegionModule } from './region/region.module';
import { BookModule } from './book/book.module';
const isProd = process.env.NODE_ENV == 'production';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    ConfigModule.forRoot({
      envFilePath: [isProd ? path.resolve('.env.prod') : path.resolve('.env')],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      synchronize: true,
      autoLoadEntities: true, //自动加载实体
      host: 'localhost',
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: '123456', // 密码
      database: 'botany', //数据库名
      connectorPackage: 'mysql2',
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
    }),
    UserModule,
    AuthModule,
    WeatherModule,
    OssModule,
    HistoryModule,
    QrModule,
    NewsModule,
    DailywordsModule,
    FormatDateModule,
    HolidayModule,
    PhoneCodeModule,
    RegionModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
