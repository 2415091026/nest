import { Inject, Injectable } from '@nestjs/common';
import { CreatePhoneCodeDto } from './dto/create-phone-code.dto';
import { UpdatePhoneCodeDto } from './dto/update-phone-code.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneCode } from './entities/phone-code.entity';
import { Like, Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PhoneCodeService {
  constructor(
    @InjectRepository(PhoneCode)
    private phoneCodeRepository: Repository<PhoneCode>,
  ) {}

  @Inject(HttpService)
  private httpService: HttpService;
  create(createPhoneCodeDto: CreatePhoneCodeDto) {
    console.log(
      '🚀 ~ PhoneCodeService ~ create ~ createPhoneCodeDto:',
      createPhoneCodeDto,
    );
    return 'This action adds a new phoneCode';
  }

  async findAll() {
    // 先清空表数据
    this.phoneCodeRepository
      .createQueryBuilder()
      .delete()
      .from(PhoneCode)
      .execute();
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/phone_code/list?app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    // 批量插入数据
    if (res.data && Array.isArray(res.data)) {
      await this.phoneCodeRepository
        .createQueryBuilder()
        .insert()
        .into(PhoneCode)
        .values(res.data)
        .execute();
    }
    const list = await this.phoneCodeRepository.find();
    return list;
  }

  async findByName(name: string) {
    const data = await this.phoneCodeRepository.find({
      where: { zhCn: Like(`%${name}%`) },
    });
    return data || [];
  }

  update(id: number, updatePhoneCodeDto: UpdatePhoneCodeDto) {
    return `This action updates a #${id} phoneCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} phoneCode`;
  }
}
