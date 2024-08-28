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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public } from 'src/public/public.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  // 获取故事分类数据
  @Public()
  @Get('/category')
  getCategory() {
    return this.bookService.getCategory();
  }
  // 获取故事分类下的列表数据
  @Public()
  @Get('/story')
  getStoryList(@Query('typeId') typeId: number, @Query('page') page: number) {
    return this.bookService.getStoryList(typeId, page);
  }
  @Public()
  @Get('/details')
  getStoryDetail(@Query('storyId') storyId: number) {
    return this.bookService.getStoryDetail(storyId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
