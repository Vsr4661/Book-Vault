import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource } from 'typeorm';
import { seedDatabase } from './database-seed';

async function bootstrap() {
  console.log('🚀 Starting seed process...');
  
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  
  try {
    await seedDatabase(dataSource);
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();