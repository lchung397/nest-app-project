# Database Setup Guide

## Thông tin kết nối PostgreSQL

```
Host: 136.110.37.70
Port: 5432
Username: postgres
Password: LASdExY6HJ
Database: postgres
```

## Cấu hình đã thực hiện

### 1. Packages đã cài đặt
```bash
npm install @nestjs/typeorm typeorm pg
```

### 2. Environment Variables (.env)
```env
DB_HOST=136.110.37.70
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=LASdExY6HJ
DB_DATABASE=postgres
```

### 3. TypeORM Configuration
- Đã cấu hình trong `app.module.ts`
- `synchronize: true` - Tự động tạo/cập nhật bảng (chỉ dùng trong development)
- `logging: true` - Hiển thị SQL queries trong console

### 4. User Entity
Bảng `users` sẽ được tự động tạo với các cột:
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `name` (String)
- `createdAt` (Timestamp)

## Chạy ứng dụng

```bash
npm run start:dev
```

Khi khởi động, TypeORM sẽ:
1. Kết nối đến PostgreSQL
2. Tự động tạo bảng `users` nếu chưa tồn tại
3. Log các SQL queries ra console

## Kiểm tra kết nối

Nếu kết nối thành công, bạn sẽ thấy log:
```
[TypeORM] Connection to database established
```

Nếu có lỗi, kiểm tra:
- Firewall có cho phép kết nối đến port 5432 không
- Thông tin đăng nhập có chính xác không
- PostgreSQL server có đang chạy không

## Production Notes

⚠️ **Quan trọng cho Production:**

1. Tắt `synchronize`:
```typescript
synchronize: false, // Không tự động thay đổi schema
```

2. Sử dụng migrations thay vì synchronize:
```bash
npm run typeorm migration:generate -- -n CreateUsersTable
npm run typeorm migration:run
```

3. Bảo mật thông tin database:
- Không commit file `.env` vào git
- Sử dụng secrets manager trong production
- Giới hạn quyền truy cập database

4. Connection pooling:
```typescript
extra: {
  max: 10, // Maximum pool size
  min: 2,  // Minimum pool size
}
```
