import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./StudentManagement.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function StudentManagement() {
    const [users, setUsers] = useState([]); // Danh sách sinh viên
    const [selectedStudent, setSelectedStudent] = useState(null); // Thông tin sinh viên chi tiết
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách sau khi lọc
    const [classes, setClasses] = useState([]); // Danh sách lớp
    const [selectedClass, setSelectedClass] = useState(""); // Lớp được chọn
    const [searchTerm, setSearchTerm] = useState("");

    const [pagination, setPagination] = useState({
        totalPages: 0,
        currentPage: 0,
        pageSize: 100,
    });

    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    
    // Modal xác nhận xóa
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    // Validation states
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const apiURL = "http://localhost:8084/api/students";
    const classApiURL = "http://localhost:8084/api/class";

    const getAuthHeaders = () => {
        const token = localStorage.getItem("auth_token");
        return { "Authorization": `Bearer ${token}` };
    };

    // Validation functions
    const validateField = (name, value) => {
        switch (name) {
            case 'maSinhVien':
                if (!value.trim()) {
                    return 'Mã sinh viên không được để trống';
                }
                if (!/^[A-Z0-9]{8,10}$/.test(value.trim())) {
                    return 'Mã sinh viên phải có 8-10 ký tự, chỉ chứa chữ hoa và số';
                }
                return '';

            case 'tenSinhVien':
                if (!value.trim()) {
                    return 'Tên sinh viên không được để trống';
                }
                if (value.trim().length < 2) {
                    return 'Tên sinh viên phải có ít nhất 2 ký tự';
                }
                if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value.trim())) {
                    return 'Tên sinh viên chỉ được chứa chữ cái và khoảng trắng';
                }
                return '';

            case 'gioiTinh':
                if (!value) {
                    return 'Vui lòng chọn giới tính';
                }
                return '';

            case 'ngaySinh':
                if (!value) {
                    return 'Ngày sinh không được để trống';
                }
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (false) {
                    return 'Tuổi phải từ 16 đến 100';
                }
                return '';

            case 'queQuan':
                if (!value.trim()) {
                    return 'Quê quán không được để trống';
                }
                if (value.trim().length < 3) {
                    return 'Quê quán phải có ít nhất 3 ký tự';
                }
                return '';

            case 'khoa':
                if (!value.trim()) {
                    return 'Khoa không được để trống';
                }
                if (value.trim().length < 2) {
                    return 'Tên khoa phải có ít nhất 2 ký tự';
                }
                return '';

            case 'tenLop':
                if (!value) {
                    return 'Vui lòng chọn lớp';
                }
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const fieldsToValidate = ['maSinhVien', 'tenSinhVien', 'gioiTinh', 'ngaySinh', 'queQuan', 'khoa', 'tenLop'];
        
        fieldsToValidate.forEach(field => {
            const error = validateField(field, currentUser[field] || '');
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (name, value) => {
        setCurrentUser(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFieldBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, currentUser[name] || '');
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Fetch danh sách lớp từ API
    const fetchClasses = async () => {
        try {
            const response = await fetch(classApiURL, {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            setClasses(data.content);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách lớp: " + error.message);
        }
    };

    // Fetch danh sách sinh viên
    const fetchUsers = async (page = 0) => {
        try {
            const response = await fetch(`${apiURL}?page=${page}&size=${pagination.pageSize}`, {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            setUsers(data.content);
            setFilteredUsers(data.content); // Mặc định hiển thị tất cả
            setPagination({
                totalPages: data.totalPages,
                currentPage: data.currentPage,
                pageSize: data.pageSize,
            });
        } catch (error) {
            toast.error("Lỗi khi tải danh sách sinh viên: " + error.message);
        }
    };

    const handleViewDetails = async (maSinhVien) => {
        try {
            // Gọi API để lấy thông tin sinh viên
            const response = await fetch(`${apiURL}/${maSinhVien}`, {
                headers: getAuthHeaders(),
            });
            const data = await response.json();

            // Fetch ảnh với token
            const avatarResponse = await fetch(`http://localhost:8084${data.avaDownloadUrl}`, {
                method: "GET",
                headers: getAuthHeaders(),
            });
            const avatarBlob = await avatarResponse.blob();
            const avatarUrl = URL.createObjectURL(avatarBlob);

            // Gán thông tin sinh viên và ảnh
            setSelectedStudent({ ...data, avatarUrl });
            setShowDetailsModal(true);
        } catch (error) {
            toast.error("Lỗi khi tải thông tin sinh viên: " + error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchClasses();
    }, []);

    // Xử lý bộ lọc
    const handleFilterChange = (e) => {
        const selected = e.target.value;
        setSelectedClass(selected);
        filterUsers(selected, searchTerm);
    };

    // Xử lý tìm kiếm theo tên
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterUsers(selectedClass, value);
    };

    // Kết hợp lọc theo lớp và tìm kiếm tên
    const filterUsers = (classValue, nameValue) => {
        let filtered = users;
        if (classValue) {
            filtered = filtered.filter((user) => user.tenLop === classValue);
        }
        if (nameValue) {
            filtered = filtered.filter((user) =>
                user.tenSinhVien.toLowerCase().includes(nameValue.toLowerCase())
            );
        }
        setFilteredUsers(filtered);
    };

    // Thêm mới
    const handleAddUser = () => {
        setShowForm(true);
        setEditMode(false);
        setCurrentUser({
            maSinhVien: "",
            tenSinhVien: "",
            gioiTinh: "",
            ngaySinh: "",
            queQuan: "",
            khoa: "",
            tenLop: "",
        });
        setErrors({});
        setTouched({});
    };

    // Sửa
    const handleEditUser = (user) => {
        setShowForm(true);
        setEditMode(true);
        setCurrentUser(user);
        setErrors({});
        setTouched({});
    };

    // Lưu sinh viên
    const handleSaveUser = async () => {
        // Validate all fields
        if (!validateForm()) {
            // Mark all fields as touched to show errors
            const allTouched = {};
            ['maSinhVien', 'tenSinhVien', 'gioiTinh', 'ngaySinh', 'queQuan', 'khoa', 'tenLop'].forEach(field => {
                allTouched[field] = true;
            });
            setTouched(allTouched);
            toast.error("Vui lòng kiểm tra lại thông tin nhập vào!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("maSinhVien", currentUser.maSinhVien);
            formData.append("tenSinhVien", currentUser.tenSinhVien);
            formData.append("gioiTinh", currentUser.gioiTinh);
            formData.append("ngaySinh", currentUser.ngaySinh);
            formData.append("queQuan", currentUser.queQuan);
            formData.append("khoa", currentUser.khoa);
            formData.append("tenLop", currentUser.tenLop);
            
            const method = editMode ? "PUT" : "POST";
            const url = editMode ? `${apiURL}/${currentUser.maSinhVien}` : apiURL;
            
            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: formData,
            });

            if(response.status === 200){
                setShowForm(false);
            setErrors({});
            setTouched({});
            fetchUsers(pagination.currentPage);
            editMode 
                ? toast.success("Chỉnh sửa sinh viên thành công!") 
                : toast.success("Thêm sinh viên thành công!");
                return;
            }else{
                if(response.status === 400){
                  errors["maSinhVien"] = "Mã sinh viên đã tồn tại";
                  setErrors(errors);
                  return;
                }
                else{
                    toast.error("Lỗi khi lưu sinh viên: " + response.statusText);
                    return;
                }
            }

            
        } catch (error) {
            toast.error("Lỗi khi lưu sinh viên: " + error.message);
        }
    };

    // Xử lý xóa sinh viên
    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setShowDeleteModal(true);
    };

    // Xác nhận xóa sinh viên
    const handleConfirmDelete = async () => {
        try {
            await fetch(`${apiURL}/${studentToDelete.maSinhVien}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            setShowDeleteModal(false);
            setStudentToDelete(null);
            fetchUsers(pagination.currentPage);
            toast.success("Xóa sinh viên thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa sinh viên: " + error.message);
        }
    };

    // Hủy xóa
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setStudentToDelete(null);
    };

    // Chuyển trang
    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    // Helper function to get input class
    const getInputClass = (fieldName) => {
        return cx("input", {
            "input-error": errors[fieldName] && touched[fieldName],
            "input-success": !errors[fieldName] && touched[fieldName] && currentUser[fieldName]
        });
    };
    const userString = localStorage.getItem('user');
    const userAuth = JSON.parse(userString);
    const userRole = userAuth ? userAuth.roles : null;

    return (
        <div className={cx("user-management")}>
            <h2 className={cx("title")}>Quản Lý Sinh Viên</h2>

            {/* Bộ lọc lớp & Tìm kiếm */}
            <div className={cx("filter-section")}>
                <label htmlFor="classFilter">Lọc theo lớp:</label>
                <select id="classFilter" value={selectedClass} onChange={handleFilterChange}>
                    <option value="">Tất cả</option>
                    {classes.map((cls) => (
                        <option key={cls.idLop} value={cls.tenLop}>
                            {cls.tenLop}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={cx("search-input")}
                    placeholder="Tìm kiếm theo tên sinh viên..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleAddUser} className={cx("add-button")}>
                    Thêm Sinh Viên
                </button>
            </div>

            {/* Bảng danh sách */}
            <table className={cx("user-table")}>
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Quê quán</th>
                        <th>Khoa</th>
                        <th>Lớp</th>
                     {userRole.includes("ROLE_ADMIN") && <th>Hành động</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.maSinhVien}>
                            <td>
                                <button
                                    onClick={() => handleViewDetails(user.maSinhVien)}
                                    className={cx("link-button")}
                                >
                                    {user.maSinhVien}
                                </button>
                            </td>
                            <td>{user.tenSinhVien}</td>
                            <td>{user.gioiTinh}</td>
                            <td>{user.ngaySinh}</td>
                            <td>{user.queQuan}</td>
                            <td>{user.khoa}</td>
                            <td>{user.tenLop}</td>
                            {userRole.includes("ROLE_ADMIN") && (
                               <td>
                               <button onClick={() => handleEditUser(user)} className={cx("edit-button")}>
                                   Sửa
                               </button>
                               <button onClick={() => handleDeleteClick(user)} className={cx("delete-button")}>
                                   Xóa
                               </button>
                           </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Thông tin chi tiết */}
            {showDetailsModal && selectedStudent && (
                <div className={cx("modal-overlay")}>
                    <div className={cx("modal-container")}>
                        <h3>Thông Tin Sinh Viên</h3>
                        <img
                            src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png"
                            alt="Avatar"
                            className={cx("avatar")}
                        />
                        <ul className={cx("details-list")}>
                            <li><strong>Mã SV:</strong> {selectedStudent.maSinhVien}</li>
                            <li><strong>Tên:</strong> {selectedStudent.tenSinhVien}</li>
                            <li><strong>Giới tính:</strong> {selectedStudent.gioiTinh}</li>
                            <li><strong>Ngày sinh:</strong> {selectedStudent.ngaySinh}</li>
                            <li><strong>Email:</strong> {selectedStudent.email}</li>
                            <li><strong>Số điện thoại:</strong> {selectedStudent.dienThoai}</li>
                            <li><strong>Quê quán:</strong> {selectedStudent.queQuan}</li>
                            <li><strong>Địa chỉ hiện tại:</strong> {selectedStudent.diaChiHienTai}</li>
                            <li><strong>CCCD:</strong> {selectedStudent.cccd}</li>
                            <li><strong>Khoa:</strong> {selectedStudent.khoa}</li>
                            <li><strong>Lớp:</strong> {selectedStudent.tenLop}</li>
                        </ul>
                        <button onClick={() => setShowDetailsModal(false)} className={cx("close-button")}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xóa */}
            {showDeleteModal && (
                <div className={cx("modal-overlay")}>
                    <div className={cx("delete-modal-container")}>
                        <div className={cx("delete-modal-header")}>
                            <h3>Xác nhận xóa</h3>
                        </div>
                        <div className={cx("delete-modal-body")}>
                            <p>Bạn có chắc chắn muốn xóa sinh viên:</p>
                            <div className={cx("student-info")}>
                                <p><strong>Mã SV:</strong> {studentToDelete?.maSinhVien}</p>
                                <p><strong>Tên:</strong> {studentToDelete?.tenSinhVien}</p>
                                <p><strong>Lớp:</strong> {studentToDelete?.tenLop}</p>
                            </div>
                            <p className={cx("warning-text")}>
                                Hành động này không thể hoàn tác!
                            </p>
                        </div>
                        <div className={cx("delete-modal-actions")}>
                            <button onClick={handleConfirmDelete} className={cx("confirm-delete-button")}>
                                Xóa
                            </button>
                            <button onClick={handleCancelDelete} className={cx("cancel-delete-button")}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Phân trang */}
            <div className={cx("pagination")}>
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 0}
                    className={cx("pagination-button")}
                >
                    Trang trước
                </button>
                <span className={cx("pagination-info")}>
                    Trang {pagination.currentPage + 1} / {pagination.totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage + 1 === pagination.totalPages}
                    className={cx("pagination-button")}
                >
                    Trang sau
                </button>
            </div>

            {/* Form thêm/sửa */}
            {showForm && (
                <div className={cx("form-overlay")}>
                    <div className={cx("form-container")}>
                        <h3>{editMode ? "Sửa Sinh Viên" : "Thêm Sinh Viên"}</h3>

                        {/* Mã Sinh Viên */}
                        <div className={cx("form-field")}>
                            <input
                                type="text"
                                placeholder="Mã SV"
                                value={currentUser.maSinhVien}
                                onChange={(e) => handleFieldChange('maSinhVien', e.target.value)}
                                onBlur={() => handleFieldBlur('maSinhVien')}
                                disabled={editMode}
                                className={getInputClass('maSinhVien')}
                            />
                            {errors.maSinhVien && touched.maSinhVien && (
                                <span className={cx("error-message")}>{errors.maSinhVien}</span>
                            )}
                        </div>

                        {/* Tên Sinh Viên */}
                        <div className={cx("form-field")}>
                            <input
                                type="text"
                                placeholder="Tên Sinh Viên"
                                value={currentUser.tenSinhVien}
                                onChange={(e) => handleFieldChange('tenSinhVien', e.target.value)}
                                onBlur={() => handleFieldBlur('tenSinhVien')}
                                className={getInputClass('tenSinhVien')}
                            />
                            {errors.tenSinhVien && touched.tenSinhVien && (
                                <span className={cx("error-message")}>{errors.tenSinhVien}</span>
                            )}
                        </div>

                        {/* Giới Tính - Select */}
                        <div className={cx("form-field")}>
                            <select
                                value={currentUser.gioiTinh}
                                onChange={(e) => handleFieldChange('gioiTinh', e.target.value)}
                                onBlur={() => handleFieldBlur('gioiTinh')}
                                className={getInputClass('gioiTinh')}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                            {errors.gioiTinh && touched.gioiTinh && (
                                <span className={cx("error-message")}>{errors.gioiTinh}</span>
                            )}
                        </div>

                        {/* Ngày Sinh */}
                        <div className={cx("form-field")}>
                            <input
                                type="date"
                                placeholder="Ngày Sinh"
                                value={
                                    currentUser.ngaySinh
                                        ? currentUser.ngaySinh.split("T")[0]
                                        : ""
                                }
                                onChange={(e) => handleFieldChange('ngaySinh', e.target.value)}
                                onBlur={() => handleFieldBlur('ngaySinh')}
                                className={getInputClass('ngaySinh')}
                            />
                            {errors.ngaySinh && touched.ngaySinh && (
                                <span className={cx("error-message")}>{errors.ngaySinh}</span>
                            )}
                        </div>

                        {/* Quê Quán */}
                        <div className={cx("form-field")}>
                            <input
                                type="text"
                                placeholder="Quê Quán"
                                value={currentUser.queQuan}
                                onChange={(e) => handleFieldChange('queQuan', e.target.value)}
                                onBlur={() => handleFieldBlur('queQuan')}
                                className={getInputClass('queQuan')}
                            />
                            {errors.queQuan && touched.queQuan && (
                                <span className={cx("error-message")}>{errors.queQuan}</span>
                            )}
                        </div>

                        {/* Khoa */}
                        <div className={cx("form-field")}>
                            <input
                                type="text"
                                placeholder="Khoa"
                                value={currentUser.khoa}
                                onChange={(e) => handleFieldChange('khoa', e.target.value)}
                                onBlur={() => handleFieldBlur('khoa')}
                                className={getInputClass('khoa')}
                            />
                            {errors.khoa && touched.khoa && (
                                <span className={cx("error-message")}>{errors.khoa}</span>
                            )}
                        </div>

                        {/* Lớp - Select */}
                        <div className={cx("form-field")}>
                            <select
                                value={currentUser.tenLop}
                                onChange={(e) => handleFieldChange('tenLop', e.target.value)}
                                onBlur={() => handleFieldBlur('tenLop')}
                                className={getInputClass('tenLop')}
                            >
                                <option value="">Chọn lớp</option>
                                {classes.map((cls) => (
                                    <option key={cls.idLop} value={cls.tenLop}>
                                        {cls.tenLop}
                                    </option>
                                ))}
                            </select>
                            {errors.tenLop && touched.tenLop && (
                                <span className={cx("error-message")}>{errors.tenLop}</span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className={cx("form-actions")}>
                            <button onClick={handleSaveUser} className={cx("save-button")}>
                                Lưu
                            </button>
                            <button onClick={() => setShowForm(false)} className={cx("cancel-button")}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentManagement;