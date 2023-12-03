# API Documentation for PIZZA API

**Version:** 1.0.0  
**Author:** Goodluck

## Overview

Welcome to the documentation for Pizza API! This RESTful API has been developed to serve as a fundamental component of a pizza delivery system. It encompasses user management functionalities such as login and signup, along with the ability to place pizza orders. Notably, placing orders is restricted to logged-in users. The API strictly adheres to REST principles and is built on top of Express.js with Prisma as the database ORM, utilizing PostgreSQL as the backend.

## Technologies Used

- **Express.js:** The web application framework for handling HTTP requests and responses.
- **Prisma with PostgreSQL:** The database toolkit and relational database management system, ensuring secure and efficient data storage.
- **Node.js:** The server-side runtime environment known for its non-blocking I/O and event-driven architecture.
- **JSON Web Token (JWT):** Used for secure user authentication and authorization.
- **bcryptjs:**  A library for hashing passwords to enhance security.

## Enviroment Variables

-create .env file in the root directory.

```

DATABASE_URL="postgresql://<user>:<password>@localhost:5432/pizzaDB?schema=public"
PORT=8080
JWT_SECRET="kwnfwknfoknfklw"

```

## How to run the Project

- Git clone the project with ` git clone https://github.com/goodluck04/pizza-api.git`
- Requirements for running the server ` node and npm `
- Install the dependancies `npm i` or `npm install`
- create a migration file `  npx prisma migrate dev --name init`
- Start the server with ` npm run dev`

## ROUTES TO IMPLEMENTED

| METHOD   | ROUTE                    | FUNCTIONALITY            | ACCESS                |
| -------- | ------------------------ | ------------------------ | --------------------- |
| _POST_   | `/api/signup/`           | _Register new user_      | _All users_           |
| _POST_   | `/api/login/`            | _Login user_             | _All users_           |
| _GET_    | `/api/pizzas/`           | _Get Pizza List_         | _All users_           |
| _POST_   | `/api/order`             | _Place an order_         | _Authenticated users_ |
| _GET_    | `/api/orders/`           | _List all orders made_   | _Specific user_       |
| _PUT_    | `/api/order/{order_id}/` | _Update an order_        | _Specific users_      |
| _GET_    | `/api/order/{order_id}/` | _Get user's orders_      | _Specific users_      |
| _DELETE_ | `/api/order/{order_id}/` | _Delete/Remove an order_ | _Specific users_      |

## API Endpoints

### 1. User Management APIs:

#### Signup

- **Endpoint:** `POST /api/signup`

  - **Summary:** Create a new user.
  - **Parameters:**
    - `name` (body): Name of the new user.
    - `username` (body): Username of the new user.
    - `email` (body): Email address of the new user.
    - `password` (body): Password of the new user.
    - `address` (body): Address of the new user.
  - **Responses:** - `201 Created`: User successfully created. - `400 Bad Request`: All fields are required!. - `409 Conflict`: User with the provided username or email already exists. - `500 Internal Server Error`: Server error.

        **Request Body Example**
        ```json

    {
    "name": "test",
    "email": "test@gmail.com",
    "address": "Baker Street, New Delhi",
    "password": "12345678"
    }

#### Login

- **Endpoint:** `POST /api/login`

  - **Summary:** Authenticate a user and return a token.
  - **Parameters:**
    - `email` (body): Email address of the user.
    - `password` (body): Password of the user.
  - **Responses:** - `200 Created`: Return user and token. - `400 Bad Request`: All fields are required!. - `401 Unauthorized`: Wrong Credentials. - `404 Conflict`: User email does not exist. - `500 Internal Server Error`: Internal Server error.

             **Request Body Example**
        ```json

    {
    "email": "test@gmail.com",
    "password": "12345678"
    }

### 2. Pizza Management APIs:

#### List Pizzas

- **Endpoint:** `GET /api/pizzas`
  - **Summary:** List available pizza types and their prices.
  - **Parameters:** None
  - **Responses:**
    - `200 OK`: [List of Pizza].
    - `500 Internal Server Error`: Internal Server error.

### 3. Order Management APIs:

#### Place a New Pizza Order

- **Endpoint:** `POST /api/order`

  - **Summary:** Place a new pizza order (only accessible to logged-in users).
  - **Parameters:**
    - `user_id` (body): User ID for placing the order.
    - `quantity` (body): Number of pizzas.
    - `address` (body): Delivery address.
    - `totalPrice` (body): Total price of the order.
    - `pizzaType` (body): Type of pizza.
  - **Responses:** - `201 OK`: Order pizza data. - `400 Bad Request`: All fields are required!. - `400 Unauthorized`: Unauthorized. - `404 Not Found`: Pizza Type with this name not found. - `500 Internal Server Error`: Internal Server error.

         **Request Body Example**
        ```json

    {
    "user_id":1,
    "quantity": 10,
    "address": "hi",
    "totalPrice":100,
    "pizzaType": "small"
    }

#### Retrieve All Orders

- **Endpoint:** `GET /api/orders`
  - **Summary:** Retrieve a list of all orders (user-specific).
  - **Parameters:** None
  - **Responses:**
    - `200 OK`: List of Order Pizza.
    - `401 Unauthorized`: Authentication failure.
    - `404 Not Found`: Product with the provided ID not found.
    - `500 Internal Server Error`: Server error.

#### Retrieve Specific Order

- **Endpoint:** `GET /api/order/{id}`
  - **Summary:** Retrieve details of a specific order.
  - **Parameters:**
    - `{id}` (path parameter): ID of the Order.
  - **Responses:**
    - `200 OK`: Order details retrieved.
    - `401 Unauthorized`: Unauthorized.
    - `404 Not Found`: Order with the provided ID not found.
    - `500 Internal Server Error`: Server error.

#### Update Existing Order

- **Endpoint:** `PUT /api/order/{id}`
  - **Summary:** Update an existing order (e.g., change address, pizza type).
  - **Parameters:**
    - `{id}` (path parameter): ID of the Order.
    - `quantity` (body): Number of pizzas.
    - `address` (body): Delivery address.
    - `totalPrice` (body): Total price of the order.
    - `pizzaType` (body): Type of pizza.
  - **Responses:**
    - `201 OK`: Order updated successfully.
    - `400 Bad Request`: All fields are required!.
    - `400 Unauthorized`: Unauthorized.
    - `404 Not Found`: Pizza Type or Order not found.
    - `500 Internal Server Error`: Internal Server error.

#### Cancel an Order

- **Endpoint:** `DELETE /api

/order/{id}`

- **Summary:** Cancel an order.
- **Parameters:**
  - `{id}` (path parameter): ID of the Order.
- **Responses:**
  - `200 OK`: Order deleted successfully.
  - `401 Unauthorized`: Unauthorized.
  - `404 Not Found`: Order with the provided ID not found.
  - `500 Internal Server Error`: Server error.
