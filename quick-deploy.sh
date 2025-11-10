#!/bin/bash

set -e

VERSION=${1:-v4}

echo "🚀 Quick Deploy Script"
echo "======================"
echo "Version: $VERSION"
echo ""

# Step 1: Test database
echo "📝 Step 1: Testing database connection..."
npm run test:db
echo ""

# Step 2: Build
echo "📝 Step 2: Building application..."
npm run build
echo ""

# Step 3: Build Docker image
echo "📝 Step 3: Building Docker image..."
IMAGE="asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:$VERSION"
docker build -t $IMAGE .
echo ""

# Step 4: Push to registry
echo "📝 Step 4: Pushing to registry..."
docker push $IMAGE
echo ""

# Step 5: Update k8s.yaml
echo "📝 Step 5: Updating k8s.yaml..."
sed -i.bak "s|image: asia-southeast1-docker.pkg.dev/deploy-nest-app-project/nest-docker/api:.*|image: $IMAGE|" k8s.yaml
echo ""

# Step 6: Deploy
echo "📝 Step 6: Deploying to Kubernetes..."
kubectl apply -f k8s.yaml
kubectl rollout restart deployment/nest-app-project
echo ""

# Step 7: Wait for rollout
echo "📝 Step 7: Waiting for rollout..."
kubectl rollout status deployment/nest-app-project
echo ""

# Step 8: Show status
echo "📝 Step 8: Deployment status:"
kubectl get pods -l app=nest-app-project
echo ""

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Check logs: kubectl logs -f deployment/nest-app-project"
echo "  2. Get service: kubectl get service nest-svc"
echo "  3. Test API: curl http://<EXTERNAL-IP>:8080"
