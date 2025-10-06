import { IsString, IsOptional, IsUrl, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNavigationDto {
  @ApiProperty({ description: 'Navigation title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Navigation slug' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Navigation URL', required: false })
  @IsOptional()
  @IsUrl()
  url?: string;
}

export class NavigationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  url?: string;

  @ApiProperty({ required: false })
  lastScrapedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}