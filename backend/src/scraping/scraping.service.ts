import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaywrightCrawler, Dataset } from 'crawlee';
import { Page } from 'playwright';
import { Navigation } from '../navigation/navigation.entity';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product/product-detail.entity';
import { Review } from '../product/review.entity';
import { ScrapeJob, ScrapeJobStatus, ScrapeTargetType } from './scrape-job.entity';

interface NavigationData {
  title: string;
  url: string;
  slug: string;
}

interface CategoryData {
  title: string;
  url: string;
  slug: string;
  navigationId: number;
  parentId?: number;
  productCount: number;
}

interface ProductData {
  sourceId: string;
  title: string;
  author?: string;
  price?: number;
  currency: string;
  imageUrl?: string;
  sourceUrl: string;
  categoryId?: number;
}

interface ProductDetailData {
  description?: string;
  specs?: any;
  ratingsAvg?: number;
  reviewsCount: number;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  recommendations?: any;
}

interface ReviewData {
  author?: string;
  rating?: number;
  text?: string;
  reviewDate?: Date;
}

@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);
  private readonly baseUrl = 'https://www.worldofbooks.com';

  constructor(
    @InjectRepository(Navigation)
    private navigationRepository: Repository<Navigation>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(ScrapeJob)
    private scrapeJobRepository: Repository<ScrapeJob>,
  ) {}

  async scrapeNavigation(): Promise<Navigation[]> {
    const job = await this.createScrapeJob(this.baseUrl, ScrapeTargetType.NAVIGATION);
    
    try {
      await this.updateJobStatus(job.id, ScrapeJobStatus.RUNNING);
      
      const crawler = new PlaywrightCrawler({
        requestHandlerTimeoutSecs: 60,
        maxRequestsPerCrawl: 10,
        requestHandler: async ({ page, request }) => {
          await this.handleNavigationScraping(page);
        },
      });

      await crawler.run([this.baseUrl]);
      
      await this.updateJobStatus(job.id, ScrapeJobStatus.COMPLETED);
      return await this.navigationRepository.find();
    } catch (error) {
      this.logger.error(`Navigation scraping failed: ${error.message}`, error.stack);
      await this.updateJobStatus(job.id, ScrapeJobStatus.FAILED, error.message);
      throw error;
    }
  }

  private async handleNavigationScraping(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    
    // Extract navigation elements - adjust selectors based on actual site structure
    const navigationElements = await page.evaluate(() => {
      const navItems: NavigationData[] = [];
      
      // Look for main navigation elements
      const navLinks = document.querySelectorAll('nav a, .navigation a, .main-nav a');
      
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        
        if (href && text && !href.startsWith('#') && !href.includes('mailto')) {
          const url = href.startsWith('http') ? href : `https://www.worldofbooks.com${href}`;
          navItems.push({
            title: text,
            url: url,
            slug: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          });
        }
      });
      
      return navItems;
    });

    // Save navigation items to database
    for (const navData of navigationElements) {
      await this.saveNavigation(navData);
    }
  }

  async scrapeCategory(categoryUrl: string, navigationId: number, parentId?: number): Promise<Category[]> {
    const job = await this.createScrapeJob(categoryUrl, ScrapeTargetType.CATEGORY);
    
    try {
      await this.updateJobStatus(job.id, ScrapeJobStatus.RUNNING);
      
      const crawler = new PlaywrightCrawler({
        requestHandlerTimeoutSecs: 60,
        maxRequestsPerCrawl: 50,
        requestHandler: async ({ page, request }) => {
          await this.handleCategoryScraping(page, navigationId, parentId);
        },
      });

      await crawler.run([categoryUrl]);
      
      await this.updateJobStatus(job.id, ScrapeJobStatus.COMPLETED);
      return await this.categoryRepository.find({ where: { navigationId } });
    } catch (error) {
      this.logger.error(`Category scraping failed: ${error.message}`, error.stack);
      await this.updateJobStatus(job.id, ScrapeJobStatus.FAILED, error.message);
      throw error;
    }
  }

  private async handleCategoryScraping(page: Page, navigationId: number, parentId?: number): Promise<void> {
    await page.waitForLoadState('networkidle');
    
    const categories = await page.evaluate(() => {
      const categoryData: CategoryData[] = [];
      
      // Look for category elements - adjust selectors based on actual site structure
      const categoryLinks = document.querySelectorAll('.category-link, .subcategory a, .category-list a');
      
      categoryLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        const countElement = link.querySelector('.count, .product-count');
        const count = countElement ? parseInt(countElement.textContent?.replace(/[^0-9]/g, '') || '0') : 0;
        
        if (href && text) {
          const url = href.startsWith('http') ? href : `https://www.worldofbooks.com${href}`;
          categoryData.push({
            title: text,
            url: url,
            slug: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            navigationId,
            parentId,
            productCount: count,
          });
        }
      });
      
      return categoryData;
    });

    // Save categories to database
    for (const categoryData of categories) {
      await this.saveCategory(categoryData);
    }
  }

  async scrapeProducts(categoryUrl: string, categoryId: number, limit = 20, offset = 0): Promise<Product[]> {
    const job = await this.createScrapeJob(categoryUrl, ScrapeTargetType.PRODUCT);
    
    try {
      await this.updateJobStatus(job.id, ScrapeJobStatus.RUNNING);
      
      const crawler = new PlaywrightCrawler({
        requestHandlerTimeoutSecs: 60,
        maxRequestsPerCrawl: 10,
        requestHandler: async ({ page, request }) => {
          await this.handleProductScraping(page, categoryId, limit, offset);
        },
      });

      const urlWithPagination = `${categoryUrl}?limit=${limit}&offset=${offset}`;
      await crawler.run([urlWithPagination]);
      
      await this.updateJobStatus(job.id, ScrapeJobStatus.COMPLETED);
      return await this.productRepository.find({ 
        where: { categoryId },
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.logger.error(`Product scraping failed: ${error.message}`, error.stack);
      await this.updateJobStatus(job.id, ScrapeJobStatus.FAILED, error.message);
      throw error;
    }
  }

  private async handleProductScraping(page: Page, categoryId: number, limit: number, offset: number): Promise<void> {
    await page.waitForLoadState('networkidle');
    
    const products = await page.evaluate(() => {
      const productData: ProductData[] = [];
      
      // Look for product elements - adjust selectors based on actual site structure
      const productCards = document.querySelectorAll('.product-card, .product-item, .book-item');
      
      productCards.forEach((card) => {
        const link = card.querySelector('a');
        const title = card.querySelector('.title, .product-title, .book-title')?.textContent?.trim();
        const author = card.querySelector('.author, .product-author')?.textContent?.trim();
        const priceElement = card.querySelector('.price, .product-price');
        const imageElement = card.querySelector('img');
        
        if (link && title) {
          const href = link.getAttribute('href');
          const sourceUrl = href?.startsWith('http') ? href : `https://www.worldofbooks.com${href}`;
          const sourceId = sourceUrl?.split('/').pop() || Math.random().toString(36);
          
          let price: number | undefined;
          let currency = 'GBP';
          
          if (priceElement) {
            const priceText = priceElement.textContent?.trim();
            const priceMatch = priceText?.match(/([£$€])?([\d.,]+)/);
            if (priceMatch) {
              price = parseFloat(priceMatch[2].replace(',', ''));
              currency = priceMatch[1] === '$' ? 'USD' : priceMatch[1] === '€' ? 'EUR' : 'GBP';
            }
          }
          
          productData.push({
            sourceId,
            title,
            author,
            price,
            currency,
            imageUrl: imageElement?.getAttribute('src') || imageElement?.getAttribute('data-src') || undefined,
            sourceUrl: sourceUrl!,
            categoryId,
          });
        }
      });
      
      return productData;
    });

    // Save products to database
    for (const productData of products) {
      await this.saveProduct(productData);
    }
  }

  async scrapeProductDetail(productUrl: string, productId: number): Promise<ProductDetail | null> {
    const job = await this.createScrapeJob(productUrl, ScrapeTargetType.PRODUCT_DETAIL);
    
    try {
      await this.updateJobStatus(job.id, ScrapeJobStatus.RUNNING);
      
      const crawler = new PlaywrightCrawler({
        requestHandlerTimeoutSecs: 60,
        maxRequestsPerCrawl: 1,
        requestHandler: async ({ page, request }) => {
          await this.handleProductDetailScraping(page, productId);
        },
      });

      await crawler.run([productUrl]);
      
      await this.updateJobStatus(job.id, ScrapeJobStatus.COMPLETED);
      return await this.productDetailRepository.findOne({ where: { productId } });
    } catch (error) {
      this.logger.error(`Product detail scraping failed: ${error.message}`, error.stack);
      await this.updateJobStatus(job.id, ScrapeJobStatus.FAILED, error.message);
      throw error;
    }
  }

  private async handleProductDetailScraping(page: Page, productId: number): Promise<void> {
    await page.waitForLoadState('networkidle');
    
    const productDetail = await page.evaluate(() => {
      const description = document.querySelector('.description, .product-description, .book-description')?.textContent?.trim();
      const publisher = document.querySelector('.publisher')?.textContent?.trim();
      const publicationDate = document.querySelector('.publication-date, .publish-date')?.textContent?.trim();
      const isbn = document.querySelector('.isbn')?.textContent?.trim();
      
      // Extract ratings
      const ratingElement = document.querySelector('.rating, .stars, .review-rating');
      let ratingsAvg: number | undefined;
      if (ratingElement) {
        const ratingText = ratingElement.textContent?.trim();
        const ratingMatch = ratingText?.match(/([\d.]+)/);
        ratingsAvg = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;
      }
      
      // Extract review count
      const reviewCountElement = document.querySelector('.review-count, .reviews-count');
      let reviewsCount = 0;
      if (reviewCountElement) {
        const countText = reviewCountElement.textContent?.trim();
        const countMatch = countText?.match(/(\d+)/);
        reviewsCount = countMatch ? parseInt(countMatch[1]) : 0;
      }
      
      // Extract recommendations
      const recommendations: any[] = [];
      const recommendedItems = document.querySelectorAll('.recommended-item, .related-product');
      recommendedItems.forEach((item) => {
        const link = item.querySelector('a');
        const title = item.querySelector('.title')?.textContent?.trim();
        if (link && title) {
          recommendations.push({
            title,
            url: link.getAttribute('href'),
          });
        }
      });
      
      const productDetailData: ProductDetailData = {
        description,
        ratingsAvg,
        reviewsCount,
        publisher,
        publicationDate,
        isbn,
        recommendations: recommendations.length > 0 ? recommendations : undefined,
      };
      
      return productDetailData;
    });

    // Extract reviews
    const reviews = await page.evaluate(() => {
      const reviewData: ReviewData[] = [];
      const reviewElements = document.querySelectorAll('.review, .review-item');
      
      reviewElements.forEach((review) => {
        const author = review.querySelector('.review-author, .reviewer-name')?.textContent?.trim();
        const text = review.querySelector('.review-text, .review-content')?.textContent?.trim();
        const ratingElement = review.querySelector('.review-rating, .stars');
        
        let rating: number | undefined;
        if (ratingElement) {
          const ratingText = ratingElement.textContent?.trim();
          const ratingMatch = ratingText?.match(/([\d.]+)/);
          rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;
        }
        
        if (text) {
          reviewData.push({
            author,
            rating,
            text,
          });
        }
      });
      
      return reviewData;
    });

    // Save product detail
    await this.saveProductDetail(productId, productDetail);
    
    // Save reviews
    for (const reviewData of reviews) {
      await this.saveReview(productId, reviewData);
    }
  }

  private async saveNavigation(data: NavigationData): Promise<Navigation> {
    const existing = await this.navigationRepository.findOne({ where: { slug: data.slug } });
    if (existing) {
      existing.lastScrapedAt = new Date();
      return await this.navigationRepository.save(existing);
    }
    
    const navigation = this.navigationRepository.create({
      ...data,
      lastScrapedAt: new Date(),
    });
    return await this.navigationRepository.save(navigation);
  }

  private async saveCategory(data: CategoryData): Promise<Category> {
    const existing = await this.categoryRepository.findOne({ where: { slug: data.slug } });
    if (existing) {
      existing.productCount = data.productCount;
      existing.lastScrapedAt = new Date();
      return await this.categoryRepository.save(existing);
    }
    
    const category = this.categoryRepository.create({
      ...data,
      lastScrapedAt: new Date(),
    });
    return await this.categoryRepository.save(category);
  }

  private async saveProduct(data: ProductData): Promise<Product> {
    const existing = await this.productRepository.findOne({ where: { sourceId: data.sourceId } });
    if (existing) {
      Object.assign(existing, data);
      existing.lastScrapedAt = new Date();
      return await this.productRepository.save(existing);
    }
    
    const product = this.productRepository.create({
      ...data,
      lastScrapedAt: new Date(),
    });
    return await this.productRepository.save(product);
  }

  private async saveProductDetail(productId: number, data: ProductDetailData): Promise<ProductDetail> {
    const existing = await this.productDetailRepository.findOne({ where: { productId } });
    if (existing) {
      Object.assign(existing, data);
      return await this.productDetailRepository.save(existing);
    }
    
    const productDetail = this.productDetailRepository.create({
      productId,
      ...data,
    });
    return await this.productDetailRepository.save(productDetail);
  }

  private async saveReview(productId: number, data: ReviewData): Promise<Review> {
    const review = this.reviewRepository.create({
      productId,
      ...data,
    });
    return await this.reviewRepository.save(review);
  }

  private async createScrapeJob(targetUrl: string, targetType: ScrapeTargetType): Promise<ScrapeJob> {
    const job = this.scrapeJobRepository.create({
      targetUrl,
      targetType,
      status: ScrapeJobStatus.PENDING,
    });
    return await this.scrapeJobRepository.save(job);
  }

  private async updateJobStatus(
    jobId: number,
    status: ScrapeJobStatus,
    errorLog?: string,
  ): Promise<void> {
    const job = await this.scrapeJobRepository.findOne({ where: { id: jobId } });
    if (job) {
      job.status = status;
      if (status === ScrapeJobStatus.RUNNING) {
        job.startedAt = new Date();
      } else if (status === ScrapeJobStatus.COMPLETED || status === ScrapeJobStatus.FAILED) {
        job.finishedAt = new Date();
      }
      if (errorLog) {
        job.errorLog = errorLog;
      }
      await this.scrapeJobRepository.save(job);
    }
  }
}