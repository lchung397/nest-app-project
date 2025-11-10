#!/bin/bash

echo "🧪 Testing Backend Locally with Production Config"
echo "=================================================="

# Set environment variables
export NODE_ENV=production
export PORT=3000
export JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
export DB_HOST=136.110.37.70
export DB_PORT=5432
export DB_USERNAME=postgres
export DB_PASSWORD=LASdExY6HJ
export DB_DATABASE=postgres

echo ""
echo "📋 Environment Variables:"
echo "  NODE_ENV: $NODE_ENV"
echo "  PORT: $PORT"
echo "  DB_HOST: $DB_HOST"
echo "  DB_PORT: $DB_PORT"
echo "  DB_DATABASE: $DB_DATABASE"
echo ""

# Test database connection first
echo "🔍 Testing database connection..."
npm run test:db

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Database connection successful!"
  echo ""
  echo "🚀 Starting application..."
  npm run start:prod
else
  echo ""
  echo "❌ Database connection failed!"
  echo "Please check your database configuration."
  exit 1
fi
