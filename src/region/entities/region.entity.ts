import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'gasoline',
})
export class Region {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  province: string;

  @Column()
  t89: string;

  @Column()
  t0: string;

  @Column()
  t92: string;

  @Column()
  t95: string;

  @Column({ comment: '98号汽油油价' })
  t98: string;

  @Column()
  time: string;
}
