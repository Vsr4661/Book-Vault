import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Navigation } from '../navigation/navigation.entity';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product/product-detail.entity';
import { Review } from '../product/review.entity';
import { ScrapeJob } from '../scraping/scrape-job.entity';
import { ViewHistory } from '../common/view-history.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres' | 'sqlite' || 'sqlite',
  ...(process.env.DB_TYPE === 'postgres' ? {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'product_explorer',
  } : {
    database: process.env.DB_DATABASE || 'database.sqlite',
  }),
  entities: [
    Navigation,
    Category,
    Product,
    ProductDetail,
    Review,
    ScrapeJob,
    ViewHistory,
  ],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};