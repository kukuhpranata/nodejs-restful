# Simple Node Js Restful
Simple CRUD API using Node and Express follows model-service-controller pattern. 
---

## Project Structure

This project follows a clear and modular architecture and structure for better organization and maintainability.

```
.
├── config/
│   ├── db.config.js
│   └── env.config.js
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   └── user.model.js
├── node-restful-mysql-docker/
│   ├── db_dump.sql
│   └── docker-compose.yml
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
├── services/
│   └── user.service.js
├── utils/
│   ├── apiResponse.js
│   ├── email.utils.js
│   └── logger.js
├── views/
├── .env
├── .gitignore
├── app.js
├── server.js
├── pnpm-lock.yaml
├── README.md
└── package.json
```

---

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node
- Express
- pnpm
- MySQL database / Docker

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kukuhpranata/nodejs-restful.git
cd /nodejs-restful
```

### 2. Set Up Environment Variables

Copy the example `.env` file:

```bash
cp .env.example .env
```

Then open `.env` and configure your database connection and other required variables.

---

## Running the Application

Start the application with:

```bash
pnpm start
pnpm run dev
```
The application should now be accessible at http://127.0.0.1:3000

---