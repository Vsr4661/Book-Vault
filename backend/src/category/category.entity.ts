import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Navigation } from '../navigation/navigation.entity';
import { Product } from '../product/product.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  navigationId: number;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'int', default: 0 })
  productCount: number;

  @Column({ type: 'datetime', nullable: true })
  lastScrapedAt: Date;

  @ManyToOne(() => Navigation, navigation => navigation.categories)
  @JoinColumn({ name: 'navigationId' })
  navigation: Navigation;

  @ManyToOne(() => Category, category => category.children)
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}