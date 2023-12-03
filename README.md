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