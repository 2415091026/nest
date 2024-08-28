import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  month: number;

  @Column()
  day: number;

  @Column()
  picUrl: string;

  @Column()
  details: string;
}
