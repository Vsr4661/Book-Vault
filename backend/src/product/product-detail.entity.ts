import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_detail')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  specs: any;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  ratingsAvg: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  publicationDate: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ type: 'json', nullable: true })
  recommendations: any;

  @OneToOne(() => Product, product => product.productDetail)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}