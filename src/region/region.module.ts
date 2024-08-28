import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    TypeOrmModule.forFeature([Region]),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
