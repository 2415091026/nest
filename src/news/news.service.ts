import { Inject, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
  create(createNewsDto: CreateNewsDto) {
    return 'This action adds a new news';
  }

  findAll() {
    return `This action returns all news`;
  }

  async getDetails(newsId: number) {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/news/details/v2?&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm&newsId=${newsId}`,
      ),
    );
    return res.data;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
  @Inject(HttpService)
  private httpService: HttpService;
  async getType() {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/news/types/v2?&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return res.data;
  }

  async getList(typeId: string, page: string) {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/news/list/v2?typeId=${typeId}&page=${page}&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return res.data || [];
  }
}
