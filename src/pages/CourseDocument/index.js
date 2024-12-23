import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CourseDocument.module.scss";

const cx = classNames.bind(styles);

function CourseDocument() {
    const [courses, setCourses] = useState([]); // Danh sách môn học
    const [showForm, setShowForm] = useState(false); // Hiển thị form
    const [editMode, setEditMode] = useState(false); // Chế độ sửa
    const [currentCourse, setCurrentCourse] = useState(null); // Môn học hiện tại
    const [selectedFiles, setSelectedFiles] = useState([]); // File đã chọn
    const apiURL = "http://localhost:8084/api/monhoc";

    // Fetch danh sách môn học
    const fetchCourses = async () => {
        try {
            const response = await fetch(apiURL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách môn học:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Mở form thêm mới
    const handleAddCourse = () => {
        setCurrentCourse({ tenMonHoc: "", moTa: "", soTinChi: "" });
        setSelectedFiles([]);
        setEditMode(false);
        setShowForm(true);
    };

    // Mở form chỉnh sửa
    const handleEditCourse = (course) => {
        setCurrentCourse(course);
        setSelectedFiles([]);
        setEditMode(true);
        setShowForm(true);
    };

    // Xóa file đã chọn trước khi gửi lên API
    const handleRemoveFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    // Xóa môn học
    const handleDeleteCourse = async (idMonHoc) => {
        try {
            await fetch(`${apiURL}/${idMonHoc}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            fetchCourses();
        } catch (error) {
            console.error("Lỗi khi xóa môn học:", error);
        }
    };

    // Xử lý chọn file
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    // Lưu môn học
    const handleSaveCourse = async () => {
        const formData = new FormData();
        formData.append("tenMonHoc", currentCourse.tenMonHoc);
        formData.append("moTa", currentCourse.moTa);
        formData.append("soTinChi", currentCourse.soTinChi);

        selectedFiles.forEach((file) => {
            formData.append("file", file); // Tất cả file dùng field "file"
        });

        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `${apiURL}/${currentCourse.idMonHoc}` : apiURL;

        try {
            await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
                body: formData,
            });
            setShowForm(false);
            fetchCourses();
        } catch (error) {
            console.error("Lỗi khi lưu môn học:", error);
        }
    };

    return (
        <div className={cx("course-document")}>
            <h2 className={cx("title")}>Quản Lý Môn Học và Tài Liệu</h2>
            <button onClick={handleAddCourse} className={cx("add-button")}>Thêm Môn Học</button>

            {/* Danh sách môn học */}
            <div className={cx("course-list")}>
                {courses.map((course) => (
                    <div key={course.idMonHoc} className={cx("course-card")}>
                        <h3>{course.tenMonHoc}</h3>
                        <p><strong>Mô tả:</strong> {course.moTa}</p>
                        <p><strong>Số tín chỉ:</strong> {course.soTinChi}</p>

                        {/* Hiển thị tài liệu */}
                        <div className={cx("documents")}>
                            <h4>Tài liệu:</h4>
                            {course.taiLieuMHList?.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={`http://localhost:8084${doc.downloadUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tải tài liệu {doc.id}
                                </a>
                            ))}
                        </div>

                        {/* Hành động */}
                        <div className={cx("actions")}>
                            <button onClick={() => handleEditCourse(course)} className={cx("edit-button")}>
                                Sửa
                            </button>
                            <button onClick={() => handleDeleteCourse(course.idMonHoc)} className={cx("delete-button")}>
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Thêm/Sửa */}
            {showForm && (
                <div className={cx("form-overlay")}>
                    <div className={cx("form-container")}>
                        <h3>{editMode ? "Chỉnh Sửa Môn Học" : "Thêm Môn Học"}</h3>
                        <input
                            type="text"
                            placeholder="Tên Môn Học"
                            value={currentCourse.tenMonHoc}
                            onChange={(e) => setCurrentCourse({ ...currentCourse, tenMonHoc: e.target.value })}
                        />
                        <textarea
                            placeholder="Mô Tả"
                            value={currentCourse.moTa}
                            onChange={(e) => setCurrentCourse({ ...currentCourse, moTa: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Số Tín Chỉ"
                            value={currentCourse.soTinChi}
                            onChange={(e) => setCurrentCourse({ ...currentCourse, soTinChi: e.target.value })}
                        />

                        {/* Upload file */}
                        <input type="file" multiple onChange={handleFileChange} />
                        <div className={cx("file-list")}>
                            {selectedFiles.map((file, index) => (
                                <div key={index} className={cx("file-item")}>
                                    {file.name}
                                    <button onClick={() => handleRemoveFile(index)}>Xóa</button>
                                </div>
                            ))}
                        </div>

                        <button onClick={handleSaveCourse} className={cx("save-button")}>Lưu</button>
                        <button onClick={() => setShowForm(false)} className={cx("cancel-button")}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseDocument;
