# Pizza API Documentation

**Version:** 1.0.0  
**Author:** Goodluck

## Overview

Welcome to the documentation for Pizza API! This RESTful API provides access to various resources for your application, adhering to REST principles. It is built on Express.js with Prisma as the database ORM, using PostgreSQL and Node as the backend runtime environment.


### User Signup

- **Endpoint:** `POST /api/signup`
  - **Summary:** Create a new user.
  - **Parameters:**
    - `name` (body): Name of the new user.
    - `username` (body): Username of the new user.
    - `email` (body): Email address of the new user.
    - `password` (body): Password of the new user.
    - `address` (body): Address of the new user.
  - **Response:**
    - `201 Created`: User successfully created.
    - `400 Bad Request`: All fields are required!.
    - `409 Conflict`: User with the provided username or email already exists.
    - `500 Internal Server Error`: Server error.

### User Login

- **Endpoint:** `POST /api/login`
  - **Summary:** Authenticate a user and return a token.
  - **Parameters:**
    - `email` (body): Email address of the user.
    - `password` (body): Password of the user.
  - **Response:**
    - `200 OK`: Return user and token.
    - `400 Bad Request`: All fields are required!.
    - `401 Unauthorized`: Wrong Credentials.
    - `404 Conflict`: User email does not exist.
    - `500 Internal Server Error`: Internal Server error.

## Pizza Management APIs

### List Pizzas

- **Endpoint:** `GET /api/pizzas`
  - **Summary:** List available pizza types and their prices.
  - **Parameters:** None
  - **Response:**
    - `200 OK`: List of Pizza.
    - `500 Internal Server Error`: Internal Server error.

## Order Management APIs

### Place a New Order

- **Endpoint:** `POST /api/order`
  - **Summary:** Place a new pizza order (only accessible to logged-in users).
  - **Parameters:**
    - `user_id` (body): User id for placing the order.
    - `quantity` (body): Number of pizzas.
    - `address` (body): Delivery address.
    - `totalPrice` (body): Total price of the order.
    - `pizzaType` (body): Type of pizza.
  - **Response:**
    - `201 OK`: Order pizza data.
    - `400 Bad Request`: All fields are required!.
    - `400 Unauthorized`: Unauthorized.
    - `404 Not Found`: Pizza Type with this name not found.
    - `500 Internal Server Error`: Internal Server error.

### Retrieve Orders

- **Endpoint:** `GET /api/orders`
  - **Summary:** Retrieve a list of all orders (user-specific).
  - **Parameters:** None
  - **Response:**
    - `200 OK`: List of Order Pizza.
    - `401 Unauthorized`: Authentication failure.
    - `404 Not Found`: Product with the provided ID not found.
    - `500 Internal Server Error`: Server error.

### Retrieve Specific Order

- **Endpoint:** `GET /api/order/{id}`
  - **Summary:** Retrieve details of a specific order.
  - **Parameters:**
    - `{id}` (path parameter): ID of the Order.
  - **Response:**
    - `200 OK`: Order details retrieved.
    - `401 Unauthorized`: Unauthorized.
    - `404 Not Found`: Order with the provided ID not found.
    - `500 Internal Server Error`: Server error.

### Update an Existing Order

- **Endpoint:** `PUT /api/order/{id}`
  - **Summary:** Update an existing order (e.g., change address, pizza type).
  - **Parameters:**
    - `{id}` (path parameter): ID of the Order.
    - `quantity` (body): Number of pizzas.
    - `address` (body): Delivery address.
    - `totalPrice` (body): Total price of the order.
    - `pizzaType` (body): Type of pizza.
  - **Response:**
    - `201 OK`: Order updated successfully.
    - `400 Bad Request`: All fields are required!.
    - `400 Unauthorized`: Unauthorized.
    - `404 Not Found`: Pizza Type or Order not found.
    - `500 Internal Server Error`: Internal Server error.

### Cancel an Order

- **Endpoint:** `DELETE /api/order/{id}`
  - **Summary:** Cancel an order.
  - **Parameters:**
    - `{id}` (path parameter): ID of the Order.
  - **Response:**
    - `200 OK`: Order deleted successfully.
    - `401 Unauthorized`: Unauthorized.
    - `404 Not Found`: Order with the provided ID not found.
    - `500 Internal Server Error`: Server error.


## PIZZA DELIVERY API
Developed a RESTful API service for a pizza delivery system, incorporating user management (login and
signup) and pizza ordering functionalities. Ensured that placing orders is restricted to logged-in users.
This is a REST API built with Node,Express,prisma and PostgreSQL.

## ROUTES TO IMPLEMENT
| METHOD | ROUTE | FUNCTIONALITY |ACCESS|
| ------- | ----- | ------------- | ------------- |
| *POST* | ```/api/signup/``` | _Register new user_| _All users_|
| *POST* | ```/api/login/``` | _Login user_|_All users_|
| *GET* | ```/api/pizzas/``` | _Get Pizza List_|_All users_|
| *POST* | ```/api/order``` | _Place an order_|_Authenticated users_|
| *GET* | ```/api/orders/``` | _List all orders made_|_Specific user_|
| *PUT* | ```/api/order/{order_id}/``` | _Update an order_|_Specific users_|
| *GET* | ```/api/order/{order_id}/``` | _Get user's orders_|_Specific users_|
| *DELETE* | ```/api/order/{order_id}/``` | _Delete/Remove an order_ |_Specific users_|

## How to run the Project
- Git clone the project with ``` git clone https://github.com/goodluck04/pizza-api.git```
- Requirements for running the server ```  node and npm  ```
- Install the dependancies `npm i` or `npm install` 
- create a migration file ```   npx prisma migrate dev --name init ```
- Start the server with ```  npm run dev ```

## Enviroment Variables
-create .env file in the root directory.
```

DATABASE_URL="postgresql://<user>:<password>@localhost:5432/pizzaDB?schema=public"
PORT=8080
JWT_SECRET="kwnfwknfoknfklw"

```

- Finally run the API
``` npm run dev ```

