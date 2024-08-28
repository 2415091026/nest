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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Public } from 'src/public/public.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }
  @Public()
  @Get('/type')
  getType() {
    return this.newsService.getType();
  }
  @Public()
  @Get('/list')
  getList(@Query('typeId') typeId: string, @Query('page') page: string) {
    return this.newsService.getList(typeId, page);
  }
  @Public()
  @Get(':newsId')
  getDetails(@Param('newsId') newsId: string) {
    return this.newsService.getDetails(+newsId);
  }
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
