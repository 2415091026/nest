import { Module } from '@nestjs/common';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  providers: [OssService],
  controllers: [OssController],
})
export class OssModule {}
