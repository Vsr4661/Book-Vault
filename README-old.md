# Product Data Explorer

A full-stack product exploration platform that allows users to navigate from high-level headings → categories → products → product detail pages powered by live, on-demand scraping from World of Books.

## 🚀 Features

- **Smart Navigation**: Browse products through hierarchical categories
- **Live Scraping**: Real-time data extraction from World of Books using ethical scraping practices
- **Product Search**: Advanced search and filtering capabilities
- **Detailed Product Pages**: Complete product information, reviews, and recommendations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Accessibility**: WCAG AA compliant interface
- **Production Ready**: Built with scalability and performance in mind

## 🛠 Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **SWR** for data fetching and caching
- **Lucide React** for icons

### Backend
- **NestJS** with TypeScript
- **PostgreSQL** database with TypeORM
- **Crawlee + Playwright** for web scraping
- **Swagger/OpenAPI** for API documentation
- **Rate limiting** and **throttling** for API protection

### Infrastructure
- **Docker** with multi-stage builds
- **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **ESLint** and **Prettier** for code quality

## 📁 Project Structure

```
product-data-explorer/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities and API client
│   │   └── types/           # TypeScript type definitions
│   ├── Dockerfile
│   └── package.json
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── navigation/      # Navigation module
│   │   ├── category/        # Category module
│   │   ├── product/         # Product module
│   │   ├── scraping/        # Scraping service
│   │   └── database/        # Database configuration
│   ├── Dockerfile
│   └── package.json
├── .github/
│   └── workflows/           # CI/CD pipeline
├── docker-compose.yml       # Development environment
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Docker and Docker Compose (optional)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-data-explorer
   ```

2. **Backend Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Frontend Environment**
   ```bash
   cd frontend
   # Create .env.local if needed
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

### Development Setup

#### Option 1: Using Docker Compose (Recommended)

```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option 2: Manual Setup

1. **Start PostgreSQL Database**
   ```bash
   # Using Docker
   docker run -d \
     --name postgres-dev \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=product_explorer \
     -p 5432:5432 \
     postgres:15-alpine
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## 📊 Database Schema

The application uses the following main entities:

- **Navigation**: Top-level navigation categories
- **Category**: Product categories and subcategories
- **Product**: Product information from World of Books
- **ProductDetail**: Extended product details and specifications
- **Review**: Product reviews and ratings
- **ScrapeJob**: Tracking of scraping operations
- **ViewHistory**: User browsing history

## 🔧 API Documentation

The backend provides a RESTful API with the following main endpoints:

- `GET /api/navigation` - Get navigation categories
- `POST /api/navigation/scrape` - Scrape navigation from World of Books
- `GET /api/categories` - Get categories
- `POST /api/categories/scrape` - Scrape categories
- `GET /api/products` - Get products with filtering and pagination
- `POST /api/products/scrape` - Scrape products
- `GET /api/products/{id}` - Get product details
- `POST /api/products/{id}/scrape-detail` - Scrape detailed product information

Full API documentation is available at `/api/docs` when running the backend.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
```

## 🔐 Security & Best Practices

- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Input Validation**: All inputs are validated using DTOs and class-validator
- **CORS**: Properly configured for frontend-backend communication
- **Environment Variables**: Sensitive data stored in environment variables
- **Ethical Scraping**: Respects robots.txt and implements delays/backoff

## 📈 Performance & Caching

- **Database Indexing**: Optimized queries with proper indexes
- **SWR Caching**: Frontend data caching and revalidation
- **Scraping Cache**: Prevents excessive requests to World of Books
- **Lazy Loading**: Components and images load on demand

## 🌐 Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Railway/Render (Backend)
```bash
cd backend
# Configure environment variables on your platform
# Deploy using platform-specific commands
```

### Docker Production
```bash
# Build production images
docker build -f frontend/Dockerfile -t product-explorer-frontend .
docker build -f backend/Dockerfile -t product-explorer-backend .
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is for educational purposes. Please ensure you comply with World of Books' terms of service and robots.txt when using the scraping functionality.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the API documentation at `/api/docs`
3. Check the application logs for error details

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Crawlee Documentation](https://crawlee.dev)
- [TypeORM Documentation](https://typeorm.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)