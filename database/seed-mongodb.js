// Product Data Explorer - MongoDB Seed Script
// Compatible with Node.js/NestJS + Mongoose
// Created: October 5, 2025

const { MongoClient } = require('mongodb');
// Alternative: const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-data-explorer';

const seedData = {
  navigation: [
    { title: "Books", slug: "books", url: "https://www.worldofbooks.com/en-gb/books" },
    { title: "Fiction", slug: "fiction", url: "https://www.worldofbooks.com/en-gb/books/fiction" },
    { title: "Non-Fiction", slug: "non-fiction", url: "https://www.worldofbooks.com/en-gb/books/non-fiction" },
    { title: "Children's Books", slug: "childrens-books", url: "https://www.worldofbooks.com/en-gb/books/childrens" },
    { title: "Academic & Educational", slug: "academic-educational", url: "https://www.worldofbooks.com/en-gb/books/academic" },
    { title: "Art & Design", slug: "art-design", url: "https://www.worldofbooks.com/en-gb/books/art-design" },
    { title: "Biography & Memoir", slug: "biography-memoir", url: "https://www.worldofbooks.com/en-gb/books/biography" },
    { title: "Business & Economics", slug: "business-economics", url: "https://www.worldofbooks.com/en-gb/books/business" },
    { title: "Computing & IT", slug: "computing-it", url: "https://www.worldofbooks.com/en-gb/books/computing" },
    { title: "Health & Lifestyle", slug: "health-lifestyle", url: "https://www.worldofbooks.com/en-gb/books/health" }
  ],

  categories: [
    // Fiction categories (navigation_id references will be replaced with ObjectIds)
    { navigation_slug: "fiction", title: "Literary Fiction", slug: "literary-fiction", url: "https://www.worldofbooks.com/en-gb/books/fiction/literary", product_count: 245 },
    { navigation_slug: "fiction", title: "Mystery & Thriller", slug: "mystery-thriller", url: "https://www.worldofbooks.com/en-gb/books/fiction/mystery", product_count: 387 },
    { navigation_slug: "fiction", title: "Romance", slug: "romance", url: "https://www.worldofbooks.com/en-gb/books/fiction/romance", product_count: 298 },
    { navigation_slug: "fiction", title: "Science Fiction & Fantasy", slug: "sci-fi-fantasy", url: "https://www.worldofbooks.com/en-gb/books/fiction/sci-fi", product_count: 456 },
    { navigation_slug: "fiction", title: "Historical Fiction", slug: "historical-fiction", url: "https://www.worldofbooks.com/en-gb/books/fiction/historical", product_count: 189 },
    { navigation_slug: "fiction", title: "Crime & Detective", slug: "crime-detective", url: "https://www.worldofbooks.com/en-gb/books/fiction/crime", product_count: 334 },
    
    // Children's Books categories
    { navigation_slug: "childrens-books", title: "Picture Books", slug: "picture-books", url: "https://www.worldofbooks.com/en-gb/books/childrens/picture", product_count: 567 },
    { navigation_slug: "childrens-books", title: "Early Readers", slug: "early-readers", url: "https://www.worldofbooks.com/en-gb/books/childrens/early", product_count: 423 },
    { navigation_slug: "childrens-books", title: "Middle Grade", slug: "middle-grade", url: "https://www.worldofbooks.com/en-gb/books/childrens/middle", product_count: 298 },
    { navigation_slug: "childrens-books", title: "Young Adult", slug: "young-adult", url: "https://www.worldofbooks.com/en-gb/books/childrens/teen", product_count: 445 },
    
    // Non-Fiction categories
    { navigation_slug: "non-fiction", title: "History", slug: "history", url: "https://www.worldofbooks.com/en-gb/books/non-fiction/history", product_count: 678 },
    { navigation_slug: "non-fiction", title: "Science & Nature", slug: "science-nature", url: "https://www.worldofbooks.com/en-gb/books/non-fiction/science", product_count: 389 },
    { navigation_slug: "non-fiction", title: "Politics & Philosophy", slug: "politics-philosophy", url: "https://www.worldofbooks.com/en-gb/books/non-fiction/politics", product_count: 234 },
    { navigation_slug: "non-fiction", title: "Travel & Geography", slug: "travel-geography", url: "https://www.worldofbooks.com/en-gb/books/non-fiction/travel", product_count: 156 },
    
    // Academic & Educational
    { navigation_slug: "academic-educational", title: "Textbooks", slug: "textbooks", url: "https://www.worldofbooks.com/en-gb/books/academic/textbooks", product_count: 789 },
    { navigation_slug: "academic-educational", title: "Reference", slug: "reference", url: "https://www.worldofbooks.com/en-gb/books/academic/reference", product_count: 234 },
    
    // Art & Design
    { navigation_slug: "art-design", title: "Fine Arts", slug: "fine-arts", url: "https://www.worldofbooks.com/en-gb/books/art/fine-arts", product_count: 167 },
    { navigation_slug: "art-design", title: "Photography", slug: "photography", url: "https://www.worldofbooks.com/en-gb/books/art/photography", product_count: 89 },
    
    // Biography & Memoir
    { navigation_slug: "biography-memoir", title: "Autobiographies", slug: "autobiographies", url: "https://www.worldofbooks.com/en-gb/books/biography/auto", product_count: 145 },
    { navigation_slug: "biography-memoir", title: "Celebrity Memoirs", slug: "celebrity-memoirs", url: "https://www.worldofbooks.com/en-gb/books/biography/celebrity", product_count: 98 }
  ],

  products: [
    // Literary Fiction
    {
      source_id: "WOB001",
      category_slug: "literary-fiction",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 12.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/mockingbird.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/harper-lee/to-kill-a-mockingbird"
    },
    {
      source_id: "WOB002",
      category_slug: "literary-fiction",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/gatsby.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/f-scott-fitzgerald/great-gatsby"
    },
    {
      source_id: "WOB003",
      category_slug: "literary-fiction",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/pride-prejudice.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/jane-austen/pride-and-prejudice"
    },

    // Mystery & Thriller
    {
      source_id: "WOB004",
      category_slug: "mystery-thriller",
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      price: 14.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/dragon-tattoo.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/stieg-larsson/girl-dragon-tattoo"
    },
    {
      source_id: "WOB005",
      category_slug: "mystery-thriller",
      title: "Gone Girl",
      author: "Gillian Flynn",
      price: 13.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/gone-girl.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/gillian-flynn/gone-girl"
    },
    {
      source_id: "WOB006",
      category_slug: "mystery-thriller",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      price: 11.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/davinci-code.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/dan-brown/da-vinci-code"
    },

    // Science Fiction & Fantasy
    {
      source_id: "WOB007",
      category_slug: "sci-fi-fantasy",
      title: "Dune",
      author: "Frank Herbert",
      price: 16.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/dune.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/frank-herbert/dune"
    },
    {
      source_id: "WOB008",
      category_slug: "sci-fi-fantasy",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 12.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/hobbit.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/jrr-tolkien/hobbit"
    },
    {
      source_id: "WOB009",
      category_slug: "sci-fi-fantasy",
      title: "1984",
      author: "George Orwell",
      price: 11.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/1984.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/george-orwell/1984"
    },

    // Picture Books
    {
      source_id: "WOB010",
      category_slug: "picture-books",
      title: "Where the Wild Things Are",
      author: "Maurice Sendak",
      price: 8.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/wild-things.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/maurice-sendak/where-wild-things-are"
    },
    {
      source_id: "WOB011",
      category_slug: "picture-books",
      title: "The Very Hungry Caterpillar",
      author: "Eric Carle",
      price: 7.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/hungry-caterpillar.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/eric-carle/very-hungry-caterpillar"
    },

    // Young Adult
    {
      source_id: "WOB012",
      category_slug: "young-adult",
      title: "The Hunger Games",
      author: "Suzanne Collins",
      price: 13.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/hunger-games.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/suzanne-collins/hunger-games"
    },
    {
      source_id: "WOB013",
      category_slug: "young-adult",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 15.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/harry-potter.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/jk-rowling/harry-potter-philosophers-stone"
    },

    // History
    {
      source_id: "WOB014",
      category_slug: "history",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      price: 18.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/sapiens.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/yuval-harari/sapiens"
    },
    {
      source_id: "WOB015",
      category_slug: "history",
      title: "The Second World War",
      author: "Winston Churchill",
      price: 24.99,
      currency: "USD",
      image_url: "https://images.worldofbooks.com/covers/second-world-war.jpg",
      source_url: "https://www.worldofbooks.com/en-gb/books/winston-churchill/second-world-war"
    }
  ],

  productDetails: [
    {
      source_id: "WOB001",
      description: "Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred.",
      specs: {
        pages: 281,
        language: "English",
        format: "Paperback",
        dimensions: "7.5 x 4.2 x 0.8 inches",
        weight: "0.4 lbs"
      },
      ratings_avg: 4.8,
      reviews_count: 2847,
      publisher: "Harper Perennial Modern Classics",
      publication_date: new Date("1960-07-11"),
      isbn: "9780061120084"
    },
    {
      source_id: "WOB002",
      description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island.",
      specs: {
        pages: 180,
        language: "English",
        format: "Paperback",
        dimensions: "8.0 x 5.2 x 0.5 inches",
        weight: "0.3 lbs"
      },
      ratings_avg: 4.2,
      reviews_count: 1934,
      publisher: "Scribner",
      publication_date: new Date("1925-04-10"),
      isbn: "9780743273565"
    },
    {
      source_id: "WOB003",
      description: "Jane Austen's beloved classic opens with one of the most famous lines in English literature.",
      specs: {
        pages: 432,
        language: "English",
        format: "Paperback",
        dimensions: "7.8 x 5.1 x 1.1 inches",
        weight: "0.6 lbs"
      },
      ratings_avg: 4.6,
      reviews_count: 3421,
      publisher: "Penguin Classics",
      publication_date: new Date("1813-01-28"),
      isbn: "9780141439518"
    },
    {
      source_id: "WOB004",
      description: "The first book in the Millennium trilogy introduces Lisbeth Salander, one of the most original characters in a thriller series.",
      specs: {
        pages: 672,
        language: "English",
        format: "Paperback",
        dimensions: "8.2 x 5.5 x 1.7 inches",
        weight: "1.1 lbs"
      },
      ratings_avg: 4.4,
      reviews_count: 2156,
      publisher: "Vintage Crime/Black Lizard",
      publication_date: new Date("2005-08-01"),
      isbn: "9780307454546"
    },
    {
      source_id: "WOB005",
      description: "A psychological thriller about a marriage gone terribly wrong. The story unfolds through diary entries and present-day narration.",
      specs: {
        pages: 419,
        language: "English",
        format: "Paperback",
        dimensions: "8.0 x 5.3 x 1.1 inches",
        weight: "0.7 lbs"
      },
      ratings_avg: 4.0,
      reviews_count: 1789,
      publisher: "Broadway Books",
      publication_date: new Date("2012-06-05"),
      isbn: "9780307588371"
    }
  ],

  reviews: [
    {
      source_id: "WOB001",
      author: "BookLover123",
      rating: 5,
      content: "A timeless classic that everyone should read. Harper Lee's writing is masterful and the story is deeply moving.",
      review_date: new Date("2024-09-15")
    },
    {
      source_id: "WOB001",
      author: "ClassicReader",
      rating: 5,
      content: "One of the best books I've ever read. The characters are so well-developed and the themes are still relevant today.",
      review_date: new Date("2024-08-22")
    },
    {
      source_id: "WOB001",
      author: "StudentReader",
      rating: 4,
      content: "Required reading for school, but actually enjoyed it. Scout is such a great narrator.",
      review_date: new Date("2024-07-10")
    },
    {
      source_id: "WOB002",
      author: "LiteratureProf",
      rating: 4,
      content: "Fitzgerald's prose is beautiful and the symbolism is rich. A great example of the American Dream's complexity.",
      review_date: new Date("2024-09-01")
    },
    {
      source_id: "WOB002",
      author: "ModernReader",
      rating: 3,
      content: "Good book but felt a bit slow in parts. The ending was powerful though.",
      review_date: new Date("2024-08-15")
    },
    {
      source_id: "WOB004",
      author: "ThrillerFan",
      rating: 5,
      content: "Couldn't put it down! Lisbeth Salander is such a complex and fascinating character.",
      review_date: new Date("2024-09-20")
    },
    {
      source_id: "WOB004",
      author: "MysteryReader",
      rating: 4,
      content: "Great start to the trilogy. The plot is intricate and well-crafted.",
      review_date: new Date("2024-08-30")
    },
    {
      source_id: "WOB013",
      author: "PotterHead",
      rating: 5,
      content: "The book that started it all! Still magical after all these years. Rowling's world-building is incredible.",
      review_date: new Date("2024-09-25")
    },
    {
      source_id: "WOB013",
      author: "FantasyLover",
      rating: 5,
      content: "Perfect introduction to the wizarding world. Love how it grows with the readers.",
      review_date: new Date("2024-09-12")
    }
  ],

  scrapeJobs: [
    {
      target_url: "https://www.worldofbooks.com/en-gb/books",
      target_type: "navigation",
      status: "completed",
      started_at: new Date("2024-10-01T10:00:00Z"),
      finished_at: new Date("2024-10-01T10:05:00Z")
    },
    {
      target_url: "https://www.worldofbooks.com/en-gb/books/fiction",
      target_type: "category",
      status: "completed",
      started_at: new Date("2024-10-01T10:05:00Z"),
      finished_at: new Date("2024-10-01T10:15:00Z")
    },
    {
      target_url: "https://www.worldofbooks.com/en-gb/books/fiction/literary",
      target_type: "products",
      status: "completed",
      started_at: new Date("2024-10-01T10:15:00Z"),
      finished_at: new Date("2024-10-01T10:45:00Z")
    },
    {
      target_url: "https://www.worldofbooks.com/en-gb/books/childrens",
      target_type: "category",
      status: "in_progress",
      started_at: new Date("2024-10-05T14:00:00Z"),
      finished_at: null
    }
  ]
};

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('🔌 Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data (optional)
    console.log('🧹 Clearing existing data...');
    await db.collection('navigations').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('product_details').deleteMany({});
    await db.collection('reviews').deleteMany({});
    await db.collection('scrape_jobs').deleteMany({});
    await db.collection('view_histories').deleteMany({});

    // Insert navigation data
    console.log('📊 Inserting navigation data...');
    const navigationResult = await db.collection('navigations').insertMany(
      seedData.navigation.map(nav => ({
        ...nav,
        last_scraped_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }))
    );
    console.log(`✅ Inserted ${navigationResult.insertedCount} navigation records`);

    // Get navigation IDs for category references
    const navigations = await db.collection('navigations').find({}).toArray();
    const navigationMap = {};
    navigations.forEach(nav => {
      navigationMap[nav.slug] = nav._id;
    });

    // Insert category data with navigation references
    console.log('📚 Inserting category data...');
    const categoriesWithRefs = seedData.categories.map(cat => {
      const { navigation_slug, ...categoryData } = cat;
      return {
        ...categoryData,
        navigation_id: navigationMap[navigation_slug],
        parent_id: null,
        last_scraped_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    
    const categoryResult = await db.collection('categories').insertMany(categoriesWithRefs);
    console.log(`✅ Inserted ${categoryResult.insertedCount} category records`);

    // Get category IDs for product references
    const categories = await db.collection('categories').find({}).toArray();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Insert product data with category references
    console.log('📖 Inserting product data...');
    const productsWithRefs = seedData.products.map(prod => {
      const { category_slug, ...productData } = prod;
      return {
        ...productData,
        category_id: categoryMap[category_slug],
        last_scraped_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    
    const productResult = await db.collection('products').insertMany(productsWithRefs);
    console.log(`✅ Inserted ${productResult.insertedCount} product records`);

    // Get product IDs for detail references
    const products = await db.collection('products').find({}).toArray();
    const productMap = {};
    products.forEach(prod => {
      productMap[prod.source_id] = prod._id;
    });

    // Insert product details with product references
    console.log('📋 Inserting product details...');
    const detailsWithRefs = seedData.productDetails.map(detail => {
      const { source_id, ...detailData } = detail;
      return {
        ...detailData,
        product_id: productMap[source_id],
        recommendations: [],
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    
    const detailResult = await db.collection('product_details').insertMany(detailsWithRefs);
    console.log(`✅ Inserted ${detailResult.insertedCount} product detail records`);

    // Insert reviews with product references
    console.log('⭐ Inserting reviews...');
    const reviewsWithRefs = seedData.reviews.map(review => {
      const { source_id, ...reviewData } = review;
      return {
        ...reviewData,
        product_id: productMap[source_id],
        text: reviewData.content, // MongoDB version uses 'text' field
        created_at: new Date()
      };
    });
    
    const reviewResult = await db.collection('reviews').insertMany(reviewsWithRefs);
    console.log(`✅ Inserted ${reviewResult.insertedCount} review records`);

    // Insert scrape jobs
    console.log('🔧 Inserting scrape jobs...');
    const scrapeJobsWithDates = seedData.scrapeJobs.map(job => ({
      ...job,
      created_at: new Date()
    }));
    
    const scrapeJobResult = await db.collection('scrape_jobs').insertMany(scrapeJobsWithDates);
    console.log(`✅ Inserted ${scrapeJobResult.insertedCount} scrape job records`);

    // Create indexes for better performance
    console.log('📈 Creating indexes...');
    await db.collection('navigations').createIndex({ slug: 1 }, { unique: true });
    await db.collection('categories').createIndex({ slug: 1 }, { unique: true });
    await db.collection('categories').createIndex({ navigation_id: 1 });
    await db.collection('products').createIndex({ source_id: 1 }, { unique: true });
    await db.collection('products').createIndex({ source_url: 1 }, { unique: true });
    await db.collection('products').createIndex({ category_id: 1 });
    await db.collection('product_details').createIndex({ product_id: 1 });
    await db.collection('reviews').createIndex({ product_id: 1 });
    await db.collection('scrape_jobs').createIndex({ status: 1 });
    await db.collection('view_histories').createIndex({ session_id: 1 });
    
    // Update category product counts
    console.log('🔄 Updating category product counts...');
    for (const category of categories) {
      const productCount = await db.collection('products').countDocuments({ category_id: category._id });
      await db.collection('categories').updateOne(
        { _id: category._id },
        { $set: { product_count: productCount, updated_at: new Date() } }
      );
    }

    // Display summary
    console.log('\n📊 Database Summary:');
    console.log(`├─ Navigation: ${await db.collection('navigations').countDocuments()} records`);
    console.log(`├─ Categories: ${await db.collection('categories').countDocuments()} records`);
    console.log(`├─ Products: ${await db.collection('products').countDocuments()} records`);
    console.log(`├─ Product Details: ${await db.collection('product_details').countDocuments()} records`);
    console.log(`├─ Reviews: ${await db.collection('reviews').countDocuments()} records`);
    console.log(`└─ Scrape Jobs: ${await db.collection('scrape_jobs').countDocuments()} records`);

    console.log('\n🚀 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase().catch(console.error);
}

module.exports = { seedDatabase, seedData };

// Usage Instructions:
// 1. Install dependencies: npm install mongodb
// 2. Set MONGODB_URI environment variable (optional)
// 3. Run: node seed-mongodb.js
// 4. Or import and use: const { seedDatabase } = require('./seed-mongodb'); seedDatabase();