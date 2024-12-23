import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./EmployeeManagement.module.scss";

const cx = classNames.bind(styles);

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        pageSize: 10,
    });
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
        tenNhanVien: "",
        maNhanVien: "",
        ngaySinh: "",
        gioiTinh: "",
        dienThoai: "",
        diaChi: "",
        chucVu: "",
    });

    const apiURL = "http://localhost:8084/api/nhanvien";

    // Fetch danh sách nhân viên
    const fetchEmployees = async (page = 0) => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${apiURL}?page=${page}&size=${pagination.pageSize}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setEmployees(data.content);
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize,
            });
        } catch (error) {
            alert("Lỗi khi lấy danh sách nhân viên!");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Xóa nhân viên
    const handleDeleteEmployee = async (idUser) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;

        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${apiURL}/${idUser}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                alert("Xóa nhân viên thành công!");
                fetchEmployees(pagination.currentPage);
            } else {
                alert("Xóa nhân viên thất bại!");
            }
        } catch (error) {
            alert("Lỗi khi xóa nhân viên!");
        }
    };

    // Thêm nhân viên
    const handleAddEmployee = () => {
        setCurrentEmployee({
            tenNhanVien: "",
            maNhanVien: "",
            ngaySinh: "",
            gioiTinh: "",
            dienThoai: "",
            diaChi: "",
            chucVu: "",
        });
        setEditMode(false);
        setShowForm(true);
    };

    // Sửa nhân viên
    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setEditMode(true);
        setShowForm(true);
    };

    // Lưu nhân viên
    const handleSaveEmployee = async () => {
        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `${apiURL}/${currentEmployee.idUser}` : apiURL;

        const formData = new FormData();
        Object.entries(currentEmployee).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (response.ok) {
                alert(`${editMode ? "Cập nhật" : "Thêm"} nhân viên thành công!`);
                setShowForm(false);
                fetchEmployees(pagination.currentPage);
            } else {
                alert(`${editMode ? "Cập nhật" : "Thêm"} nhân viên thất bại!`);
            }
        } catch (error) {
            alert("Lỗi khi lưu nhân viên!");
        }
    };

    // Chuyển trang
    const handlePageChange = (newPage) => {
        fetchEmployees(newPage);
    };

    return (
        <div className={cx("employee-management")}>
            <button onClick={handleAddEmployee} className={cx("add-button")}>Thêm Nhân Viên</button>

            {/* Danh sách nhân viên */}
            <div className={cx("employee-list")}>
                {employees.map((employee) => (
                    <div key={employee.idUser} className={cx("employee-card")}>
                        <img
                            src={`http://localhost:8084${employee.avaFileCode}`}
                            alt={employee.tenNhanVien}
                            className={cx("avatar")}
                        />
                        <h3>{employee.tenNhanVien}</h3>
                        <p><strong>Mã NV:</strong> {employee.maNhanVien}</p>
                        <p><strong>Chức vụ:</strong> {employee.chucVu}</p>
                        <p><strong>Phòng ban:</strong> {employee.phongBan.tenPhongBan}</p>
                        <p><strong>Ngày sinh:</strong> {employee.ngaySinh}</p>
                        <p><strong>Số điện thoại:</strong> {employee.dienThoai}</p>
                        <p><strong>Môn giảng dạy chính:</strong> {employee.monGiangDayChinh?.tenMonHoc || "Không có"}</p>


                        {/* Môn học liên quan */}
                        <div className={cx("related-courses")}>
                            <h4>Các môn liên quan:</h4>
                            <ul>
                                {employee.cacMonLienQuan.map((mon, index) => (
                                    <li key={index}>{mon.tenMonHoc}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={cx("actions")}>
                            <button onClick={() => handleEditEmployee(employee)} className={cx("edit-button")}>
                                Sửa
                            </button>
                            <button onClick={() => handleDeleteEmployee(employee.idUser)} className={cx("delete-button")}>
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
                    disabled={pagination.currentPage + 1 >= pagination.totalPages}
                    className={cx("pagination-button")}
                >
                    Trang sau
                </button>
            </div>

            {/* Modal Thêm/Sửa */}
            {showForm && (
                <div className={cx("form-overlay")}>
                    <div className={cx("form-container")}>
                        <h3>{editMode ? "Chỉnh Sửa Nhân Viên" : "Thêm Nhân Viên"}</h3>
                        <input
                            type="text"
                            placeholder="Tên Nhân Viên"
                            value={currentEmployee.tenNhanVien}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, tenNhanVien: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Mã Nhân Viên"
                            value={currentEmployee.maNhanVien}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, maNhanVien: e.target.value })}
                        />
                        <input
                            type="date"
                            value={currentEmployee.ngaySinh}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, ngaySinh: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Giới tính"
                            value={currentEmployee.gioiTinh}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, gioiTinh: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={currentEmployee.dienThoai}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, dienThoai: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={currentEmployee.diaChi}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, diaChi: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phòng ban"
                            value={currentEmployee.phongBan?.tenPhongBan || ""}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, phongBan: { ...currentEmployee.phongBan, tenPhongBan: e.target.value } })}
                        />
                        <input
                            type="text"
                            placeholder="Chức vụ"
                            value={currentEmployee.chucVu}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, chucVu: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Môn giảng dạy chính"
                            value={currentEmployee.monGiangDayChinh?.tenMonHoc || ""}
                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, monGiangDayChinh: { ...currentEmployee.monGiangDayChinh, tenMonHoc: e.target.value } })}
                        />
                        <button onClick={handleSaveEmployee} className={cx("save-button")}>Lưu</button>
                        <button onClick={() => setShowForm(false)} className={cx("cancel-button")}>Hủy</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default EmployeeManagement;
