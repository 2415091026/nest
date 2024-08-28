import { Injectable } from '@nestjs/common';
import { CreateFormatDateDto } from './dto/create-format-date.dto';
import { UpdateFormatDateDto } from './dto/update-format-date.dto';

@Injectable()
export class FormatDateService {
  create(createFormatDateDto: CreateFormatDateDto) {
    return 'This action adds a new formatDate';
  }

  getTime() {
    const today = new Date();
    const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const result = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i); // 计算未来的日期
      const formattedDate = date.toISOString().split('T')[0].slice(5); // 获取"MM-DD"格式的日期
      const weekDay = daysOfWeek[date.getDay()]; // 获取星期几
      let weekDesc;

      if (i === 0) {
        weekDesc = '今天';
      } else if (i === 1) {
        weekDesc = '明天';
      } else if (i === 2) {
        weekDesc = '后天';
      } else {
        weekDesc = weekDay;
      }

      result.push({
        date: formattedDate,
        week: weekDesc,
      });
    }
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} formatDate`;
  }

  update(id: number, updateFormatDateDto: UpdateFormatDateDto) {
    return `This action updates a #${id} formatDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} formatDate`;
  }
}
