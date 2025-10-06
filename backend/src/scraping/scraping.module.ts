import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapingService } from './scraping.service';
import { ScrapeJob } from './scrape-job.entity';
import { Navigation } from '../navigation/navigation.entity';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product/product-detail.entity';
import { Review } from '../product/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScrapeJob,
      Navigation,
      Category,
      Product,
      ProductDetail,
      Review,
    ]),
  ],
  providers: [ScrapingService],
  exports: [ScrapingService],
})
export class ScrapingModule {}