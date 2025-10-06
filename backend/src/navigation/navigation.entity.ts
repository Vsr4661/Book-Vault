import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('navigation')
export class Navigation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'datetime', nullable: true })
  lastScrapedAt: Date;

  @OneToMany(() => Category, category => category.navigation)
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}