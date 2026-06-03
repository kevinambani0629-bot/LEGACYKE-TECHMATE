# LEGACYKE-TECHMATE API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
API uses JWT (JSON Web Tokens) for authentication.

Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Products

#### Get All Products
```
GET /api/products
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 20)
- `brand` (optional): Filter by brand (e.g., Apple, Samsung)
- `category` (optional): Filter by category (e.g., phones, laptops)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `sort` (optional): Sort by price, rating, or newest

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_001",
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "category": "Phones",
      "price": 999.99,
      "image": "https://...",
      "rating": 4.8,
      "inStock": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

#### Get Product Details
```
GET /api/products/:id
```

### Users

#### Register
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```
POST /api/auth/login
```

### Orders

#### Create Order
```
POST /api/orders
```

**Headers:** Requires authentication

#### Get Order Status
```
GET /api/orders/:orderId
```

## Error Responses

```json
{
  "success": false,
  "error": "Error message"
}
```

## Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
