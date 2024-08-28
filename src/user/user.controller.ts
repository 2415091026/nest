import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { query } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/public/public.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findOne(@Query('username') username: string) {
    const data = this.userService.findOne(username);
    if (data) {
      return data;
    } else {
      throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);
    }
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  async getList(
    @Query('username') username: string,
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
  ) {
    const data = await this.userService.getList(pageSize, pageNum, username);
    console.log('🚀 ~ UserController ~ data:', data);
    return {
      list: data,
      total: data.length,
    };
  }

  @Post('edit')
  edit(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updated(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
