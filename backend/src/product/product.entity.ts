import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Category } from '../category/category.entity';
import { ProductDetail } from './product-detail.entity';
import { Review } from './review.entity';

@Entity('product')
@Index(['sourceId'], { unique: true })
@Index(['lastScrapedAt'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sourceId: string;

  @Column({ nullable: true })
  categoryId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ length: 3, default: 'GBP' })
  currency: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ unique: true })
  sourceUrl: string;

  @Column({ type: 'datetime', nullable: true })
  lastScrapedAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToOne(() => ProductDetail, productDetail => productDetail.product)
  productDetail: ProductDetail;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}