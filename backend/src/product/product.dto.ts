import { IsString, IsOptional, IsNumber, IsUrl, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Source ID from World of Books' })
  @IsString()
  sourceId: string;

  @ApiProperty({ description: 'Category ID', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ description: 'Product title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Product author', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ description: 'Product price', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;

  @ApiProperty({ description: 'Currency', default: 'GBP' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'Image URL', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ description: 'Source URL' })
  @IsUrl()
  sourceUrl: string;
}

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sourceId: string;

  @ApiProperty({ required: false })
  categoryId?: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  author?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty()
  sourceUrl: string;

  @ApiProperty({ required: false })
  lastScrapedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  author?: string;
}