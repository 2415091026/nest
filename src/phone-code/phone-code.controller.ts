import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PhoneCodeService } from './phone-code.service';
import { CreatePhoneCodeDto } from './dto/create-phone-code.dto';
import { UpdatePhoneCodeDto } from './dto/update-phone-code.dto';
import { Public } from 'src/public/public.decorator';

@Controller('phone-code')
export class PhoneCodeController {
  constructor(private readonly phoneCodeService: PhoneCodeService) {}

  @Post()
  create(@Body() createPhoneCodeDto: CreatePhoneCodeDto) {
    return this.phoneCodeService.create(createPhoneCodeDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.phoneCodeService.findAll();
  }
  @Public()
  @Get('/list')
  findByName(@Query('name') name: string) {
    return this.phoneCodeService.findByName(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhoneCodeDto: UpdatePhoneCodeDto,
  ) {
    return this.phoneCodeService.update(+id, updatePhoneCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneCodeService.remove(+id);
  }
}
