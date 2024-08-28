import { Injectable, Inject } from '@nestjs/common';
import * as Client from 'ali-oss';
import * as dayjs from 'dayjs';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OssService {
  private client: any;
  public constructor() {
    this.client = new Client();
  }
  @Inject(HttpService)
  private httpService: HttpService;

  async getSignature() {
    let config = {};
    const client = new Client(config);
    const date = new Date(); // 时长加 1 天，作为签名的有限期
    date.setDate(date.getDate() + 1);
    const policy = {
      // 设置签名的有效期，格式为Unix时间戳
      expiration: date.toISOString(),
      conditions: [
        ['content-length-range', 0, 10485760000], // 设置上传文件的大小限制
      ],
    }; // 生成签名，策略等信息
    const formData = await client.calculatePostSignature(policy); // 生成 bucket 域名，客户端将向此地址发送请求
    const location = await client.getBucketLocation();
    const host = `http://${config.bucket}.${location.location}.aliyuncs.com`; // 响应给客户端的签名和策略等信息
    return {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host,
      dir: config.dir,
    };
  }
  async upload(file: any, files: any) {
    // await this.client.put('/images/' + files.originalname, files);
    const data = await this.getSignature();
    console.log('🚀 ~ OssService ~ upload ~ data:', data);
    const formdata = new FormData(); // 注意参数的顺序，key 必须是第一位，表示OSS存储文件的路径
    formdata.append('key', file.key);
    formdata.append('OSSAccessKeyId', data.accessId);
    formdata.append('policy', data.policy);
    formdata.append('signature', data.signature); // 文件上传成功默认返回 204 状态码，可根据需要修改为 200
    // formdata.append('success_action_status', '200'); // file 必须放在最后一位
    formdata.append('file', files[0]);
    console.log('🚀 ~ OssService ~ upload ~ formdata:', formdata);
    const res = await firstValueFrom(
      this.httpService.post(data.host, formdata),
    );
    console.log('🚀 ~ OssService ~ upload ~ res:', res);
  }
}
