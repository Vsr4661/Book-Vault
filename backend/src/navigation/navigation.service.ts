import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Navigation } from './navigation.entity';
import { CreateNavigationDto } from './navigation.dto';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(Navigation)
    private navigationRepository: Repository<Navigation>,
  ) {}

  async findAll(): Promise<Navigation[]> {
    return await this.navigationRepository.find({
      relations: ['categories'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Navigation> {
    const navigation = await this.navigationRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    
    if (!navigation) {
      throw new NotFoundException(`Navigation with ID ${id} not found`);
    }
    
    return navigation;
  }

  async findBySlug(slug: string): Promise<Navigation> {
    const navigation = await this.navigationRepository.findOne({
      where: { slug },
      relations: ['categories'],
    });
    
    if (!navigation) {
      throw new NotFoundException(`Navigation with slug ${slug} not found`);
    }
    
    return navigation;
  }

  async create(createNavigationDto: CreateNavigationDto): Promise<Navigation> {
    const navigation = this.navigationRepository.create(createNavigationDto);
    return await this.navigationRepository.save(navigation);
  }

  async update(id: number, updateData: Partial<CreateNavigationDto>): Promise<Navigation> {
    await this.navigationRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.navigationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Navigation with ID ${id} not found`);
    }
  }

  async markAsScraped(id: number): Promise<Navigation> {
    await this.navigationRepository.update(id, { lastScrapedAt: new Date() });
    return await this.findOne(id);
  }
}