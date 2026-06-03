# LEGACYKE-TECHMATE

**One-Point Electronics & High-End Phones Sales Platform**

A comprehensive e-commerce platform specializing in electronics and premium smartphones from all major brands, featuring real-time pricing and product imagery.

## Features

- **Multi-Brand Inventory**: Apple, Samsung, Google, OnePlus, Xiaomi, and more
- **Real-Time Pricing**: Current market prices updated daily
- **High-Quality Product Images**: Professional photography for all listings
- **User-Friendly Interface**: Intuitive navigation and search
- **Secure Transactions**: Encrypted payment processing
- **Order Management**: Track orders and delivery status
- **Product Reviews & Ratings**: Community feedback system
- **Wishlist & Comparisons**: Compare specs and prices

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Storage**: AWS S3 for product images
- **Payment**: Stripe/PayPal integration
- **Hosting**: Docker containerization

## Project Structure

```
LEGACYKE-TECHMATE/
├── frontend/          # React application
├── backend/           # Express API server
├── database/          # Database schemas & migrations
├── docker-compose.yml # Docker configuration
└── docs/              # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Docker & Docker Compose
- PostgreSQL (if not using Docker)

### Installation

```bash
# Clone repository
git clone https://github.com/kevinambani0629-bot/LEGACYKE-TECHMATE.git
cd LEGACYKE-TECHMATE

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start with Docker
docker-compose up -d
```

## Development

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run frontend
cd frontend && npm start

# Run backend (in another terminal)
cd backend && npm run dev
```

## API Documentation

See `/docs/API.md` for complete API endpoints and usage.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Contact

- Email: support@legacyke-techmate.com
- Website: https://legacyke-techmate.com
