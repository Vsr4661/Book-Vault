import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ScrapeJobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ScrapeTargetType {
  NAVIGATION = 'navigation',
  CATEGORY = 'category', 
  PRODUCT = 'product',
  PRODUCT_DETAIL = 'product_detail',
}

@Entity('scrape_job')
export class ScrapeJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetUrl: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  targetType: ScrapeTargetType;

  @Column({
    type: 'varchar',
    length: 50,
    default: ScrapeJobStatus.PENDING,
  })
  status: ScrapeJobStatus;

  @Column({ nullable: true })
  targetId: string;

  @Column({ type: 'datetime', nullable: true })
  startedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  finishedAt: Date;

  @Column({ type: 'text', nullable: true })
  errorLog: string;

  @Column({ type: 'json', nullable: true })
  result: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}