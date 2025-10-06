import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Navigation ID' })
  @IsNumber()
  navigationId: number;

  @ApiProperty({ description: 'Parent category ID', required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({ description: 'Category title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Category slug' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Category URL', required: false })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ description: 'Product count', required: false })
  @IsOptional()
  @IsNumber()
  productCount?: number;
}

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  navigationId: number;

  @ApiProperty({ required: false })
  parentId?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  url?: string;

  @ApiProperty()
  productCount: number;

  @ApiProperty({ required: false })
  lastScrapedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}