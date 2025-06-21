# Cập nhật Frontend TrainingProgram để sử dụng API Backend

## Tổng quan
Frontend đã được cập nhật để call API từ backend thay vì sử dụng mock data.

## Các thay đổi đã thực hiện

### 1. Trang danh sách chương trình đào tạo (`/src/pages/TrainingProgram/index.js`)

**Thay đổi chính:**
- Xóa bỏ mock data `trainingPrograms`
- Thêm state management với `useState` và `useEffect`
- Thêm function `fetchTrainingPrograms()` để call API
- Thêm xử lý loading, error và no-data states
- Transform data từ backend để phù hợp với frontend structure

**API Endpoint sử dụng:**
```javascript
GET http://localhost:8080/api/training-programs
```

**Data transformation:**
```javascript
const transformedData = data.result.map(program => ({
  id: program.id,
  name: program.name,
  code: program.code,
  duration: program.duration,
  campus: program.campus,
  description: program.overview,
  image: program.imageUrl,
  updatedDate: program.updatedAt ? new Date(program.updatedAt).toLocaleDateString('vi-VN') : 'N/A'
}));
```

### 2. Trang chi tiết chương trình đào tạo (`/src/pages/TrainingProgram/ProgramDetail/index.js`)

**Thay đổi chính:**
- Xóa bỏ mock data `programData`
- Thêm state management với loading, error states
- Thêm function `fetchProgramData()` để call API
- Thêm xử lý error và navigation
- Transform data từ backend để phù hợp với frontend structure

**API Endpoint sử dụng:**
```javascript
GET http://localhost:8080/api/training-programs/{id}
```

**Data transformation:**
```javascript
const transformedProgram = {
  id: data.result.id,
  name: data.result.name,
  code: data.result.code,
  duration: data.result.duration,
  campus: data.result.campus,
  admissionPeriod: data.result.admissionPeriod,
  overview: data.result.overview,
  outcomes: data.result.outcomes || [],
  careers: data.result.careers || [],
  tuition: {
    domestic: data.result.domesticTuition,
    international: data.result.internationalTuition,
    notes: data.result.tuitionNotes
  },
  requirements: data.result.requirements || [],
  materials: data.result.materials || []
};
```

### 3. CSS Updates

**TrainingProgram.module.scss:**
- Thêm styles cho `.loading`, `.error`, `.no-data`
- Thêm styles cho `.retry-btn`

**ProgramDetail.module.scss:**
- Cập nhật styles cho `.loading`
- Thêm styles cho `.error`, `.no-data`, `.no-data-text`
- Thêm styles cho `.back-btn`, `.retry-btn`

## Cấu hình cần thiết

### 1. Backend URL
Đảm bảo backend đang chạy tại:
```
http://localhost:8080
```

### 2. CORS Configuration
Backend đã được cấu hình CORS để cho phép frontend truy cập:
```java
@CrossOrigin(origins = "*")
```

### 3. Database
Chạy script SQL để tạo bảng và dữ liệu mẫu:
```sql
-- Chạy file training_program.sql trong backend
```

## Các tính năng mới

### 1. Loading States
- Hiển thị "Đang tải dữ liệu..." khi đang fetch API
- Loading spinner hoặc text tùy theo thiết kế

### 2. Error Handling
- Hiển thị thông báo lỗi khi API call thất bại
- Nút "Thử lại" để retry API call
- Nút "Quay lại danh sách" để navigate back

### 3. No Data States
- Hiển thị thông báo khi không có dữ liệu
- Xử lý trường hợp mảng rỗng cho các section

### 4. Data Validation
- Kiểm tra null/undefined trước khi render
- Fallback values cho các trường không có dữ liệu

## Testing

### 1. Test API Connection
```bash
# Test backend API
curl http://localhost:8080/api/training-programs
```

### 2. Test Frontend
1. Chạy backend: `mvn spring-boot:run`
2. Chạy frontend: `npm start`
3. Truy cập: `http://localhost:3000/training-program`

### 3. Test Scenarios
- ✅ Load danh sách chương trình đào tạo
- ✅ Click vào chương trình để xem chi tiết
- ✅ Test loading states
- ✅ Test error states (tắt backend)
- ✅ Test no data states

## Troubleshooting

### 1. CORS Error
```
Access to fetch at 'http://localhost:8080/api/training-programs' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Giải pháp:** Đảm bảo backend có `@CrossOrigin(origins = "*")`

### 2. Network Error
```
Failed to fetch
```
**Giải pháp:** 
- Kiểm tra backend có đang chạy không
- Kiểm tra URL API có đúng không
- Kiểm tra port 8080 có bị block không

### 3. Data Mapping Error
```
Cannot read property 'map' of undefined
```
**Giải pháp:** Kiểm tra response structure từ API có đúng format không

## Next Steps

### 1. Environment Configuration
Tạo file `.env` để quản lý API URL:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 2. API Service Layer
Tạo service layer để quản lý API calls:
```javascript
// services/trainingProgramService.js
export const trainingProgramService = {
  getAllPrograms: () => fetch(`${API_BASE_URL}/api/training-programs`),
  getProgramById: (id) => fetch(`${API_BASE_URL}/api/training-programs/${id}`)
};
```

### 3. Error Boundary
Thêm React Error Boundary để xử lý lỗi tốt hơn

### 4. Loading Components
Tạo reusable loading components

### 5. Caching
Thêm caching cho API responses để tăng performance 