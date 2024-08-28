import { Inject, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, throwError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}
  @Inject(HttpService)
  private httpService: HttpService;
  create(createRegionDto: CreateRegionDto) {
    return 'This action adds a new region';
  }
  // 获取省市区
  async getRegion() {
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/address/list?app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    return res.data || [];
  }
  // 获取汽油价格信息
  async getOil(provinceName: string, querytime: string) {
    const data = await this.regionRepository.find({
      where: { province: provinceName },
    });
    const { data: res } = await firstValueFrom(
      this.httpService.get(
        `https://www.mxnzp.com/api/oil/search?province=${provinceName}&app_id=ejbxfbjsooghsvkh&app_secret=SSkG61aZpxVstCpxYTGmGHrZgezZcRnm`,
      ),
    );
    const time = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const exit = data.find((item) => {
      return item.time == time && item.province == provinceName;
    });
    if (exit) {
      const list = await this.regionRepository.findOne({
        where: { province: provinceName, time: querytime },
      });
      return list;
    }
    res.data.time = time;
    await this.regionRepository
      .createQueryBuilder()
      .insert()
      .into(Region)
      .values(res.data)
      .execute();
    const list = await this.regionRepository.findOne({
      where: { province: provinceName },
    });
    return list || [];
  }
  async getByName(name: string) {
    const data = await this.regionRepository.find({
      where: { province: name },
    });
    const list = data.map((item) => {
      let obj: any = {};
      obj.time = item.time;
      obj.t92 = item.t92;
      obj.t95 = item.t95;
      obj.t98 = item.t98;
      return obj;
    });
    return list;
  }
  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
