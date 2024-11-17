# Node.js, Prisma, and TypeScript Boilerplate

A robust and scalable boilerplate for building Node.js applications using **Prisma** as the ORM and **TypeScript** for type safety. This boilerplate includes user authentication (signup and login) and CRUD operations for products, all structured with best practices in mind.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Prisma Setup](#prisma-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
    - [Signup](#signup)
    - [Login](#login)
  - [Products](#products)
    - [Create Product](#create-product)
    - [Get All Products](#get-all-products)
    - [Get Product by ID](#get-product-by-id)
    - [Update Product](#update-product)
    - [Delete Product](#delete-product)

---

## Features

- **Authentication:**
    - User Signup
    - User Login with JWT Authentication
- **Product Management:**
    - Create, Read, Update, and Delete (CRUD) operations for products
    - Product attributes: `name` and `type`
- **Technologies:**
    - **Node.js**: JavaScript runtime
    - **Express.js**: Web framework
    - **Prisma**: ORM for database interactions
    - **TypeScript**: Static typing
    - **JWT**: JSON Web Tokens for authentication
    - **bcrypt**: Password hashing
- **Project Structure:**
    - Organized folders for controllers, routes, middleware, utilities, and more
    - Separation of concerns for maintainability and scalability
- **Utilities:**
    - Custom logger
    - Date utilities
- **Middleware:**
    - Test middleware demonstrating custom middleware implementation
    - Authentication middleware to protect routes

---

## Project Structure

```lua
node-prisma-boilerplate/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── productController.ts
│   ├── lib/
│   │   ├── middleware/
│   │   │   └── test.ts
│   │   └── utilities/
│   │       ├── date.js
│   │       └── logger.ts
│   ├── middleware/
│   │   └── authenticate.ts
│   └── routes/
│       ├── authRoutes.ts
│       └── productRoutes.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

```

---

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** database (configured as per your `.env` settings)

---

## Installation

1. **Clone the Repository**
    
    ```bash
    
    git clone https://github.com/yourusername/node-prisma-boilerplate.git
    cd node-prisma-boilerplate
    
    ```
    
2. **Install Dependencies**
    
    Using npm:
    
    ```bash
    
    npm install
    
    ```
    
    Or using yarn:
    
    ```bash
    
    yarn install
    
    ```
    

---

## Configuration

1. **Environment Variables**
    
    Create a `.env` file in the root directory and add the following environment variables:
    
    ```
    # Database Configuration
    DATABASE_URL="mysql://root:pass@127.0.0.1:3307/node-prisma"
    
    # Application Configuration
    JWT_SECRET=your_jwt_secret_key
    PORT=4000
    
    ```
    
    > Important: Replace your_jwt_secret_key with a secure secret key of your choice.
    > 
2. **Database Setup**
    
    Ensure your MySQL database is running and the credentials in the `.env` file match your setup.
    

---

## Prisma Setup

1. **Initialize Prisma**
    
    If Prisma is not initialized yet, run:
    
    ```bash
    
    npx prisma init
    
    ```
    
2. **Define Data Models**
    
    The `prisma/schema.prisma` file already includes `User` and `Product` models. Ensure it matches your database requirements.
    
3. **Apply Migrations**
    
    Apply the initial migration based on the `schema.prisma`:
    
    ```bash
    
    npx prisma migrate dev --name init
    
    ```
    
4. **Generate Prisma Client**
    
    Generate the Prisma client for type-safe database access:
    
    ```bash
    
    npx prisma generate
    
    ```
    

---

## Running the Application

### Development Mode

Start the development server with hot-reloading using `ts-node-dev`:

```bash
npm run dev

```

Or with yarn:

```bash
yarn dev

```

The server will start on `http://localhost:4000`.

### Production Mode

1. **Build the Project**
    
    ```bash
    
    npm run build
    
    ```
    
    Or with yarn:
    
    ```bash
    
    yarn build
    
    ```
    
2. **Start the Server**
    
    ```bash
    
    npm start
    
    ```
    
    Or with yarn:
    
    ```bash
    
    yarn start
    
    ```
    

---

## API Endpoints

### Base URL

```bash
http://localhost:4000/api

```

### Authentication

### Signup

- **Endpoint:** `/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    
    ```json
    
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    
    ```
    
- **Response:**
    - **Success (201 Created):**
        
        ```json
        
        {
          "token": "jwt_token_here"
        }
        
        ```
        
    - **Error (400 Bad Request):** User already exists.
        
        ```json
        
        {
          "error": "User already exists"
        }
        
        ```
        

### Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
    
    ```json
    
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    
    ```
    
- **Response:**
    - **Success (200 OK):**
        
        ```json
        
        {
          "token": "jwt_token_here"
        }
        
        ```
        
    - **Error (400 Bad Request):** Invalid credentials.
        
        ```json
        
        {
          "error": "Invalid credentials"
        }
        
        ```
        

### Products

### Create Product

- **Endpoint:** `/products`
- **Method:** `POST`
- **Description:** Creates a new product.
- **Headers:**
    
    ```makefile
    Authorization: Bearer <JWT_TOKEN>
    
    ```
    
- **Request Body:**
    
    ```json
    
    {
      "name": "Sample Product",
      "type": "Electronics"
    }
    
    ```
    
- **Response:**
    - **Success (201 Created):**
        
        ```json
        
        {
          "id": 1,
          "name": "Sample Product",
          "type": "Electronics",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z",
          "createdById": 1
        }
        
        ```
        
    - **Error (401 Unauthorized):** Missing or invalid token.
        
        ```json
        
        {
          "error": "Authorization header missing"
        }
        
        ```
        

### Get All Products

- **Endpoint:** `/products`
- **Method:** `GET`
- **Description:** Retrieves all products.
- **Response:**
    - **Success (200 OK):**
        
        ```json
        
        [
          {
            "id": 1,
            "name": "Sample Product",
            "type": "Electronics",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z",
            "createdById": 1
          },
          {
            "id": 2,
            "name": "Another Product",
            "type": "Books",
            "createdAt": "2023-01-02T00:00:00.000Z",
            "updatedAt": "2023-01-02T00:00:00.000Z",
            "createdById": 1
          }
        ]
        
        ```
        

### Get Product by ID

- **Endpoint:** `/products/:id`
- **Method:** `GET`
- **Description:** Retrieves a product by its ID.
- **Response:**
    - **Success (200 OK):**
        
        ```json
        
        {
          "id": 1,
          "name": "Sample Product",
          "type": "Electronics",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z",
          "createdById": 1
        }
        
        ```
        
    - **Error (404 Not Found):** Product not found.
        
        ```json
        
        {
          "error": "Product not found"
        }
        
        ```
        

### Update Product

- **Endpoint:** `/products/:id`
- **Method:** `PUT`
- **Description:** Updates a product by its ID.
- **Headers:**
    
    ```makefile
    
    Authorization: Bearer <JWT_TOKEN>
    
    ```
    
- **Request Body:**
    
    ```json
    
    {
      "name": "Updated Product",
      "type": "Updated Type"
    }
    
    ```
    
- **Response:**
    - **Success (200 OK):**
        
        ```json
        
        {
          "id": 1,
          "name": "Updated Product",
          "type": "Updated Type",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-02T00:00:00.000Z",
          "createdById": 1
        }
        
        ```
        
    - **Error (404 Not Found):** Product not found.
        
        ```json
        
        {
          "error": "Product not found"
        }
        
        ```
        

### Delete Product

- **Endpoint:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Deletes a product by its ID.
- **Headers:**
    
    ```makefile
    
    Authorization: Bearer <JWT_TOKEN>
    
    ```
    
- **Response:**
    - **Success (204 No Content):** Product deleted successfully.
    - **Error (404 Not Found):** Product not found.
        
        ```json
        {
          "error": "Product not found"
        }
        
        ```