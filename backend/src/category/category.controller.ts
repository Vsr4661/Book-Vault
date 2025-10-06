import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ScrapingService } from '../scraping/scraping.service';
import { CreateCategoryDto, CategoryResponseDto } from './category.dto';
import { Category } from './category.entity';

@ApiTags('categories')
@Controller('api/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({ name: 'navigationId', required: false, type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of categories', type: [CategoryResponseDto] })
  async findAll(@Query('navigationId') navigationId?: string): Promise<Category[]> {
    if (navigationId) {
      return await this.categoryService.findByNavigationId(+navigationId);
    }
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Category found', type: CategoryResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(+id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiParam({ name: 'slug', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Category found', type: CategoryResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    return await this.categoryService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created', type: CategoryResponseDto })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Post('scrape')
  @ApiOperation({ summary: 'Scrape categories from World of Books' })
  @ApiQuery({ name: 'categoryUrl', type: 'string' })
  @ApiQuery({ name: 'navigationId', type: 'number' })
  @ApiQuery({ name: 'parentId', required: false, type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Categories scraped successfully', type: [CategoryResponseDto] })
  async scrapeCategories(
    @Query('categoryUrl') categoryUrl: string,
    @Query('navigationId') navigationId: string,
    @Query('parentId') parentId?: string,
  ): Promise<Category[]> {
    return await this.scrapingService.scrapeCategory(
      categoryUrl,
      +navigationId,
      parentId ? +parentId : undefined,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Category updated', type: CategoryResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateCategoryDto>): Promise<Category> {
    return await this.categoryService.update(+id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Category deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categoryService.remove(+id);
  }
}