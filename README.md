# redditus test task

Brief description of my NodeJS application.

## Table of Contents

- [Setup and Running](#setup-and-running)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
  - [Users](#users)
    - [Get All Users](#get-all-users)
    - [Get User by ID](#get-user-by-id)
    - [Update User](#update-user)
    - [Delete User](#delete-user)
  - [Products](#products)
    - [Create Product](#create-product)
    - [Get All Products](#get-all-products)
    - [Get Product by ID](#get-product-by-id)
    - [Update Product](#update-product)
    - [Delete Product](#delete-product)

## Setup and Running

Follow these instructions to set up and run the application.

### Prerequisites

- NodeJS installed
- MongoDB Atlas account
- AWS EC2 instance
- AWS ElastiCache Redis cluster
- (Add any other dependencies or services needed)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/IcyHarka/redditus.git
   ```

2. Navigate to the project directory:
   
   ```bash
   cd redditus
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env file based on the provided .env.example file.

   ```bash
   cp .env.example .env
   ```

5. Start the application:

   ```bash
   npm run start
   ```

## API Documentation

### Authentication

#### Register

- **Endpoint:** `POST /auth/register`
- **Payload:**
  - `username`
  - `password`
  - `password_repeat`
  - `email`

#### Login

- **Endpoint:** `POST /auth/login`
- **Payload:**
  - `username`
  - `password`

### Users

#### Get All Users

- **Endpoint:** `GET /users`

#### Get User by ID

- **Endpoint:** `GET /users/:id`

#### Update User

- **Endpoint:** `PUT /users/:id`
- **Payload:**
  - `username`

#### Delete User

- **Endpoint:** `DEL /users/:id`

### Products

#### Create Product

- **Endpoint:** `POST /products`
- **Payload:**
  - `name`
  - `description`
  - `price`
  - `category`

#### Get All Products

- **Endpoint:** `GET /products`

#### Get Product by ID

- **Endpoint:** `GET /products/:id`

#### Update Product

- **Endpoint:** `PUT /products/:id`
- **Payload:**
  - `name`
  - `description`
  - `price`
  - `category`

#### Delete Product

- **Endpoint:** `DEL /products/:id`