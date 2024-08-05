# Ecommerce API

This is an Ecommerce API built with Express.js, TypeScript, and MongoDB.

## Features

- User Authentication and Authorization
- User Account Management
- Cart Management
- Product Management
- Order Management

## Technologies

- Express.js
- TypeScript
- MongoDB
- Stripe
- JWT - Auth

## Requirements

- Node.js : To download nodejs go to [nodejs.org](https://nodejs.org/en) website
- MongoDB You can host MongoDB locally by downloading [MongoDB Community Server](https://www.mongodb.com/try/download/community) or using [MongoDB Atlas](https://www.mongodb.com/atlas) for free
- Yarn

## Getting Started

### Clone the repository
```
git clone https://github.com/abdulwaheed-apk/ecommerce-api.git

cd ecommerce-api

yarn install
```
create a `.env` file at root folder and and create following environment variables 

`MONGODB_URI`=  <br>
`POR`=3000  <br>
`JWT_SECRET`= <br>
`STRIPE_SECRET_KEY`=


## API endpoints
#### User Endpoints

Admin only: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `GET` &nbsp;&nbsp;&nbsp;&nbsp;  `/api/v1/users`  <br>
Public: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `POST` &nbsp;&nbsp; `/api/v1/users/register`  <br>
Public: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `POST` &nbsp;&nbsp; `/api/v1/users/auth` <br>
Authenticated: &nbsp;&nbsp; `POST` &nbsp;&nbsp; `/api/v1/users/logout` <br>
Authenticated: &nbsp;&nbsp; `PATCH` &nbsp;&nbsp; `/api/v1/users/profileUpdate`  <br>
Authenticated: &nbsp;&nbsp; `POST` &nbsp;&nbsp; `/api/v1/users/deleteUser` <br>