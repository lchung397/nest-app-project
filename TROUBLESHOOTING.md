# Troubleshooting Guide

## Error: connect ECONNREFUSED 127.0.0.1:5432

### Nguyên nhân:
Backend không thể kết nối đến PostgreSQL database.

### Giải pháp:

#### 1. Kiểm tra Database Host
Trong Kubernetes, database không chạy trên `localhost`. Cần sử dụng:
- **External IP**: `136.110.37.70` (đã fix trong k8s.yaml)
- **Internal Service**: `my-postgres-postgresql.database.svc.cluster.local` (nếu PostgreSQL chạy trong cluster)

#### 2. Kiểm tra Environment Variables
Đảm bảo các biến môi trường được set đúng trong k8s.yaml:

```yaml
env:
  - name: DB_HOST
    value: "136.110.37.70"  # ✅ External IP
  - name: DB_PORT
    value: "5432"
  - name: DB_USERNAME
    value: "postgres"
  - name: DB_PASSWORD
    value: "LASdExY6HJ"
  - name: DB_DATABASE
    value: "postgres"
```

#### 3. Kiểm tra Network/Firewall
Đảm bảo GKE cluster có thể kết nối đến database:

```bash
# Test từ pod
kubectl exec -it <pod-name> -- sh
nc -zv 136.110.37.70 5432
```

#### 4. Kiểm tra PostgreSQL cho phép remote connections
PostgreSQL cần cấu hình:
- `postgresql.conf`: `listen_addresses = '*'`
- `pg_hba.conf`: Thêm rule cho phép GKE IP range

## Error: Port mismatch

### Nguyên nhân:
Dockerfile expose port 3000 nhưng app chạy trên port khác.

### Giải pháp:
Đảm bảo consistency:
- Dockerfile: `EXPOSE 3000`
- k8s.yaml: `containerPort: 3000`
- Service: `targetPort: 3000`
- .env: `PORT=3000`

## Rebuild & Redeploy

Sau khi fix, rebuild và redeploy:

```bash
# 1. Build new image
docker build -t asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v3 .

# 2. Push to registry
docker push asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:v3

# 3. Update k8s.yaml với image mới
# Thay v2 thành v3 trong k8s.yaml

# 4. Apply changes
kubectl apply -f k8s.yaml

# 5. Check logs
kubectl logs -f deployment/nest-app-project

# 6. Check pods
kubectl get pods
kubectl describe pod <pod-name>
```

## Check Database Connection

Test kết nối database từ local:

```bash
# Install psql client
brew install postgresql  # macOS
apt-get install postgresql-client  # Ubuntu

# Test connection
psql -h 136.110.37.70 -p 5432 -U postgres -d postgres
# Password: LASdExY6HJ
```

## Common Issues

### Issue 1: ImagePullBackOff
```bash
# Check image exists
gcloud artifacts docker images list asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker

# Check permissions
gcloud auth configure-docker asia-southeast1-docker.pkg.dev
```

### Issue 2: CrashLoopBackOff
```bash
# Check logs
kubectl logs <pod-name>

# Check events
kubectl describe pod <pod-name>
```

### Issue 3: Database connection timeout
```bash
# Check if database is accessible from GKE
kubectl run -it --rm debug --image=postgres:15 --restart=Never -- psql -h 136.110.37.70 -U postgres
```

## Useful Commands

```bash
# Get all resources
kubectl get all

# Get pods with details
kubectl get pods -o wide

# Follow logs
kubectl logs -f deployment/nest-app-project

# Restart deployment
kubectl rollout restart deployment/nest-app-project

# Check environment variables in pod
kubectl exec <pod-name> -- env | grep DB_

# Port forward for testing
kubectl port-forward deployment/nest-app-project 8080:3000
```
