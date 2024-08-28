import { Inject, Injectable } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HolidayService {
  @Inject(HttpService)
  private httpService: HttpService;
  create(createHolidayDto: CreateHolidayDto) {
    return 'This action adds a new holiday';
  }

  async getHoliday(dates: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/holiday/multi/${dates}?app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return data.data;
  }

  findOne(id: number) {
    return `This action returns a #${id} holiday`;
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return `This action updates a #${id} holiday`;
  }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}
