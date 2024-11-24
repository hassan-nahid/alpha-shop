# Alpha Shop

Alpha Shop is an e-commerce application built with a React frontend and an Express backend.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Package.json](#package-json)
- [Scripts](#scripts)
- [License](#license)

## Features

- User authentication (signup, login)
- Product listing
- Product details
- Add to cart
- View cart
- Delete cart
- Checkout (not implemented yet)

## Setup Instructions

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/hassan-nahid/alpha-shop.git
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

4. Open your browser and go to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## Package.json Variables

### Frontend [package.json]

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-router-dom": "^7.0.1",
    "react-toastify": "^10.0.6",
    "sweetalert2": "^11.14.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.14",
    "eslint": "^9.13.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.10"
  }
}
```

### Backend [package.json]

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.7.7",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.13.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
}
```
## Scripts

### Backend

- `npm run dev`: Start the backend server with nodemon for development.

### Frontend

- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.

## License

This project is licensed under the MIT License.
