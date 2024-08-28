import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormatDateService } from './format-date.service';
import { CreateFormatDateDto } from './dto/create-format-date.dto';
import { UpdateFormatDateDto } from './dto/update-format-date.dto';
import { Public } from 'src/public/public.decorator';

@Controller('format-date')
export class FormatDateController {
  constructor(private readonly formatDateService: FormatDateService) {}

  @Post()
  create(@Body() createFormatDateDto: CreateFormatDateDto) {
    return this.formatDateService.create(createFormatDateDto);
  }
  @Public()
  @Get()
  getTime() {
    return this.formatDateService.getTime();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatDateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormatDateDto: UpdateFormatDateDto,
  ) {
    return this.formatDateService.update(+id, updateFormatDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatDateService.remove(+id);
  }
}
