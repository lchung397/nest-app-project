# Deployment Steps - Fix Database Connection

## Problem
Backend không thể kết nối đến PostgreSQL vì:
1. ConfigModule có `ignoreEnvFile: true` 
2. Environment variables không được đọc đúng cách

## Solution Applied

### 1. Fixed app.module.ts
- Đổi `ignoreEnvFile: true` → `envFilePath: '.env'`
- Thêm default values cho database config
- Thêm console.log để debug

### 2. Updated k8s.yaml
- Đảm bảo tất cả env vars được set đúng
- DB_HOST = 136.110.37.70 (external IP)

## Deployment Steps

### Step 1: Test Database Connection Locally

```bash
cd nest-app-project

# Test database connection
npm run test:db

# Should output:
# ✅ Database connection successful!
```

### Step 2: Test Application Locally

```bash
# Build the app
npm run build

# Test with production config
./test-local.sh

# Or manually:
export DB_HOST=136.110.37.70
export DB_PORT=5432
export DB_USERNAME=postgres
export DB_PASSWORD=LASdExY6HJ
export DB_DATABASE=postgres
npm run start:prod
```

### Step 3: Build Docker Image

```bash
# Build new version
docker build -t asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v4 .

# Test locally with Docker
docker run -p 3000:3000 \
  -e DB_HOST=136.110.37.70 \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=LASdExY6HJ \
  -e DB_DATABASE=postgres \
  asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v4

# Check logs - should see:
# 🔧 Database Configuration:
#   Host: 136.110.37.70
#   Port: 5432
#   Database: postgres
#   Username: postgres
```

### Step 4: Push to Registry

```bash
docker push asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v4
```

### Step 5: Update k8s.yaml

Change image version:
```yaml
image: asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v4
```

### Step 6: Deploy to Kubernetes

```bash
# Apply changes
kubectl apply -f k8s.yaml

# Force restart with new image
kubectl rollout restart deployment/nest-app-project

# Watch rollout status
kubectl rollout status deployment/nest-app-project
```

### Step 7: Verify Deployment

```bash
# Check pods
kubectl get pods

# Check logs - should see database config
kubectl logs -f deployment/nest-app-project

# Expected output:
# 🔧 Database Configuration:
#   Host: 136.110.37.70
#   Port: 5432
#   Database: postgres
#   Username: postgres
# [TypeORM] Connection to database established
# Application is running on: http://localhost:3000
```

### Step 8: Test API

```bash
# Get external IP
kubectl get service nest-svc

# Test endpoint
curl http://<EXTERNAL-IP>:8080
# Should return: Hello CyberLogitec Vietnam Co., Ltd

# Test auth endpoints
curl -X POST http://<EXTERNAL-IP>:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

## Troubleshooting

### If still getting ECONNREFUSED:

1. **Check environment variables in pod:**
```bash
kubectl exec -it <pod-name> -- env | grep DB_
```

2. **Check if database is accessible from pod:**
```bash
kubectl exec -it <pod-name> -- sh
nc -zv 136.110.37.70 5432
```

3. **Check application logs:**
```bash
kubectl logs <pod-name> | grep "Database Configuration"
```

4. **Verify database allows connections:**
```bash
# From your local machine
psql -h 136.110.37.70 -p 5432 -U postgres -d postgres
```

### If database connection works but app crashes:

1. Check TypeORM synchronize setting (should be false in production)
2. Check if tables exist in database
3. Check memory/CPU limits in k8s.yaml

## Rollback

If deployment fails:
```bash
# Rollback to previous version
kubectl rollout undo deployment/nest-app-project

# Or specify revision
kubectl rollout history deployment/nest-app-project
kubectl rollout undo deployment/nest-app-project --to-revision=<number>
```

## Notes

- Always test database connection before deploying
- Check logs immediately after deployment
- Keep old image versions for quick rollback
- Monitor pod status during rollout
