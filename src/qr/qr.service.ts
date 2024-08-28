import { Inject, Injectable } from '@nestjs/common';
import { CreateQrDto } from './dto/create-qr.dto';
import { UpdateQrDto } from './dto/update-qr.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QrService {
  @Inject(HttpService)
  private httpService: HttpService;
  async create(createQrDto: CreateQrDto) {
    const data = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/qrcode/create/single?content=${createQrDto.content}&size=${createQrDto.size}&type=${createQrDto.type}&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return data.data.data;
  }

  findAll() {
    return `This action returns all qr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qr`;
  }

  update(id: number, updateQrDto: UpdateQrDto) {
    return `This action updates a #${id} qr`;
  }

  remove(id: number) {
    return `This action removes a #${id} qr`;
  }
}
