import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from './product.entity';
import { ProductDetail } from './product-detail.entity';
import { Review } from './review.entity';
import { CreateProductDto, ProductQueryDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(query: ProductQueryDto): Promise<{ products: Product[]; total: number }> {
    const { categoryId, limit = 20, offset = 0, search, minPrice, maxPrice, author } = query;
    
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productDetail', 'productDetail')
      .orderBy('product.createdAt', 'DESC');

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.author) LIKE LOWER(:search))',
        { search: `%${search}%` }
      );
    }

    if (author) {
      queryBuilder.andWhere('LOWER(product.author) LIKE LOWER(:author)', { author: `%${author}%` });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    const [products, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { products, total };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'productDetail', 'reviews'],
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async findBySourceId(sourceId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { sourceId },
      relations: ['category', 'productDetail', 'reviews'],
    });
    
    if (!product) {
      throw new NotFoundException(`Product with source ID ${sourceId} not found`);
    }
    
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(id: number, updateData: Partial<CreateProductDto>): Promise<Product> {
    await this.productRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async markAsScraped(id: number): Promise<Product> {
    await this.productRepository.update(id, { lastScrapedAt: new Date() });
    return await this.findOne(id);
  }

  async getRecommendations(productId: number): Promise<Product[]> {
    const product = await this.findOne(productId);
    
    // Simple content-based recommendations based on category and author
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productDetail', 'productDetail')
      .where('product.id != :productId', { productId })
      .orderBy('RANDOM()')
      .limit(6);

    if (product.categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId: product.categoryId });
    }

    if (product.author) {
      queryBuilder.orWhere('product.author = :author', { author: product.author });
    }

    return await queryBuilder.getMany();
  }

  async searchProducts(searchTerm: string, limit = 10): Promise<Product[]> {
    return await this.productRepository.find({
      where: [
        { title: Like(`%${searchTerm}%`) },
        { author: Like(`%${searchTerm}%`) },
      ],
      relations: ['category', 'productDetail'],
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }
}