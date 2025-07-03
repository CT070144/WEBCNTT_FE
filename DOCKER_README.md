# Hướng dẫn Docker cho Web CNTT Frontend

## Tổng quan
Dự án này đã được cấu hình để chạy với Docker sử dụng multi-stage build để tối ưu hóa kích thước image.

## Cấu trúc file Docker
- `Dockerfile`: File cấu hình chính cho Docker image
- `nginx.conf`: Cấu hình nginx cho production
- `.dockerignore`: Loại trừ các file không cần thiết
- `docker-compose.yml`: Cấu hình để chạy với Docker Compose

## Cách sử dụng

### 1. Build và chạy với Docker Compose (Khuyến nghị)

```bash
# Build và chạy ứng dụng
docker-compose up --build

# Chạy ở background
docker-compose up -d --build

# Dừng ứng dụng
docker-compose down

# Xem logs
docker-compose logs -f
```

### 2. Build và chạy với Docker trực tiếp

```bash
# Build image
docker build -t web-cntt-frontend .

# Chạy container
docker run -p 3000:80 web-cntt-frontend

# Chạy ở background
docker run -d -p 3000:80 --name web-cntt-frontend web-cntt-frontend
```

### 3. Các lệnh Docker hữu ích

```bash
# Xem danh sách containers
docker ps

# Xem logs của container
docker logs web-cntt-frontend

# Vào container để debug
docker exec -it web-cntt-frontend sh

# Dừng container
docker stop web-cntt-frontend

# Xóa container
docker rm web-cntt-frontend

# Xóa image
docker rmi web-cntt-frontend
```

## Cấu hình môi trường

### Environment Variables
Tạo file `.env` trong thư mục gốc để cấu hình các biến môi trường:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### Thay đổi port
Để thay đổi port, chỉnh sửa file `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Thay đổi 3000 thành 8080
```

## Tối ưu hóa

### Multi-stage Build
Dockerfile sử dụng multi-stage build để:
- Stage 1: Build ứng dụng React
- Stage 2: Chạy với nginx (nhẹ hơn)

### Caching
- Static assets được cache trong 1 năm
- HTML files không được cache để đảm bảo cập nhật

### Security Headers
Nginx được cấu hình với các security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

## Troubleshooting

### Lỗi build
```bash
# Xóa cache và build lại
docker-compose build --no-cache

# Xóa tất cả images và containers
docker system prune -a
```

### Lỗi port đã được sử dụng
```bash
# Kiểm tra port đang được sử dụng
netstat -tulpn | grep :3000

# Thay đổi port trong docker-compose.yml
```

### Lỗi permissions
```bash
# Chạy với quyền admin (Windows)
docker-compose up --build

# Chạy với sudo (Linux/Mac)
sudo docker-compose up --build
```

## Production Deployment

### 1. Build cho production
```bash
# Build với tag version
docker build -t web-cntt-frontend:v1.0.0 .

# Push lên registry
docker tag web-cntt-frontend:v1.0.0 your-registry/web-cntt-frontend:v1.0.0
docker push your-registry/web-cntt-frontend:v1.0.0
```

### 2. Deploy với docker-compose.prod.yml
Tạo file `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  web-cntt-frontend:
    image: your-registry/web-cntt-frontend:v1.0.0
    ports:
      - "80:80"
    restart: always
    environment:
      - NODE_ENV=production
```

## Monitoring và Logs

### Health Check
Ứng dụng có endpoint health check tại `/health`

### Logs
```bash
# Xem logs real-time
docker-compose logs -f

# Xem logs của nginx
docker exec web-cntt-frontend tail -f /var/log/nginx/access.log
docker exec web-cntt-frontend tail -f /var/log/nginx/error.log
```

## Backup và Restore

### Backup
```bash
# Backup container
docker export web-cntt-frontend > web-cntt-frontend-backup.tar

# Backup image
docker save web-cntt-frontend > web-cntt-frontend-image.tar
```

### Restore
```bash
# Restore container
docker import web-cntt-frontend-backup.tar

# Restore image
docker load < web-cntt-frontend-image.tar
``` 