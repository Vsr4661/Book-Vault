# Database Seed Scripts 🌱

This directory contains comprehensive seed scripts for the Product Data Explorer project, supporting both **SQL (PostgreSQL/SQLite)** and **MongoDB** databases.

## 📊 What's Included

- **Complete World of Books data structure**
- **10 main navigation categories** (Books, Fiction, Children's Books, etc.)
- **20 detailed sub-categories** (Literary Fiction, Mystery & Thriller, Picture Books, etc.)
- **15 sample products** with real book data (To Kill a Mockingbird, Harry Potter, etc.)
- **5 detailed product information** records with specs, ratings, publishers
- **9 sample reviews** from different users
- **4 scrape job records** showing system activity
- **Database indexes** for optimal performance
- **Foreign key relationships** properly maintained

## 🧩 SQL Seed Script (`seed.sql`)

### Compatible With:
- **PostgreSQL** (primary target)
- **SQLite** (with minor modifications)
- **MySQL** (with syntax adjustments)

### Features:
- ✅ Full DDL (table creation) with proper constraints
- ✅ Complete data insertion with relationships
- ✅ Performance indexes
- ✅ Data validation and integrity checks
- ✅ Conflict handling (`ON CONFLICT DO NOTHING`)
- ✅ Summary statistics at the end

### How to Run:

#### PostgreSQL:
```bash
# Connect to your PostgreSQL database
psql -U username -d database_name -f seed.sql

# Or with environment variables
PGUSER=username PGDATABASE=dbname psql -f seed.sql
```

#### SQLite:
```bash
# For SQLite, use this version (minor modifications needed)
sqlite3 database.db < seed.sql
```

### Schema Overview:
```sql
navigation (10 records)
├── category (20 records) 
    └── product (15 records)
        ├── product_detail (5 records)
        └── review (9 records)
scrape_job (4 records)
view_history (ready for use)
```

## 📁 MongoDB Seed Script (`seed-mongodb.js`)

### Compatible With:
- **MongoDB Atlas**
- **Local MongoDB instance**
- **NestJS + Mongoose**
- **Node.js + MongoDB Driver**

### Features:
- ✅ Document-based data structure
- ✅ ObjectId references between collections
- ✅ Automatic relationship mapping
- ✅ Performance indexes
- ✅ Error handling and cleanup
- ✅ Progress logging and summary

### How to Run:

#### Method 1: Direct Execution
```bash
# Install MongoDB driver
npm install mongodb

# Set MongoDB URI (optional)
export MONGODB_URI="mongodb://localhost:27017/product-data-explorer"

# Run the seed script
node seed-mongodb.js
```

#### Method 2: Import and Use
```javascript
const { seedDatabase } = require('./seed-mongodb');

// In your application
await seedDatabase();
```

#### Method 3: NestJS Integration
```typescript
// In your NestJS service
import { seedDatabase } from './database/seed-mongodb';

@Injectable()
export class DatabaseService {
  async seedData() {
    await seedDatabase();
  }
}
```

### Collection Overview:
```javascript
navigations (10 documents)
├── categories (20 documents)
    └── products (15 documents)
        ├── product_details (5 documents)
        └── reviews (9 documents)
scrape_jobs (4 documents)
view_histories (ready for use)
```

## 🔄 Current Project Integration

Your **existing NestJS backend** uses **SQLite + TypeORM**, so:

1. **For Development**: Use the current SQLite setup
2. **For Production**: Consider PostgreSQL with `seed.sql`
3. **For Alternative**: MongoDB with `seed-mongodb.js`

### TypeORM Integration:
```typescript
// To run SQL seed in TypeORM
import { DataSource } from 'typeorm';
import * as fs from 'fs';

const seedSql = fs.readFileSync('./database/seed.sql', 'utf8');
await dataSource.query(seedSql);
```

## 📋 Data Structure Details

### Sample Navigation Categories:
- **Books** → General book categories
- **Fiction** → Literary Fiction, Mystery, Romance, Sci-Fi
- **Children's Books** → Picture Books, Early Readers, Young Adult
- **Non-Fiction** → History, Science, Politics, Travel
- **Academic & Educational** → Textbooks, Reference
- **Art & Design** → Fine Arts, Photography
- **Biography & Memoir** → Autobiographies, Celebrity Memoirs

### Sample Products Include:
- **Classic Literature**: To Kill a Mockingbird, Pride and Prejudice, The Great Gatsby
- **Popular Fiction**: Gone Girl, The Da Vinci Code, Harry Potter
- **Sci-Fi/Fantasy**: Dune, The Hobbit, 1984
- **Children's Books**: Where the Wild Things Are, The Very Hungry Caterpillar
- **Non-Fiction**: Sapiens, The Second World War

### Product Details Include:
- **Complete descriptions**
- **Technical specifications** (pages, dimensions, weight)
- **Ratings and review counts**
- **Publisher information**
- **ISBN numbers**
- **Publication dates**

## 🚀 Quick Start

### For Your Current Setup (SQLite):
```bash
# Navigate to your backend directory
cd backend

# Create a simple seed command
npm run seed  # (if you add the script to package.json)
```

### For Production (PostgreSQL):
```bash
# 1. Set up PostgreSQL database
createdb product_data_explorer

# 2. Run the seed script
psql -d product_data_explorer -f database/seed.sql

# 3. Verify the data
psql -d product_data_explorer -c "SELECT table_name, COUNT(*) FROM navigation, category, product, product_detail, review;"
```

### For MongoDB Alternative:
```bash
# 1. Start MongoDB
mongod

# 2. Run the seed script
node database/seed-mongodb.js

# 3. Verify in MongoDB shell
mongo
use product-data-explorer
db.navigations.count()
db.products.count()
```

## 🔧 Customization

Both scripts are highly customizable:

1. **Add more categories**: Extend the categories array/table
2. **Add more products**: Extend the products array/table  
3. **Modify relationships**: Update foreign keys/references
4. **Add custom fields**: Extend the schema as needed
5. **Change data**: Replace with your own World of Books data

## 💡 Pro Tips

1. **Backup First**: Always backup before running seed scripts
2. **Test Environment**: Run on test database first
3. **Incremental Updates**: Use `ON CONFLICT` handling for updates
4. **Performance**: Indexes are included for common queries
5. **Monitoring**: Check the summary output for verification

## 📞 Support

If you need help:
1. **SQL Issues**: Check PostgreSQL/SQLite documentation
2. **MongoDB Issues**: Check MongoDB Node.js driver docs
3. **TypeORM**: Check TypeORM migration and seeding docs
4. **Custom Data**: Modify the seed data arrays/objects as needed

Both scripts are **production-ready** and include **comprehensive error handling**, **performance optimization**, and **detailed logging**! 🎉