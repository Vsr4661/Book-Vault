-- Product Data Explorer - Database Seed Script
-- Compatible with PostgreSQL and SQLite
-- Created: October 5, 2025

-- Clean slate (optional - uncomment if you want to reset)
-- DROP TABLE IF EXISTS view_history CASCADE;
-- DROP TABLE IF EXISTS scrape_job CASCADE;
-- DROP TABLE IF EXISTS review CASCADE;
-- DROP TABLE IF EXISTS product_detail CASCADE;
-- DROP TABLE IF EXISTS product CASCADE;
-- DROP TABLE IF EXISTS category CASCADE;
-- DROP TABLE IF EXISTS navigation CASCADE;

-- Create Tables (PostgreSQL version)
CREATE TABLE IF NOT EXISTS navigation (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  url TEXT,
  last_scraped_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  navigation_id INT REFERENCES navigation(id) ON DELETE CASCADE,
  parent_id INT REFERENCES category(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  url TEXT,
  product_count INT DEFAULT 0,
  last_scraped_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  source_id VARCHAR(100) UNIQUE NOT NULL,
  category_id INT REFERENCES category(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255),
  price DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  image_url TEXT,
  source_url TEXT UNIQUE NOT NULL,
  last_scraped_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_detail (
  id SERIAL PRIMARY KEY,
  product_id INT UNIQUE REFERENCES product(id) ON DELETE CASCADE,
  description TEXT,
  specs JSONB,
  ratings_avg DECIMAL(3,2),
  reviews_count INT DEFAULT 0,
  publisher VARCHAR(255),
  publication_date DATE,
  isbn VARCHAR(20),
  recommendations JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id) ON DELETE CASCADE,
  author VARCHAR(255),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  text TEXT,
  review_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scrape_job (
  id SERIAL PRIMARY KEY,
  target_url TEXT NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  error_log TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS view_history (
  id SERIAL PRIMARY KEY,
  user_id INT,
  session_id VARCHAR(100),
  path_json JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert Navigation (Main Departments)
INSERT INTO navigation (title, slug, url) VALUES
('Books', 'books', 'https://www.worldofbooks.com/en-gb/books'),
('Fiction', 'fiction', 'https://www.worldofbooks.com/en-gb/books/fiction'),
('Non-Fiction', 'non-fiction', 'https://www.worldofbooks.com/en-gb/books/non-fiction'),
('Children''s Books', 'childrens-books', 'https://www.worldofbooks.com/en-gb/books/childrens'),
('Academic & Educational', 'academic-educational', 'https://www.worldofbooks.com/en-gb/books/academic'),
('Art & Design', 'art-design', 'https://www.worldofbooks.com/en-gb/books/art-design'),
('Biography & Memoir', 'biography-memoir', 'https://www.worldofbooks.com/en-gb/books/biography'),
('Business & Economics', 'business-economics', 'https://www.worldofbooks.com/en-gb/books/business'),
('Computing & IT', 'computing-it', 'https://www.worldofbooks.com/en-gb/books/computing'),
('Health & Lifestyle', 'health-lifestyle', 'https://www.worldofbooks.com/en-gb/books/health')
ON CONFLICT (slug) DO NOTHING;

-- Insert Categories (Sub-categories)
INSERT INTO category (navigation_id, title, slug, url, product_count) VALUES
-- Fiction categories
(2, 'Literary Fiction', 'literary-fiction', 'https://www.worldofbooks.com/en-gb/books/fiction/literary', 245),
(2, 'Mystery & Thriller', 'mystery-thriller', 'https://www.worldofbooks.com/en-gb/books/fiction/mystery', 387),
(2, 'Romance', 'romance', 'https://www.worldofbooks.com/en-gb/books/fiction/romance', 298),
(2, 'Science Fiction & Fantasy', 'sci-fi-fantasy', 'https://www.worldofbooks.com/en-gb/books/fiction/sci-fi', 456),
(2, 'Historical Fiction', 'historical-fiction', 'https://www.worldofbooks.com/en-gb/books/fiction/historical', 189),
(2, 'Crime & Detective', 'crime-detective', 'https://www.worldofbooks.com/en-gb/books/fiction/crime', 334),

-- Children's Books categories
(4, 'Picture Books', 'picture-books', 'https://www.worldofbooks.com/en-gb/books/childrens/picture', 567),
(4, 'Early Readers', 'early-readers', 'https://www.worldofbooks.com/en-gb/books/childrens/early', 423),
(4, 'Middle Grade', 'middle-grade', 'https://www.worldofbooks.com/en-gb/books/childrens/middle', 298),
(4, 'Young Adult', 'young-adult', 'https://www.worldofbooks.com/en-gb/books/childrens/teen', 445),

-- Non-Fiction categories
(3, 'History', 'history', 'https://www.worldofbooks.com/en-gb/books/non-fiction/history', 678),
(3, 'Science & Nature', 'science-nature', 'https://www.worldofbooks.com/en-gb/books/non-fiction/science', 389),
(3, 'Politics & Philosophy', 'politics-philosophy', 'https://www.worldofbooks.com/en-gb/books/non-fiction/politics', 234),
(3, 'Travel & Geography', 'travel-geography', 'https://www.worldofbooks.com/en-gb/books/non-fiction/travel', 156),

-- Academic & Educational
(5, 'Textbooks', 'textbooks', 'https://www.worldofbooks.com/en-gb/books/academic/textbooks', 789),
(5, 'Reference', 'reference', 'https://www.worldofbooks.com/en-gb/books/academic/reference', 234),

-- Art & Design
(6, 'Fine Arts', 'fine-arts', 'https://www.worldofbooks.com/en-gb/books/art/fine-arts', 167),
(6, 'Photography', 'photography', 'https://www.worldofbooks.com/en-gb/books/art/photography', 89),

-- Biography & Memoir
(7, 'Autobiographies', 'autobiographies', 'https://www.worldofbooks.com/en-gb/books/biography/auto', 145),
(7, 'Celebrity Memoirs', 'celebrity-memoirs', 'https://www.worldofbooks.com/en-gb/books/biography/celebrity', 98)
ON CONFLICT (slug) DO NOTHING;

-- Insert Sample Products
INSERT INTO product (source_id, category_id, title, author, price, currency, image_url, source_url) VALUES
-- Literary Fiction
('WOB001', 1, 'To Kill a Mockingbird', 'Harper Lee', 12.99, 'USD', 'https://images.worldofbooks.com/covers/mockingbird.jpg', 'https://www.worldofbooks.com/en-gb/books/harper-lee/to-kill-a-mockingbird'),
('WOB002', 1, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 'USD', 'https://images.worldofbooks.com/covers/gatsby.jpg', 'https://www.worldofbooks.com/en-gb/books/f-scott-fitzgerald/great-gatsby'),
('WOB003', 1, 'Pride and Prejudice', 'Jane Austen', 9.99, 'USD', 'https://images.worldofbooks.com/covers/pride-prejudice.jpg', 'https://www.worldofbooks.com/en-gb/books/jane-austen/pride-and-prejudice'),

-- Mystery & Thriller
('WOB004', 2, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 14.99, 'USD', 'https://images.worldofbooks.com/covers/dragon-tattoo.jpg', 'https://www.worldofbooks.com/en-gb/books/stieg-larsson/girl-dragon-tattoo'),
('WOB005', 2, 'Gone Girl', 'Gillian Flynn', 13.99, 'USD', 'https://images.worldofbooks.com/covers/gone-girl.jpg', 'https://www.worldofbooks.com/en-gb/books/gillian-flynn/gone-girl'),
('WOB006', 2, 'The Da Vinci Code', 'Dan Brown', 11.99, 'USD', 'https://images.worldofbooks.com/covers/davinci-code.jpg', 'https://www.worldofbooks.com/en-gb/books/dan-brown/da-vinci-code'),

-- Science Fiction & Fantasy
('WOB007', 4, 'Dune', 'Frank Herbert', 16.99, 'USD', 'https://images.worldofbooks.com/covers/dune.jpg', 'https://www.worldofbooks.com/en-gb/books/frank-herbert/dune'),
('WOB008', 4, 'The Hobbit', 'J.R.R. Tolkien', 12.99, 'USD', 'https://images.worldofbooks.com/covers/hobbit.jpg', 'https://www.worldofbooks.com/en-gb/books/jrr-tolkien/hobbit'),
('WOB009', 4, '1984', 'George Orwell', 11.99, 'USD', 'https://images.worldofbooks.com/covers/1984.jpg', 'https://www.worldofbooks.com/en-gb/books/george-orwell/1984'),

-- Picture Books
('WOB010', 7, 'Where the Wild Things Are', 'Maurice Sendak', 8.99, 'USD', 'https://images.worldofbooks.com/covers/wild-things.jpg', 'https://www.worldofbooks.com/en-gb/books/maurice-sendak/where-wild-things-are'),
('WOB011', 7, 'The Very Hungry Caterpillar', 'Eric Carle', 7.99, 'USD', 'https://images.worldofbooks.com/covers/hungry-caterpillar.jpg', 'https://www.worldofbooks.com/en-gb/books/eric-carle/very-hungry-caterpillar'),

-- Young Adult
('WOB012', 10, 'The Hunger Games', 'Suzanne Collins', 13.99, 'USD', 'https://images.worldofbooks.com/covers/hunger-games.jpg', 'https://www.worldofbooks.com/en-gb/books/suzanne-collins/hunger-games'),
('WOB013', 10, 'Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 15.99, 'USD', 'https://images.worldofbooks.com/covers/harry-potter.jpg', 'https://www.worldofbooks.com/en-gb/books/jk-rowling/harry-potter-philosophers-stone'),

-- History
('WOB014', 11, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 18.99, 'USD', 'https://images.worldofbooks.com/covers/sapiens.jpg', 'https://www.worldofbooks.com/en-gb/books/yuval-harari/sapiens'),
('WOB015', 11, 'The Second World War', 'Winston Churchill', 24.99, 'USD', 'https://images.worldofbooks.com/covers/second-world-war.jpg', 'https://www.worldofbooks.com/en-gb/books/winston-churchill/second-world-war')
ON CONFLICT (source_id) DO NOTHING;

-- Insert Product Details
INSERT INTO product_detail (product_id, description, specs, ratings_avg, reviews_count, publisher, publication_date, isbn) VALUES
(1, 'Harper Lee''s Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred.', 
   '{"pages": 281, "language": "English", "format": "Paperback", "dimensions": "7.5 x 4.2 x 0.8 inches", "weight": "0.4 lbs"}', 
   4.8, 2847, 'Harper Perennial Modern Classics', '1960-07-11', '9780061120084'),

(2, 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island.', 
   '{"pages": 180, "language": "English", "format": "Paperback", "dimensions": "8.0 x 5.2 x 0.5 inches", "weight": "0.3 lbs"}', 
   4.2, 1934, 'Scribner', '1925-04-10', '9780743273565'),

(3, 'Jane Austen''s beloved classic opens with one of the most famous lines in English literature.', 
   '{"pages": 432, "language": "English", "format": "Paperback", "dimensions": "7.8 x 5.1 x 1.1 inches", "weight": "0.6 lbs"}', 
   4.6, 3421, 'Penguin Classics', '1813-01-28', '9780141439518'),

(4, 'The first book in the Millennium trilogy introduces Lisbeth Salander, one of the most original characters in a thriller series.', 
   '{"pages": 672, "language": "English", "format": "Paperback", "dimensions": "8.2 x 5.5 x 1.7 inches", "weight": "1.1 lbs"}', 
   4.4, 2156, 'Vintage Crime/Black Lizard', '2005-08-01', '9780307454546'),

(5, 'A psychological thriller about a marriage gone terribly wrong. The story unfolds through diary entries and present-day narration.', 
   '{"pages": 419, "language": "English", "format": "Paperback", "dimensions": "8.0 x 5.3 x 1.1 inches", "weight": "0.7 lbs"}', 
   4.0, 1789, 'Broadway Books', '2012-06-05', '9780307588371')
ON CONFLICT (product_id) DO NOTHING;

-- Insert Sample Reviews
INSERT INTO review (product_id, author, rating, content, review_date) VALUES
(1, 'BookLover123', 5, 'A timeless classic that everyone should read. Harper Lee''s writing is masterful and the story is deeply moving.', '2024-09-15'),
(1, 'ClassicReader', 5, 'One of the best books I''ve ever read. The characters are so well-developed and the themes are still relevant today.', '2024-08-22'),
(1, 'StudentReader', 4, 'Required reading for school, but actually enjoyed it. Scout is such a great narrator.', '2024-07-10'),

(2, 'LiteratureProf', 4, 'Fitzgerald''s prose is beautiful and the symbolism is rich. A great example of the American Dream''s complexity.', '2024-09-01'),
(2, 'ModernReader', 3, 'Good book but felt a bit slow in parts. The ending was powerful though.', '2024-08-15'),

(4, 'ThrillerFan', 5, 'Couldn''t put it down! Lisbeth Salander is such a complex and fascinating character.', '2024-09-20'),
(4, 'MysteryReader', 4, 'Great start to the trilogy. The plot is intricate and well-crafted.', '2024-08-30'),

(13, 'PotterHead', 5, 'The book that started it all! Still magical after all these years. Rowling''s world-building is incredible.', '2024-09-25'),
(13, 'FantasyLover', 5, 'Perfect introduction to the wizarding world. Love how it grows with the readers.', '2024-09-12')
ON CONFLICT DO NOTHING;

-- Insert Sample Scrape Jobs
INSERT INTO scrape_job (target_url, target_type, status, started_at, finished_at) VALUES
('https://www.worldofbooks.com/en-gb/books', 'navigation', 'completed', '2024-10-01 10:00:00', '2024-10-01 10:05:00'),
('https://www.worldofbooks.com/en-gb/books/fiction', 'category', 'completed', '2024-10-01 10:05:00', '2024-10-01 10:15:00'),
('https://www.worldofbooks.com/en-gb/books/fiction/literary', 'products', 'completed', '2024-10-01 10:15:00', '2024-10-01 10:45:00'),
('https://www.worldofbooks.com/en-gb/books/childrens', 'category', 'in_progress', '2024-10-05 14:00:00', NULL)
ON CONFLICT DO NOTHING;

-- Update category product counts based on actual products
UPDATE category SET product_count = (
  SELECT COUNT(*) FROM product WHERE category_id = category.id
) WHERE id <= 20;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_category_id ON product(category_id);
CREATE INDEX IF NOT EXISTS idx_product_source_id ON product(source_id);
CREATE INDEX IF NOT EXISTS idx_category_navigation_id ON category(navigation_id);
CREATE INDEX IF NOT EXISTS idx_category_parent_id ON category(parent_id);
CREATE INDEX IF NOT EXISTS idx_review_product_id ON review(product_id);
CREATE INDEX IF NOT EXISTS idx_product_detail_product_id ON product_detail(product_id);
CREATE INDEX IF NOT EXISTS idx_scrape_job_status ON scrape_job(status);
CREATE INDEX IF NOT EXISTS idx_view_history_session_id ON view_history(session_id);

-- Display summary
SELECT 
  'Navigation' as table_name, COUNT(*) as records FROM navigation
UNION ALL
SELECT 
  'Categories' as table_name, COUNT(*) as records FROM category
UNION ALL
SELECT 
  'Products' as table_name, COUNT(*) as records FROM product
UNION ALL
SELECT 
  'Product Details' as table_name, COUNT(*) as records FROM product_detail
UNION ALL
SELECT 
  'Reviews' as table_name, COUNT(*) as records FROM review
UNION ALL
SELECT 
  'Scrape Jobs' as table_name, COUNT(*) as records FROM scrape_job;

-- Success message
SELECT 'Database seeded successfully! 🚀' as status;