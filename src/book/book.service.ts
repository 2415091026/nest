import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookService {
  @Inject(HttpService)
  private httpService: HttpService;
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async getCategory() {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        'https://www.mxnzp.com/api/story/types?app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm',
      ),
    );
    return res.data;
  }
  // 获取故事分类下的故事列表信息
  async getStoryList(type_id: number, page: number) {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/story/list?type_id=${type_id}&page=${page}&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return res.data;
  }
  // 获取故事详情数据
  async getStoryDetail(story_id: number) {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/story/details?story_id=${story_id}&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return res.data;
  }
  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
