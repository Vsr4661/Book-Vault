import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['navigation', 'parent', 'children', 'products'],
      order: { createdAt: 'ASC' },
    });
  }

  async findByNavigationId(navigationId: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { navigationId },
      relations: ['navigation', 'parent', 'children'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['navigation', 'parent', 'children', 'products'],
    });
    
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    
    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['navigation', 'parent', 'children', 'products'],
    });
    
    if (!category) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }
    
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async update(id: number, updateData: Partial<CreateCategoryDto>): Promise<Category> {
    await this.categoryRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async markAsScraped(id: number): Promise<Category> {
    await this.categoryRepository.update(id, { lastScrapedAt: new Date() });
    return await this.findOne(id);
  }
}