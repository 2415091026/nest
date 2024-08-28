import { PartialType } from '@nestjs/mapped-types';
import { CreateFormatDateDto } from './create-format-date.dto';

export class UpdateFormatDateDto extends PartialType(CreateFormatDateDto) {}
