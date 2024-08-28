import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Public } from 'src/public/public.decorator';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.regionService.getRegion();
  }

  @Public()
  @Get('/oil')
  getOil(
    @Query('provinceName') provinceName: string,
    @Query('time') time: string,
  ) {
    return this.regionService.getOil(provinceName, time);
  }

  // 根据名称获取
  @Public()
  @Get('/details')
  getByName(@Query('name') name: string) {
    return this.regionService.getByName(name);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
