# Multi-stage build để tối ưu hóa kích thước image
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build ứng dụng
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files từ stage trước
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration (sẽ tạo sau)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 