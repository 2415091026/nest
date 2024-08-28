import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { OssService } from './oss.service';
import { Public } from 'src/public/public.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
@Controller('oss')
export class OssController {
  constructor(private oss: OssService) {}
  @Public()
  @Post('signature')
  getOssSignature() {
    return this.oss.getSignature();
  }

  @Public()
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/' }))
  upload(
    @Body() file: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('🚀 ~ OssController ~ file:', file);
    console.log('🚀 ~ OssController ~ files:', typeof files);

    return this.oss.upload(file, files);
  }
}
