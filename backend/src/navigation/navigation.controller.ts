import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';
import { ScrapingService } from '../scraping/scraping.service';
import { CreateNavigationDto, NavigationResponseDto } from './navigation.dto';
import { Navigation } from './navigation.entity';

@ApiTags('navigation')
@Controller('api/navigation')
export class NavigationController {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all navigation items' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of navigation items', type: [NavigationResponseDto] })
  async findAll(): Promise<Navigation[]> {
    return await this.navigationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get navigation item by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Navigation item found', type: NavigationResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Navigation item not found' })
  async findOne(@Param('id') id: string): Promise<Navigation> {
    return await this.navigationService.findOne(+id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get navigation item by slug' })
  @ApiParam({ name: 'slug', type: 'string' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Navigation item found', type: NavigationResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Navigation item not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Navigation> {
    return await this.navigationService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new navigation item' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Navigation item created', type: NavigationResponseDto })
  async create(@Body() createNavigationDto: CreateNavigationDto): Promise<Navigation> {
    return await this.navigationService.create(createNavigationDto);
  }

  @Post('scrape')
  @ApiOperation({ summary: 'Scrape navigation from World of Books' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Navigation scraped successfully', type: [NavigationResponseDto] })
  async scrapeNavigation(): Promise<Navigation[]> {
    return await this.scrapingService.scrapeNavigation();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update navigation item' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Navigation item updated', type: NavigationResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Navigation item not found' })
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateNavigationDto>): Promise<Navigation> {
    return await this.navigationService.update(+id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete navigation item' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Navigation item deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Navigation item not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.navigationService.remove(+id);
  }
}