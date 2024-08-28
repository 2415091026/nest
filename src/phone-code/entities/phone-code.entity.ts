import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'phone-code',
})
export class PhoneCode {
  @PrimaryColumn()
  zhCn: string;

  @Column()
  enUs: string;

  @Column()
  phoneCode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
