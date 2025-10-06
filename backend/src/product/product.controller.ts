import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ScrapingService } from '../scraping/scraping.service';
import { CreateProductDto, ProductResponseDto, ProductQueryDto } from './product.dto';
import { Product } from './product.entity';

@ApiTags('products')
@Controller('api/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination and filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of products', type: [ProductResponseDto] })
  async findAll(@Query() query: ProductQueryDto): Promise<{ products: Product[]; total: number }> {
    return await this.productService.findAll(query);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'q', type: 'string' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search results', type: [ProductResponseDto] })
  async search(
    @Query('q') searchTerm: string,
    @Query('limit') limit?: string,
  ): Promise<Product[]> {
    return await this.productService.searchProducts(searchTerm, limit ? +limit : 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product found', type: ProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(+id);
  }

  @Get(':id/recommendations')
  @ApiOperation({ summary: 'Get product recommendations' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product recommendations', type: [ProductResponseDto] })
  async getRecommendations(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.getRecommendations(+id);
  }

  @Get('source/:sourceId')
  @ApiOperation({ summary: 'Get product by source ID' })
  @ApiParam({ name: 'sourceId', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product found', type: ProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async findBySourceId(@Param('sourceId') sourceId: string): Promise<Product> {
    return await this.productService.findBySourceId(sourceId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product created', type: ProductResponseDto })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Post('scrape')
  @ApiOperation({ summary: 'Scrape products from World of Books' })
  @ApiQuery({ name: 'categoryUrl', type: 'string' })
  @ApiQuery({ name: 'categoryId', type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Products scraped successfully', type: [ProductResponseDto] })
  async scrapeProducts(
    @Query('categoryUrl') categoryUrl: string,
    @Query('categoryId') categoryId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Product[]> {
    return await this.scrapingService.scrapeProducts(
      categoryUrl,
      +categoryId,
      limit ? +limit : 20,
      offset ? +offset : 0,
    );
  }

  @Post(':id/scrape-detail')
  @ApiOperation({ summary: 'Scrape product detail from World of Books' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product detail scraped successfully' })
  async scrapeProductDetail(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    return await this.scrapingService.scrapeProductDetail(product.sourceUrl, +id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product updated', type: ProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateProductDto>): Promise<Product> {
    return await this.productService.update(+id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.productService.remove(+id);
  }
}