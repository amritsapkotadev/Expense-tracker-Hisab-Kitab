#!/bin/bash

echo "🚀 Quick Setup for Expense Tracker"
echo "=================================="

# Create backend .env file
echo "📝 Creating backend .env file..."
cp backend/env.template backend/.env
echo "✅ Backend .env file created"

# Create frontend .env file
echo "📝 Creating frontend .env file..."
cp frontend/env.template frontend/.env
echo "✅ Frontend .env file created"

echo ""
echo "🔧 Next Steps:"
echo "1. Edit backend/.env with your MongoDB Atlas connection string"
echo "2. Edit backend/.env with your email credentials for OTP"
echo "3. Edit backend/.env with a secure JWT secret"
echo "4. Install dependencies:"
echo "   cd backend && npm install"
echo "   cd ../frontend && npm install"
echo "5. Start the servers:"
echo "   Backend: cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access the app at: http://localhost:5173"
