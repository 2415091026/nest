import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HistoryService {
  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }
  @Inject(HttpService)
  private httpService: HttpService;
  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get(
        'https://www.mxnzp.com/api/history/today?type=1&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm',
      ),
    );
    return data.data;
  }

  findOne() {
    return '123';
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
