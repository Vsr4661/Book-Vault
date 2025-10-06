import { DataSource } from 'typeorm';
import { Navigation } from './src/navigation/navigation.entity';
import { Category } from './src/category/category.entity';
import { Product } from './src/product/product.entity';
import { ProductDetail } from './src/product/product-detail.entity';
import { Review } from './src/product/review.entity';

export async function seedDatabase(dataSource: DataSource) {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await dataSource.getRepository(Review).clear();
    await dataSource.getRepository(ProductDetail).clear();
    await dataSource.getRepository(Product).clear();
    await dataSource.getRepository(Category).clear();
    await dataSource.getRepository(Navigation).clear();

    // Seed Navigation (Main Departments)
    console.log('📊 Seeding navigation data...');
    const navigationData = [
      { title: 'Books', slug: 'books', url: 'https://www.worldofbooks.com/en-gb/books' },
      { title: 'Fiction', slug: 'fiction', url: 'https://www.worldofbooks.com/en-gb/books/fiction' },
      { title: 'Non-Fiction', slug: 'non-fiction', url: 'https://www.worldofbooks.com/en-gb/books/non-fiction' },
      { title: "Children's Books", slug: 'childrens-books', url: 'https://www.worldofbooks.com/en-gb/books/childrens' },
      { title: 'Academic & Educational', slug: 'academic-educational', url: 'https://www.worldofbooks.com/en-gb/books/academic' },
      { title: 'Art & Design', slug: 'art-design', url: 'https://www.worldofbooks.com/en-gb/books/art-design' },
      { title: 'Biography & Memoir', slug: 'biography-memoir', url: 'https://www.worldofbooks.com/en-gb/books/biography' },
      { title: 'Business & Economics', slug: 'business-economics', url: 'https://www.worldofbooks.com/en-gb/books/business' },
      { title: 'Computing & IT', slug: 'computing-it', url: 'https://www.worldofbooks.com/en-gb/books/computing' },
      { title: 'Health & Lifestyle', slug: 'health-lifestyle', url: 'https://www.worldofbooks.com/en-gb/books/health' }
    ];

    const navigationRepo = dataSource.getRepository(Navigation);
    const navigations = await navigationRepo.save(navigationData);
    console.log(`✅ Inserted ${navigations.length} navigation records`);

    // Create navigation map for easy reference
    const navMap = {};
    navigations.forEach(nav => {
      navMap[nav.slug] = nav;
    });

    // Seed Categories (Sub-categories)
    console.log('📚 Seeding category data...');
    const categoryData = [
      // Fiction categories
      { navigationId: navMap['fiction'].id, title: 'Literary Fiction', slug: 'literary-fiction', url: 'https://www.worldofbooks.com/en-gb/books/fiction/literary', productCount: 245 },
      { navigationId: navMap['fiction'].id, title: 'Mystery & Thriller', slug: 'mystery-thriller', url: 'https://www.worldofbooks.com/en-gb/books/fiction/mystery', productCount: 387 },
      { navigationId: navMap['fiction'].id, title: 'Romance', slug: 'romance', url: 'https://www.worldofbooks.com/en-gb/books/fiction/romance', productCount: 298 },
      { navigationId: navMap['fiction'].id, title: 'Science Fiction & Fantasy', slug: 'sci-fi-fantasy', url: 'https://www.worldofbooks.com/en-gb/books/fiction/sci-fi', productCount: 456 },
      { navigationId: navMap['fiction'].id, title: 'Historical Fiction', slug: 'historical-fiction', url: 'https://www.worldofbooks.com/en-gb/books/fiction/historical', productCount: 189 },
      { navigationId: navMap['fiction'].id, title: 'Crime & Detective', slug: 'crime-detective', url: 'https://www.worldofbooks.com/en-gb/books/fiction/crime', productCount: 334 },

      // Children's Books categories
      { navigationId: navMap['childrens-books'].id, title: 'Picture Books', slug: 'picture-books', url: 'https://www.worldofbooks.com/en-gb/books/childrens/picture', productCount: 567 },
      { navigationId: navMap['childrens-books'].id, title: 'Early Readers', slug: 'early-readers', url: 'https://www.worldofbooks.com/en-gb/books/childrens/early', productCount: 423 },
      { navigationId: navMap['childrens-books'].id, title: 'Middle Grade', slug: 'middle-grade', url: 'https://www.worldofbooks.com/en-gb/books/childrens/middle', productCount: 298 },
      { navigationId: navMap['childrens-books'].id, title: 'Young Adult', slug: 'young-adult', url: 'https://www.worldofbooks.com/en-gb/books/childrens/teen', productCount: 445 },

      // Non-Fiction categories
      { navigationId: navMap['non-fiction'].id, title: 'History', slug: 'history', url: 'https://www.worldofbooks.com/en-gb/books/non-fiction/history', productCount: 678 },
      { navigationId: navMap['non-fiction'].id, title: 'Science & Nature', slug: 'science-nature', url: 'https://www.worldofbooks.com/en-gb/books/non-fiction/science', productCount: 389 },
      { navigationId: navMap['non-fiction'].id, title: 'Politics & Philosophy', slug: 'politics-philosophy', url: 'https://www.worldofbooks.com/en-gb/books/non-fiction/politics', productCount: 234 },
      { navigationId: navMap['non-fiction'].id, title: 'Travel & Geography', slug: 'travel-geography', url: 'https://www.worldofbooks.com/en-gb/books/non-fiction/travel', productCount: 156 },

      // Academic & Educational
      { navigationId: navMap['academic-educational'].id, title: 'Textbooks', slug: 'textbooks', url: 'https://www.worldofbooks.com/en-gb/books/academic/textbooks', productCount: 789 },
      { navigationId: navMap['academic-educational'].id, title: 'Reference', slug: 'reference', url: 'https://www.worldofbooks.com/en-gb/books/academic/reference', productCount: 234 },

      // Art & Design
      { navigationId: navMap['art-design'].id, title: 'Fine Arts', slug: 'fine-arts', url: 'https://www.worldofbooks.com/en-gb/books/art/fine-arts', productCount: 167 },
      { navigationId: navMap['art-design'].id, title: 'Photography', slug: 'photography', url: 'https://www.worldofbooks.com/en-gb/books/art/photography', productCount: 89 },

      // Biography & Memoir
      { navigationId: navMap['biography-memoir'].id, title: 'Autobiographies', slug: 'autobiographies', url: 'https://www.worldofbooks.com/en-gb/books/biography/auto', productCount: 145 },
      { navigationId: navMap['biography-memoir'].id, title: 'Celebrity Memoirs', slug: 'celebrity-memoirs', url: 'https://www.worldofbooks.com/en-gb/books/biography/celebrity', productCount: 98 }
    ];

    const categoryRepo = dataSource.getRepository(Category);
    const categories = await categoryRepo.save(categoryData);
    console.log(`✅ Inserted ${categories.length} category records`);

    // Create category map for easy reference
    const catMap = {};
    categories.forEach(cat => {
      catMap[cat.slug] = cat;
    });

    // Seed Products
    console.log('📖 Seeding product data...');
    const productData = [
      // Literary Fiction
      {
        sourceId: 'WOB001',
        categoryId: catMap['literary-fiction'].id,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 12.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/mockingbird.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/harper-lee/to-kill-a-mockingbird'
      },
      {
        sourceId: 'WOB002',
        categoryId: catMap['literary-fiction'].id,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 10.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/gatsby.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/f-scott-fitzgerald/great-gatsby'
      },
      {
        sourceId: 'WOB003',
        categoryId: catMap['literary-fiction'].id,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/pride-prejudice.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jane-austen/pride-and-prejudice'
      },

      // Mystery & Thriller
      {
        sourceId: 'WOB004',
        categoryId: catMap['mystery-thriller'].id,
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        price: 14.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/dragon-tattoo.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/stieg-larsson/girl-dragon-tattoo'
      },
      {
        sourceId: 'WOB005',
        categoryId: catMap['mystery-thriller'].id,
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        price: 13.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/gone-girl.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/gillian-flynn/gone-girl'
      },
      {
        sourceId: 'WOB006',
        categoryId: catMap['mystery-thriller'].id,
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        price: 11.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/davinci-code.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/dan-brown/da-vinci-code'
      },

      // Science Fiction & Fantasy
      {
        sourceId: 'WOB007',
        categoryId: catMap['sci-fi-fantasy'].id,
        title: 'Dune',
        author: 'Frank Herbert',
        price: 16.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/dune.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/frank-herbert/dune'
      },
      {
        sourceId: 'WOB008',
        categoryId: catMap['sci-fi-fantasy'].id,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        price: 12.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/hobbit.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jrr-tolkien/hobbit'
      },
      {
        sourceId: 'WOB009',
        categoryId: catMap['sci-fi-fantasy'].id,
        title: '1984',
        author: 'George Orwell',
        price: 11.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/1984.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/george-orwell/1984'
      },

      // Picture Books
      {
        sourceId: 'WOB010',
        categoryId: catMap['picture-books'].id,
        title: 'Where the Wild Things Are',
        author: 'Maurice Sendak',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/wild-things.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/maurice-sendak/where-wild-things-are'
      },
      {
        sourceId: 'WOB011',
        categoryId: catMap['picture-books'].id,
        title: 'The Very Hungry Caterpillar',
        author: 'Eric Carle',
        price: 7.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/hungry-caterpillar.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/eric-carle/very-hungry-caterpillar'
      },

      // Young Adult
      {
        sourceId: 'WOB012',
        categoryId: catMap['young-adult'].id,
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        price: 13.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/hunger-games.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/suzanne-collins/hunger-games'
      },
      {
        sourceId: 'WOB013',
        categoryId: catMap['young-adult'].id,
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        price: 15.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/harry-potter.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jk-rowling/harry-potter-philosophers-stone'
      },

      // History
      {
        sourceId: 'WOB014',
        categoryId: catMap['history'].id,
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        price: 18.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/sapiens.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/yuval-harari/sapiens'
      },
      {
        sourceId: 'WOB015',
        categoryId: catMap['history'].id,
        title: 'The Second World War',
        author: 'Winston Churchill',
        price: 24.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/second-world-war.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/winston-churchill/second-world-war'
      },

      // Romance novels
      {
        sourceId: 'WOB016',
        categoryId: catMap['romance'].id,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/pride-prejudice.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jane-austen/pride-prejudice'
      },
      {
        sourceId: 'WOB017',
        categoryId: catMap['romance'].id,
        title: 'The Notebook',
        author: 'Nicholas Sparks',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/notebook.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/nicholas-sparks/notebook'
      },
      {
        sourceId: 'WOB018',
        categoryId: catMap['romance'].id,
        title: 'Me Before You',
        author: 'Jojo Moyes',
        price: 10.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/me-before-you.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jojo-moyes/me-before-you'
      },

      // Historical Fiction
      {
        sourceId: 'WOB019',
        categoryId: catMap['historical-fiction'].id,
        title: 'The Book Thief',
        author: 'Markus Zusak',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/book-thief.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/markus-zusak/book-thief'
      },
      {
        sourceId: 'WOB020',
        categoryId: catMap['historical-fiction'].id,
        title: 'All Quiet on the Western Front',
        author: 'Erich Maria Remarque',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/all-quiet.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/erich-remarque/all-quiet'
      },
      {
        sourceId: 'WOB021',
        categoryId: catMap['historical-fiction'].id,
        title: 'The Pillars of the Earth',
        author: 'Ken Follett',
        price: 12.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/pillars-earth.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/ken-follett/pillars-earth'
      },

      // Crime & Detective
      {
        sourceId: 'WOB022',
        categoryId: catMap['crime-detective'].id,
        title: 'The Adventures of Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        price: 7.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/sherlock-holmes.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/arthur-doyle/sherlock-holmes'
      },
      {
        sourceId: 'WOB023',
        categoryId: catMap['crime-detective'].id,
        title: 'In the Woods',
        author: 'Tana French',
        price: 11.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/in-woods.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/tana-french/in-woods'
      },
      {
        sourceId: 'WOB024',
        categoryId: catMap['crime-detective'].id,
        title: 'The Big Sleep',
        author: 'Raymond Chandler',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/big-sleep.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/raymond-chandler/big-sleep'
      },

      // Early Readers
      {
        sourceId: 'WOB025',
        categoryId: catMap['early-readers'].id,
        title: 'Green Eggs and Ham',
        author: 'Dr. Seuss',
        price: 6.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/green-eggs-ham.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/dr-seuss/green-eggs-ham'
      },
      {
        sourceId: 'WOB026',
        categoryId: catMap['early-readers'].id,
        title: 'The Cat in the Hat',
        author: 'Dr. Seuss',
        price: 6.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/cat-hat.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/dr-seuss/cat-hat'
      },
      {
        sourceId: 'WOB027',
        categoryId: catMap['early-readers'].id,
        title: 'Frog and Toad Are Friends',
        author: 'Arnold Lobel',
        price: 5.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/frog-toad.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/arnold-lobel/frog-toad'
      },

      // Middle Grade
      {
        sourceId: 'WOB028',
        categoryId: catMap['middle-grade'].id,
        title: 'Wonder',
        author: 'R.J. Palacio',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/wonder.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/rj-palacio/wonder'
      },
      {
        sourceId: 'WOB029',
        categoryId: catMap['middle-grade'].id,
        title: 'Holes',
        author: 'Louis Sachar',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/holes.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/louis-sachar/holes'
      },
      {
        sourceId: 'WOB030',
        categoryId: catMap['middle-grade'].id,
        title: 'Bridge to Terabithia',
        author: 'Katherine Paterson',
        price: 7.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/bridge-terabithia.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/katherine-paterson/bridge-terabithia'
      },

      // Additional books for existing categories
      {
        sourceId: 'WOB031',
        categoryId: catMap['literary-fiction'].id,
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        price: 8.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/jane-eyre.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/charlotte-bronte/jane-eyre'
      },
      {
        sourceId: 'WOB032',
        categoryId: catMap['young-adult'].id,
        title: 'Catching Fire',
        author: 'Suzanne Collins',
        price: 10.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/catching-fire.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/suzanne-collins/catching-fire'
      },
      {
        sourceId: 'WOB033',
        categoryId: catMap['literary-fiction'].id,
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        price: 12.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/crawdads-sing.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/delia-owens/crawdads-sing'
      },
      {
        sourceId: 'WOB034',
        categoryId: catMap['sci-fi-fantasy'].id,
        title: 'The Fellowship of the Ring',
        author: 'J.R.R. Tolkien',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/fellowship-ring.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/jrr-tolkien/fellowship-ring'
      },
      {
        sourceId: 'WOB035',
        categoryId: catMap['picture-books'].id,
        title: 'The Very Hungry Caterpillar',
        author: 'Eric Carle',
        price: 7.99,
        currency: 'USD',
        imageUrl: 'https://images.worldofbooks.com/covers/hungry-caterpillar.jpg',
        sourceUrl: 'https://www.worldofbooks.com/en-gb/books/eric-carle/hungry-caterpillar'
      }
    ];

    const productRepo = dataSource.getRepository(Product);
    const products = await productRepo.save(productData);
    console.log(`✅ Inserted ${products.length} product records`);

    // Create product map for easy reference
    const prodMap = {};
    products.forEach(prod => {
      prodMap[prod.sourceId] = prod;
    });

    // Seed Product Details
    console.log('📋 Seeding product details...');
    const productDetailData = [
      {
        productId: prodMap['WOB001'].id,
        description: "Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred.",
        specs: {
          pages: 281,
          language: 'English',
          format: 'Paperback',
          dimensions: '7.5 x 4.2 x 0.8 inches',
          weight: '0.4 lbs'
        },
        ratingsAvg: 4.8,
        reviewsCount: 2847,
        publisher: 'Harper Perennial Modern Classics',
        publicationDate: '1960-07-11',
        isbn: '9780061120084'
      },
      {
        productId: prodMap['WOB002'].id,
        description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island.',
        specs: {
          pages: 180,
          language: 'English',
          format: 'Paperback',
          dimensions: '8.0 x 5.2 x 0.5 inches',
          weight: '0.3 lbs'
        },
        ratingsAvg: 4.2,
        reviewsCount: 1934,
        publisher: 'Scribner',
        publicationDate: '1925-04-10',
        isbn: '9780743273565'
      },
      {
        productId: prodMap['WOB003'].id,
        description: "Jane Austen's beloved classic opens with one of the most famous lines in English literature.",
        specs: {
          pages: 432,
          language: 'English',
          format: 'Paperback',
          dimensions: '7.8 x 5.1 x 1.1 inches',
          weight: '0.6 lbs'
        },
        ratingsAvg: 4.6,
        reviewsCount: 3421,
        publisher: 'Penguin Classics',
        publicationDate: '1813-01-28',
        isbn: '9780141439518'
      },
      {
        productId: prodMap['WOB004'].id,
        description: 'The first book in the Millennium trilogy introduces Lisbeth Salander, one of the most original characters in a thriller series.',
        specs: {
          pages: 672,
          language: 'English',
          format: 'Paperback',
          dimensions: '8.2 x 5.5 x 1.7 inches',
          weight: '1.1 lbs'
        },
        ratingsAvg: 4.4,
        reviewsCount: 2156,
        publisher: 'Vintage Crime/Black Lizard',
        publicationDate: '2005-08-01',
        isbn: '9780307454546'
      },
      {
        productId: prodMap['WOB005'].id,
        description: 'A psychological thriller about a marriage gone terribly wrong. The story unfolds through diary entries and present-day narration.',
        specs: {
          pages: 419,
          language: 'English',
          format: 'Paperback',
          dimensions: '8.0 x 5.3 x 1.1 inches',
          weight: '0.7 lbs'
        },
        ratingsAvg: 4.0,
        reviewsCount: 1789,
        publisher: 'Broadway Books',
        publicationDate: '2012-06-05',
        isbn: '9780307588371'
      }
    ];

    const productDetailRepo = dataSource.getRepository(ProductDetail);
    const productDetails = await productDetailRepo.save(productDetailData);
    console.log(`✅ Inserted ${productDetails.length} product detail records`);

    // Seed Reviews
    console.log('⭐ Seeding reviews...');
    const reviewData = [
      {
        productId: prodMap['WOB001'].id,
        author: 'BookLover123',
        rating: 5,
        text: "A timeless classic that everyone should read. Harper Lee's writing is masterful and the story is deeply moving.",
        reviewDate: new Date('2024-09-15')
      },
      {
        productId: prodMap['WOB001'].id,
        author: 'ClassicReader',
        rating: 5,
        text: "One of the best books I've ever read. The characters are so well-developed and the themes are still relevant today.",
        reviewDate: new Date('2024-08-22')
      },
      {
        productId: prodMap['WOB001'].id,
        author: 'StudentReader',
        rating: 4,
        text: 'Required reading for school, but actually enjoyed it. Scout is such a great narrator.',
        reviewDate: new Date('2024-07-10')
      },
      {
        productId: prodMap['WOB002'].id,
        author: 'LiteratureProf',
        rating: 4,
        text: "Fitzgerald's prose is beautiful and the symbolism is rich. A great example of the American Dream's complexity.",
        reviewDate: new Date('2024-09-01')
      },
      {
        productId: prodMap['WOB002'].id,
        author: 'ModernReader',
        rating: 3,
        text: 'Good book but felt a bit slow in parts. The ending was powerful though.',
        reviewDate: new Date('2024-08-15')
      },
      {
        productId: prodMap['WOB004'].id,
        author: 'ThrillerFan',
        rating: 5,
        text: "Couldn't put it down! Lisbeth Salander is such a complex and fascinating character.",
        reviewDate: new Date('2024-09-20')
      },
      {
        productId: prodMap['WOB004'].id,
        author: 'MysteryReader',
        rating: 4,
        text: 'Great start to the trilogy. The plot is intricate and well-crafted.',
        reviewDate: new Date('2024-08-30')
      },
      {
        productId: prodMap['WOB013'].id,
        author: 'PotterHead',
        rating: 5,
        text: "The book that started it all! Still magical after all these years. Rowling's world-building is incredible.",
        reviewDate: new Date('2024-09-25')
      },
      {
        productId: prodMap['WOB013'].id,
        author: 'FantasyLover',
        rating: 5,
        text: 'Perfect introduction to the wizarding world. Love how it grows with the readers.',
        reviewDate: new Date('2024-09-12')
      }
    ];

    const reviewRepo = dataSource.getRepository(Review);
    const reviews = await reviewRepo.save(reviewData);
    console.log(`✅ Inserted ${reviews.length} review records`);

    // Update category product counts based on actual products
    console.log('🔄 Updating category product counts...');
    for (const category of categories) {
      const productCount = await productRepo.count({ where: { categoryId: category.id } });
      await categoryRepo.update(category.id, { productCount });
    }

    // Display summary
    console.log('\n📊 Database Summary:');
    console.log(`├─ Navigation: ${await navigationRepo.count()} records`);
    console.log(`├─ Categories: ${await categoryRepo.count()} records`);
    console.log(`├─ Products: ${await productRepo.count()} records`);
    console.log(`├─ Product Details: ${await productDetailRepo.count()} records`);
    console.log(`└─ Reviews: ${await reviewRepo.count()} records`);

    console.log('\n🚀 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}