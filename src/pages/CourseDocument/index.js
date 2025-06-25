import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CourseDocument.module.scss";
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "~/Authentication/AuthContext";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CourseDocument() {
    const { user } = useAuth();
    const [courses1, setCourses1] = useState([]);
    const [courses2, setCourses2] = useState([]);
    const [courses3, setCourses3] = useState([]); // Danh sách môn học
    const [showForm, setShowForm] = useState(false); // Hiển thị form
    const [editMode, setEditMode] = useState(false); // Chế độ sửa
    const [currentCourse, setCurrentCourse] = useState(null); // Môn học hiện tại
    const [selectedFiles, setSelectedFiles] = useState([]); // File đã chọn
    const apiURL = "http://localhost:8084/api/monhoc/grouped";
    const apiURL2 = "http://localhost:8084/api/monhoc";
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    // Fetch danh sách môn học
    const fetchCourses1 = async () => {
        try {
            const response = await fetch(apiURL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            const data = await response.json();
            console.log(data);
            setCourses1(data["GENERAL"]);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách môn học:", error);
        }
    };

    const fetchCourses2 = async () => {
        try {
            const response = await fetch(apiURL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            const data = await response.json();
            setCourses2(data["FOUNDATION"]);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách môn học:", error);
        }
    };

    const fetchCourses3 = async () => {
        try {
            const response = await fetch(apiURL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            const data = await response.json();
            setCourses3(data["SPECIALIZED"]);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách môn học:", error);
        }
    };

    const token = localStorage.getItem("auth_token")

    useEffect(() => {
        fetchCourses1();
        fetchCourses2();
        fetchCourses3();
    }, []);

    // Mở form thêm mới
    const handleAddCourse = () => {
        setCurrentCourse({ tenMonHoc: "", moTa: "", soTinChi: "" });
        setSelectedFiles([]);
        setEditMode(false);
        setShowForm(true);
        form.resetFields(); // Reset form về rỗng
    };

    // Mở form chỉnh sửa
    const handleEditCourse = (course) => {
        setCurrentCourse(course);
        setSelectedFiles([]);
        setEditMode(true);
        setShowForm(true);
        // Đổ dữ liệu cũ vào form nếu dùng antd Form
        form.setFieldsValue({
            Input: course.tenMonHoc,
            descript: course.moTa || course.description,
            tinchi: course.soTinChi,
            kind: course.category,
        });
    };

    // Xóa file đã chọn trước khi gửi lên API
    const handleRemoveFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    // Xóa môn học (gọi API, không xác nhận ở đây)
    const confirmDeleteCourse = async () => {
        try {
            await fetch(`${apiURL2}/${selectedDeleteId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
            });
            fetchCourses1();
            fetchCourses2();
            fetchCourses3();
            setShowDeleteModal(false);
            setSelectedDeleteId(null);
            toast.success("Xóa môn học thành công");
        } catch (error) {
            toast.error("Lỗi khi xóa môn học");
        }
    };

    // Khi bấm nút Xóa
    const handleDeleteCourse = (monHocID) => {
        setSelectedDeleteId(monHocID);
        setShowDeleteModal(true);
    };

    // Xử lý chọn file
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        setCurrentCourse({ tenMonHoc: "", moTa: "", soTinChi: "" });
        setSelectedFiles([]);
        setEditMode(false);
        form.resetFields(); // Reset form về rỗng
    
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Lưu môn học (dùng cho modal Form)
    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append("tenMonHoc", values.Input);
        formData.append("moTa", values.descript);
        formData.append("soTinChi", values.tinchi);
        formData.append("category", values.kind);
        if (values.document && values.document.length > 0) {
            values.document.forEach((file) => {
                formData.append("file", file.originFileObj);
            });
        }
        try {
            const response = await fetch("http://localhost:8084/api/monhoc", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success("Thêm môn học thành công");
                setIsModalOpen(false);
            } else {
                toast.error("Thêm môn học thất bại");
            }
        } catch (error) {
            toast.error("Error: " + error);
        }
        fetchCourses1();
        fetchCourses2();
        fetchCourses3();
    };

    const [form] = Form.useForm();
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // Thêm hàm handleSaveCourse cho chế độ sửa:
    const handleSaveCourse = async (values) => {
        const formData = new FormData();
        formData.append("tenMonHoc", values.Input);
        formData.append("moTa", values.descript);
        formData.append("soTinChi", values.tinchi);
        formData.append("category", values.kind);
        if (values.document && values.document.length > 0) {
            values.document.forEach((file) => {
                formData.append("file", file.originFileObj);
            });
        }
        try {
            const response = await fetch(`${apiURL2}/${currentCourse.monHocID}`, {
                method: "PUT",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success("Cập nhật môn học thành công");
                setShowForm(false);
            } else {
                toast.error("Cập nhật môn học thất bại");
            }
        } catch (error) {
            toast.error("Error: " + error);
        }
        fetchCourses1();
        fetchCourses2();
        fetchCourses3();
    };

    return (
        <div className={cx("course-document")}>
            <div className={cx("title-school")}>
                <img src="https://actvn-edu.appspot.com/resources/images/hvmm/tag-nganh.svg" />
                <span>
                    CÔNG NGHỆ THÔNG TIN</span>
                {user && user.roles && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE")) && <Button onClick={showModal} className={cx("add-button")}>Thêm Môn Học</Button>}
                <Modal title="Thêm môn học mới" open={isModalOpen} onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" htmlType="submit" form="add-course-form">
                            Submit
                        </Button>,
                    ]}
                >
                    <Form
                        id="add-course-form"
                        form={form}
                        style={{ maxWidth: 600 }}
                        className={cx("form")}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên môn học"
                            name="Input"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="descript"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Số tín chỉ"
                            name="tinchi"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Tài liệu"
                            name="document"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Upload name="doc" >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Thể loại"
                            name="kind"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="GENERAL">Đại cương</Option>
                                <Option value="FOUNDATION">Cơ sở ngành</Option>
                                <Option value="SPECIALIZED">Chuyên ngành</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


            {/* Danh sách môn học */}
            <h3 className={cx("title-list")}>Môn học đại cương</h3>
            <div className={cx("course-list")}>

                {courses1.map((course) => (
                    <div key={course.monHocID} className={cx("course-card")}>
                        <img src="https://actvn-edu.appspot.com/resources/images/background-course.jpg"></img>
                        <h3>{course.tenMonHoc}</h3>
                        <p><strong>Mô tả:</strong> {course.description}</p>

                        {/* Hiển thị tài liệu */}
                        {/* <div className={cx("documents")}>
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
                        </div> */}

                        {/* Hành động */}
                        {user && user.roles && !user.roles.includes("ROLE_STUDENT") && <div className={cx("actions")}>
                            <button onClick={() => handleEditCourse(course)} className={cx("edit-button")}>
                                Sửa
                            </button>
                            <button onClick={() => handleDeleteCourse(course.monHocID)} className={cx("delete-button")}>
                                Xóa
                            </button>
                        </div>}
                    </div>
                ))}
            </div>

            <h3 className={cx("title-list")}>Cơ sở ngành</h3>
            <div className={cx("course-list")}>

                {courses2.map((course) => (
                    <div key={course.monHocID} className={cx("course-card")}>
                        <img src="https://actvn-edu.appspot.com/resources/images/background-course.jpg"></img>
                        <h3>{course.tenMonHoc}</h3>
                        <p><strong>Mô tả:</strong> {course.description}</p>

                        {/* Hiển thị tài liệu */}
                        {/* <div className={cx("documents")}>
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
                        </div> */}

                        {/* Hành động */}
                        {user && user.roles && !user.roles.includes("ROLE_STUDENT") && <div className={cx("actions")}>
                            <button onClick={() => handleEditCourse(course)} className={cx("edit-button")}>
                                Sửa
                            </button>
                                <button onClick={() => handleDeleteCourse(course.monHocID)} className={cx("delete-button")}>
                                Xóa
                            </button>
                        </div>}
                    </div>
                ))}
            </div>

            <h3 className={cx("title-list")}>Chuyên ngành</h3>
            <div className={cx("course-list")}>

                {courses3.map((course) => (
                    <div key={course.monHocID} className={cx("course-card")}>
                        <img src="https://actvn-edu.appspot.com/resources/images/background-course.jpg"></img>
                        <h3>{course.tenMonHoc}</h3>
                        <p><strong>Mô tả:</strong> {course.description}</p>

                        {/* Hiển thị tài liệu */}
                        {/* <div className={cx("documents")}>
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
                        </div> */}

                        {/* Hành động */}
                        {user && user.roles && !user.roles.includes("ROLE_STUDENT") && <div className={cx("actions")}>
                            <button onClick={() => handleEditCourse(course)} className={cx("edit-button")}>
                                Sửa
                            </button>
                            <button onClick={() => handleDeleteCourse(course.monHocID)} className={cx("delete-button")}>
                                Xóa
                            </button>
                        </div>}
                    </div>
                ))}
            </div>

            {/* Modal Thêm/Sửa */}
            {showForm && (
                <div className={cx("form-overlay")}>
                    <div className={cx("form-container")}>
                        <h3 style={{ color: '#e53935', textAlign: 'center', marginBottom: 20 }}>{editMode ? "Chỉnh Sửa Môn Học" : "Thêm Môn Học"}</h3>
                        <Form
                            form={form}
                            style={{ maxWidth: 600 }}
                            className={cx("form")}
                            onFinish={editMode ? handleSaveCourse : onFinish}
                        >
                            <Form.Item
                                label="Tên môn học"
                                name="Input"
                                rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="descript"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Số tín chỉ"
                                name="tinchi"
                                rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ!' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label="Tài liệu"
                                name="document"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload name="doc">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Thể loại"
                                name="kind"
                                rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
                            >
                                <Select>
                                    <Option value="GENERAL">Đại cương</Option>
                                    <Option value="FOUNDATION">Cơ sở ngành</Option>
                                    <Option value="SPECIALIZED">Chuyên ngành</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                {editMode ? (
                                    <>
                                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Lưu</Button>
                                        <Button onClick={() => setShowForm(false)}>Hủy</Button>
                                    </>
                                ) : null}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xoá */}
            {showDeleteModal && (
                <div className={cx("modal-overlay")}> 
                    <div className={cx("modal-container")}> 
                        <h3>Xác nhận xoá môn học?</h3>
                        <div style={{display: 'flex', justifyContent: 'center', gap: 16}}>
                            <button onClick={confirmDeleteCourse} className={cx("delete-button")}>Xác nhận</button>
                            <button onClick={() => setShowDeleteModal(false)} className={cx("edit-button")}>Huỷ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseDocument;
