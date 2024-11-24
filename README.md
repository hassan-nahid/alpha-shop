# Alpha Shop

Alpha Shop is an e-commerce application built with a React frontend and an Express backend.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [License](#license)

## Features

- User authentication (signup, login)
- Product listing
- Product details
- Add to cart
- View cart
- Checkout (not implemented yet)

## Setup Instructions

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/alphashop.git
    cd alphashop/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and fill in the required environment variables as shown in `.env.example`.

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

4. Open your browser and go to `http://localhost:51730`.

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret