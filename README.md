# Nawy Apartment Listing Application

This is a full-stack apartment listing application featuring:
- Node.js + TypeScript backend with Express
- Next.js frontend with TypeScript
- MySQL database
- Containerized with Docker for easy deployment

## Project Structure

```
.
├── Backend/                 # Node.js + TypeScript Express backend
├── Frontend/                # Next.js frontend
└── docker-compose.yml       # Docker Compose configuration
```

## Requirements

- Docker and Docker Compose
- Node.js v20+ (for local development)
- MySQL (containerized)

## Quick Start

1. Clone this repository
2. Create environment files

   Create `.env` files in both Backend and Frontend directories using the provided examples:
   ```
   cp Backend/.env.example Backend/.env
   cp Frontend/.env.example Frontend/.env
   ```

3. Start the application with Docker Compose
   ```
   docker-compose up -d
   ```

4. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Features

- **Apartment Listings**: Browse available apartments with images
- **Detailed Views**: View comprehensive property information
- **Search & Filter**: Find properties by location, price, bedrooms, etc.
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## API Documentation

### Apartments

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/apartments` | GET | Get all apartments with optional filtering |
| `/api/apartments/:id` | GET | Get a specific apartment by ID |
| `/api/apartments` | POST | Create a new apartment |

#### Query Parameters for Searching

- `q`: Search by title, unit number, or project name

## Local Development

### Backend
```
cd Backend
npm install
npm run dev
```

### Frontend
```
cd Frontend
npm install
npm run dev
```

## Database Schema

### Apartment
- id: Int (PK)
- title: String
- description: String
- bedrooms: Int
- cityName: String
- areaName: String
- price: Float
- unitNumber: String
- projectName: String
- bathrooms: Int
- yearBuilt: Int?
- area: Float

### Image
- id: Int (PK)
- imageUrl: String
- isPrimary: Boolean
- apartmentId: Int (FK to Apartment)

## License
MIT