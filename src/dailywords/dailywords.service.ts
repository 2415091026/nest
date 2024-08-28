import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DailywordsService {
  @Inject(HttpService)
  private httpService: HttpService;
  async getList() {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        'https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm',
      ),
    );
    return res.data[0];
  }
}
