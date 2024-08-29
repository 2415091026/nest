import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import encry from '../../utils/crypto';
import * as crypto from 'crypto';
import { Exclude } from 'class-transformer';
@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  username: string;

  @Exclude()
  @Column({ length: 200 })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  salt: string;

  @Column({ length: 200, nullable: true })
  location: string;

  @Column({ length: 200, nullable: true })
  avatar: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
