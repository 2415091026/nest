import { Module } from '@nestjs/common';
import { PhoneCodeService } from './phone-code.service';
import { PhoneCodeController } from './phone-code.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneCode } from './entities/phone-code.entity';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    TypeOrmModule.forFeature([PhoneCode]),
  ],
  controllers: [PhoneCodeController],
  providers: [PhoneCodeService],
})
export class PhoneCodeModule {}
