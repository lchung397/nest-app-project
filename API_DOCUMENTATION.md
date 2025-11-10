# API Documentation

## Base URL
```
http://34.87.142.32:8080
```

## Authentication Endpoints

### 1. Sign Up (Đăng ký)
**POST** `/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1699999999999",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 2. Sign In (Đăng nhập)
**POST** `/auth/signin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1699999999999",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 3. Get Me (Lấy thông tin user hiện tại)
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "1699999999999",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-11-10T10:00:00.000Z"
}
```

## Test với cURL

### Sign Up
```bash
curl -X POST http://34.87.142.32:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Sign In
```bash
curl -X POST http://34.87.142.32:8080/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Me
```bash
curl -X GET http://34.87.142.32:8080/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Error Responses

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

### 409 Conflict (Email đã tồn tại)
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

## Notes
- JWT token có thời hạn 24 giờ
- Password được hash bằng bcrypt
- Hiện tại dữ liệu lưu trong memory (restart server sẽ mất data)
- Trong production nên kết nối database thực
