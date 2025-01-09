# CC Shop - Card Management System

## Overview
A secure platform for managing and purchasing cards with user authentication and admin dashboard.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT

## Features
- User Authentication
- Admin Dashboard
- Card Management
- Secure Transactions
- File Upload System
- Real-time Balance Updates

## Installation

### Prerequisites
- Node.js v20+
- PostgreSQL
- npm/yarn

### Setup
1. Clone the repository
```bash
git clone <repository-url>
cd random-project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Backend (.env)
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
PORT=3000

# Frontend (.env)
VITE_API_URL="http://localhost:3000/api"

cd backend
npx prisma migrate dev


# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev

# Build frontend
cd frontend
npm run build

# Start production server
cd backend
npm start