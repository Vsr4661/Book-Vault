# 📚 BookVault Pro - Professional Book Discovery Platform

<div align="center">

![BookVault Pro](https://img.shields.io/badge/BookVault-Pro-blue?style=for-the-badge&logo=book&logoColor=white)
![Built by](https://img.shields.io/badge/Built%20by-Vaibhav%20Singh-brightgreen?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs)
![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-007ACC?style=for-the-badge&logo=typescript)

*A professional-grade full-stack application for book discovery and e-commerce*

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [💼 Contact](#contact)

</div>

---

## 🌟 Overview

**BookVault Pro** is a sophisticated, production-ready book discovery and e-commerce platform built with modern web technologies. It demonstrates enterprise-level architecture, responsive design, and seamless user experience - perfect for showcasing professional development skills.

### 🎯 Project Highlights

- **Full-Stack Architecture**: Next.js 15 frontend + NestJS backend
- **Professional UI/UX**: Modern, responsive design with smooth animations
- **Real-time Data**: Live product information with caching strategies  
- **Enterprise Features**: Advanced search, filtering, cart management, user profiles
- **Scalable Design**: Modular architecture ready for production deployment
- **Performance Optimized**: Image optimization, lazy loading, efficient API calls

---

## ✨ Features

### 🎨 **Professional User Interface**
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Modern Aesthetics**: Clean, professional layout with smooth animations
- **Interactive Elements**: Hover effects, loading states, and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation support

### 📚 **Advanced Book Discovery**
- **Smart Search**: AI-powered search with auto-suggestions and filters
- **Category Navigation**: Intuitive browsing by genres and topics  
- **Product Details**: Rich book information with reviews and ratings
- **Personalized Recommendations**: Intelligent suggestions based on user preferences

### 🛒 **Complete E-commerce Solution**
- **Shopping Cart**: Full cart management with persistent storage
- **User Profiles**: Personalized user accounts and preferences
- **Wishlist**: Save favorite books for later
- **Order Management**: Complete order tracking and history

### 🔧 **Technical Excellence**
- **Type-Safe**: 100% TypeScript for reliability and maintainability
- **API-First**: RESTful APIs with comprehensive documentation
- **Database**: Robust SQLite database with TypeORM
- **Performance**: Optimized loading, caching, and image handling
- **Security**: Input validation, sanitization, and secure practices

---

## 🏗️ Architecture

### **Frontend (Next.js 15)**
```
frontend/
├── src/
│   ├── app/                 # App Router pages
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── lib/                # Utilities and configurations
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── tailwind.config.js     # Styling configuration
```

### **Backend (NestJS)**
```
backend/
├── src/
│   ├── modules/            # Feature modules
│   ├── entities/           # Database entities
│   ├── dto/                # Data Transfer Objects
│   └── services/           # Business logic
├── database-seed.ts        # Database seeding
└── database.sqlite        # SQLite database
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhavsingh/bookvault-pro.git
   cd bookvault-pro
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (root, frontend, backend)
   npm run install:all
   ```

3. **Set up the database**
   ```bash
   # Seed the database with sample data
   cd backend
   npx ts-node database-seed.ts
   cd ..
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **API Documentation**: http://localhost:3001/api/docs

### Individual Commands

```bash
# Development
npm run dev:frontend        # Start frontend only
npm run dev:backend         # Start backend only

# Production
npm run build              # Build both applications
npm run start              # Start production servers

# Testing & Quality
npm run test               # Run all tests
npm run lint               # Lint all code
```

---

## 💻 Technology Stack

### **Frontend**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **SWR**: Data fetching and caching
- **Context API**: State management

### **Backend**
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Full type safety
- **TypeORM**: Database ORM
- **SQLite**: Embedded database
- **Swagger**: API documentation
- **Class Validator**: Input validation

### **Development Tools**
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Concurrently**: Run multiple commands
- **ts-node**: TypeScript execution

---

## 📱 Screenshots & Demo

### 🏠 **Modern Homepage**
- Hero section with animated elements
- Featured products showcase
- Category navigation with hover effects
- Professional statistics display

### 📚 **Product Catalog**
- Advanced filtering and search
- Grid/List view toggle
- Professional product cards
- Pagination and sorting

### 🛒 **Shopping Experience**
- Persistent shopping cart
- Real-time cart updates
- User-friendly checkout flow
- Wishlist functionality

### 📊 **Admin Features**
- Data management dashboard
- Real-time scraping capabilities
- Analytics and reporting
- User management

---

## 🔧 Configuration

### **Environment Variables**

Create `.env` files in both frontend and backend directories:

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=BookVault Pro
```

**Backend (.env)**
```env
DATABASE_PATH=./database.sqlite
PORT=3001
NODE_ENV=development
```

### **Database Configuration**

The application uses SQLite for simplicity and portability. The database is automatically created and seeded with sample data.

To customize the database:
1. Edit `backend/database-seed.ts`
2. Run `npx ts-node database-seed.ts`

---

## 🚀 Deployment

### **Production Deployment**

1. **Build the applications**
   ```bash
   npm run build
   ```

2. **Deploy Frontend (Vercel)**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Deploy Backend (Railway/Heroku)**
   ```bash
   cd backend
   # Follow your platform's deployment guide
   ```

### **Docker Deployment**

```dockerfile
# Dockerfile provided for containerized deployment
docker-compose up --build
```

---

## 📈 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: SWR for client-side caching
- **Database Indexing**: Optimized database queries
- **Bundle Analysis**: Webpack bundle optimization

---

## 🧪 Testing

```bash
# Frontend tests
npm run test:frontend

# Backend tests  
npm run test:backend

# E2E tests
npm run test:e2e

# Coverage reports
npm run test:coverage
```

---

## 📚 API Documentation

The backend provides comprehensive API documentation via Swagger:

**Access**: http://localhost:3001/api/docs

### **Key Endpoints**

```typescript
GET /api/products          # Get products with filtering
GET /api/products/:id      # Get product details  
GET /api/categories        # Get all categories
GET /api/navigation        # Get navigation items
POST /api/products/scrape  # Scrape new products
```

---

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💼 Contact

**Vaibhav Singh**
- 📧 Email: vaibhav.singh@example.com
- 🔗 LinkedIn: [linkedin.com/in/vaibhav-singh](https://linkedin.com/in/vaibhav-singh)
- 🐙 GitHub: [github.com/vaibhavsingh](https://github.com/vaibhavsingh)
- 🌐 Portfolio: [vaibhavsingh.dev](https://vaibhavsingh.dev)

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce platforms
- **Icons**: Lucide React icon library
- **Fonts**: Inter font family
- **Color Palette**: Tailwind CSS color system

---

<div align="center">

**⭐ If you find this project impressive, please give it a star! ⭐**

*Built with ❤️ by Vaibhav Singh*

</div>