import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import encry from '../utils/crypto';
import * as crypto from 'crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    // 如果用户存在
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    console.log('🚀 ~ UserService ~ create ~ user:', user);
    if (user) throw new ApiException('用户已存在', ApiErrorCode.USER_IS_TEXIST);
    try {
      const salt = crypto.randomBytes(4).toString('base64');
      createUserDto.password = encry(createUserDto.password, salt);
      createUserDto.salt = salt;
      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    console.log('🚀 ~ UserService ~ findOne ~ user:', user);
    if (!user)
      throw new ApiException('用户不存在', ApiErrorCode.USER_IS_TEXIST);
    return user;
  }
  async updated(updatedUserDto: UpdateUserDto) {
    const data = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        username: updatedUserDto.username,
        location: updatedUserDto.location,
        avatar: updatedUserDto.avatar,
      })
      .where('id=:id', { id: updatedUserDto.id })
      .execute();
    if (data.affected == 0) {
      throw new ApiException('用户不存在', ApiErrorCode.USER_IS_TEXIST);
    }
  }
  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async getList(pageSize: number, pageNum: number, username: any) {
    const limit = pageSize;
    const offset = (pageNum - 1) * pageSize;
    return this.userRepository.find({
      where: { username: username },
      skip: offset,
      take: limit,
    });
  }
}
