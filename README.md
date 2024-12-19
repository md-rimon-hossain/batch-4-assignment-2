# Book Shop Web API (Assignment 2)

This is a Book Shop management and order processing web API built using TypeScript, Express.js, and MongoDB. It provides functionality for managing books and processing orders. The API follows a RESTful architecture with routes prefixed `/api`.

## Features

- CRUD operations for managing books
- Ability to make orders and track revenue
- Built using TypeScript, Express, and MongoDB

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Car Routes](#car-routes)
  - [Order Routes](#order-routes)
- [Live Link](#live-link)
- [Technologies](#technologies)

## Installation

1. Clone the repository.
2. Navigate into the project directory `cd batch-4-assignment-2`
3. Install the required dependencies using `npm install` or `yarn install`.

4. Run Locally

```bash
npm run start:dev
```

5. Build Project

```bash
npm run build
```

`Alternatively, for development mode with live reloading, use npm run start:dev.`

## Environment-Variables

1. Set up environment variables in a `.env` file:

```env
PORT=5000
MONGODB_URL= demo mongodb://localhost:27017/assignment-2
```

- Environment Variables
  The following environment variables are required for the application to run:
  - PORT: The port the server will run on (default is 5000).
  - MONGODB_URL: The URL for your MongoDB instance.

## API Documentation

### Car-Routes (/api/books)

1.  Create a new car

    - Endpoint: (POST) /api/products
           - Request Body:
      
      ```json
      
            {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10,
      "category": "Fiction",
      "description": "A story about the American dream.",
      "quantity": 100,
      "inStock": true 
      }  
    
      ```
      - Response:
      ```json
           {
      "message": "Book created successfully",
      "success": true,
      "data": {
        "_id": "648a45e5f0123c45678d9012",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 100,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z",
      }
    }

      ```

2.  Get all books

    - Endpoint: GET /api/products

      - Response:

      ```json
      {
      "message": "Books retrieved successfully",
      "success": true,
      "data": [
        {
          "_id": "648a45e5f0123c45678d9012",
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "price": 10,
          "category": "Fiction",
          "description": "A story about the American dream.",
          "quantity": 100,
          "inStock": true,
          "createdAt": "2024-11-19T10:23:45.123Z",
          "updatedAt": "2024-11-19T10:23:45.123Z",
        },
        // ... rest data
      ]
      }
      ```

3.  Get a single book by ID

   - Endpoint: GET /api/products/:productId
       - Response:

         ```json
              {
          "message": "Book retrieved successfully",
          "success": true,
          "data": {
            "_id": "648a45e5f0123c45678d9012",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 10,
            "category": "Fiction",
            "description": "A story about the American dream.",
            "quantity": 100,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T10:23:45.123Z",
          }
          }
    
          ```

4.  Update a book by ID

    - Endpoint: PUT /api/products/:productId

      - Request Body:

        ```json
        {
        "price": 15,
        "quantity": 25,
        }
        ```

      - Response:
        ```json
        {
        "message": "Book updated successfully",
        "success": true,
        "data": {
          "_id": "648a45e5f0123c45678d9012",
          "name": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "price": 15,  // Price updated
          "category": "Fiction",
          "description": "A story about the American dream.",
          "quantity": 25,  // Quantity updated
          "inStock": true,
          "createdAt": "2024-11-19T10:23:45.123Z",
          "updatedAt": "2024-11-19T11:00:00.000Z",  // Updated timestamp
        }
        }
        ```

5.  Delete a book by ID
    - Endpoint: DELETE /api/products/:productId
      - Response
      ```json
      {
        "message": "Book deleted successfully",
        "success": true,
        "data": {}
      }
      ```

### Order-Routes (/api/orders)

1.  Make an order

    - Endpoint: POST /api/orders

      - Request Body:

        ```json
        {
          "email": "customer@example.com",
          "product": "648a45e5f0123c45678d9012",
          "quantity": 2,
          "totalPrice": 30
        }
        ```

      - Response:

        ```json
         {
            "message": "Order created successfully",
            "success": true,
            "data": {
              "_id": "648b45f5e1234b56789a6789",
              "email": "customer@example.com",
              "product": "648a45e5f0123c45678d9012",
              "quantity": 2,
              "totalPrice": 30,
              "createdAt": "2024-11-19T12:00:00.000Z",
              "updatedAt": "2024-11-19T12:00:00.000Z",
            }
          }
        ```

2.  Get total revenue

    - Endpoint: GET /api/orders/revenue
      - Response:
        ```json
        {
        "message": "Revenue calculated successfully",
        "success": true,
        "data": {
          "totalRevenue": 450  // Total revenue calculated from all orders
        }
        }
        ```

## Live-Link

- ### Live - [Live Link](https://batch-4-assignment-2-pearl.vercel.app/)

- ### Live-Video-Explanation - [Live Video Explanation](https://drive.google.com/file/d/1zPquRqDYmQCY2yo9x6xZLvoZrmxnAcuu/view?usp=sharing)
