import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./EmployeeManagement.module.scss";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  Upload,
  Modal,
} from "antd";
import Column from "antd/es/table/Column";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const url = process.env.REACT_APP_API_URL;

// Validation Schema with Yup
const schema = yup.object().shape({
  avatar: yup
    .array()
    .min(1, "Vui lòng tải lên ảnh đại diện.")
    .required("Vui lòng tải lên ảnh đại diện."),
  maNhanVien: yup.string().required("Mã nhân viên là bắt buộc."),
 
  fullname: yup.string().required("Họ tên là bắt buộc."),
  dob: yup
    .date()
    .required("Ngày sinh là bắt buộc.")
    .typeError("Vui lòng chọn ngày sinh hợp lệ."),
  gender: yup.string().required("Vui lòng chọn giới tính."),
  phongBan: yup.string().required("Vui lòng chọn phòng ban."),
  dienThoai: yup
    .string()
    .required("Số điện thoại là bắt buộc.")
    .matches(/^[0-9]+$/, "Chỉ được nhập số."),
  diaChiHienNay: yup.string().required("Địa chỉ hiện nay là bắt buộc."),
  chucVu: yup.string().required("Chức vụ là bắt buộc."),
  monGiangDayChinh: yup.string().transform((value, originalValue) => {
    if (typeof originalValue === 'object' && originalValue !== null) {
      return ''; 
    }
    return originalValue;
  })
  .required("Vui lòng chọn môn giảng dạy chính."),
});

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const token = localStorage.getItem("auth_token");
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 3,
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
   
  });

  const apiURL = url + "/api/nhanvien";

  // Fetch danh sách nhân viên
  const fetchEmployees = async (page) => {
    console.log(page);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${apiURL}?page=${page}&size=${pagination.pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log(data);
      setEmployees(data.content);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        pageSize: data.pageSize,
      });
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách nhân viên!");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(url + "/api/monhoc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object with 'content' property
        const subjectsList = Array.isArray(data) ? data : data.content;
        setSubjects(subjectsList || []);
      } else {
        console.error("Failed to fetch subjects");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách môn học!");
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(url + "/api/phong_ban", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.content || []);
      } else {
        console.error("Failed to fetch departments");
        toast.error("Lỗi khi lấy danh sách phòng ban!");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách phòng ban!");
    }
  };

  useEffect(() => {
    fetchEmployees(0);
    fetchSubjects();
    fetchDepartments();
  }, []);

  // Xóa nhân viên
  const handleDeleteEmployee = async (idUser) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xóa nhân viên này?",
      okText: "Xoá",
      cancelText: "Huỷ",
      onOk: async () => {
        try {
          const response = await fetch(`${apiURL}/${idUser}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            toast.success("Xóa nhân viên thành công!");
            fetchEmployees(pagination.currentPage);
          } else {
            toast.error("Xóa nhân viên thất bại!");
          }
        } catch (error) {
          toast.error("Lỗi khi xóa nhân viên!");
        }
      },
    });
  };

  // Thêm nhân viên
  const handleAddEmployee = () => {
    setEditMode(false);
    setCurrentEmployee({});
    reset({
      avatar: [],
      maNhanVien: "",
      fullname: "",
      dob: null,
      gender: undefined,
      phongBan: undefined,
      dienThoai: "",
      diaChiHienNay: "",
      chucVu: "",
      monGiangDayChinh: undefined,
    }); // Clear form data
    setShowForm(true);
  };

  // Sửa nhân viên
  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setEditMode(true);
    setShowForm(true);
    
    // Populate form with existing data
    reset({
      maNhanVien: employee.maNhanVien,
      username: employee.userName,
      fullname: employee.tenNhanVien,
      dob: employee.ngaySinh ? dayjs(employee.ngaySinh) : null,
      gender: employee.gioiTinh,
      phongBan: employee.maPhongBan,
      dienThoai: employee.dienThoai,
      diaChiHienNay: employee.diaChiHienNay,
      chucVu: employee.chucVu,
      monGiangDayChinh: employee.monGiangDayChinh,
      avatar: employee.avaFileCode ? [{
        uid: '-1',
        name: 'avatar.jpg',
        status: 'done',
        url: url + employee.avaFileCode
      }] : []
    });
  };

  // Cập nhật nhân viên
  const handleUpdateEmployee = async (data) => {
    const formData = new FormData();

    formData.append("maNhanVien", currentEmployee.maNhanVien);
    formData.append("tenNhanVien", data.fullname);
    formData.append("gioiTinh", data.gender);
    formData.append("ngaySinh", dayjs(data.dob).format("YYYY-MM-DD"));
    formData.append("maPhongBan", data.phongBan);
    formData.append("dienThoai", data.dienThoai);
    formData.append("diaChiHienNay", data.diaChiHienNay);
    formData.append("chucVu", data.chucVu);
    formData.append("monGiangDayChinh", data.monGiangDayChinh);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("file", data.avatar[0].originFileObj);
    }
   
    try {
      const response = await fetch(`${apiURL}/${currentEmployee.idUser}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Cập nhật nhân viên thành công");
        setShowForm(false);
        setEditMode(false);
        setCurrentEmployee({});
        reset();
        fetchEmployees(pagination.currentPage);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // Thêm nhân viên mới
  const handleAddNewEmployee = async (data) => {
    const formData = new FormData();

    formData.append("maNhanVien", data.maNhanVien);
    formData.append("tenNhanVien", data.fullname);
    formData.append("gioiTinh", data.gender);
    formData.append("ngaySinh", dayjs(data.dob).format("YYYY-MM-DD"));
    formData.append("userName", data.username);
    formData.append("maPhongBan", data.phongBan);
    formData.append("dienThoai", data.dienThoai);
    formData.append("diaChiHienNay", data.diaChiHienNay);
    formData.append("chucVu", data.chucVu);
    formData.append("monGiangDayChinh", data.monGiangDayChinh);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("file", data.avatar[0].originFileObj);
    }

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Thêm nhân viên thành công");
        setShowForm(false);
        reset(); // Clear form after successful addition
        fetchEmployees(pagination.currentPage);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Thêm nhân viên thất bại";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const onSubmit = async (data) => {
    if (editMode) {
      await handleUpdateEmployee(data);
    } else {
      await handleAddNewEmployee(data);
    }
  };

  return (
    <div className={cx("employee-management")}>
      <button onClick={handleAddEmployee} className={cx("add-button")}>
        Thêm Nhân Viên
      </button>

      {/* Danh sách nhân viên */}
      <Table
        dataSource={employees}
        pagination={{
          position: "bottom",
          align: "center",
          onChange: (page) => {
            fetchEmployees(page-1);
          },
          pageSize: 3,
          total: pagination.totalPages * pagination.pageSize,
         
          
        }}
      >
        <Column
          title="Họ và tên"
          render={(_, record) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
                src={url + record.avaFileCode}
                alt=""
              ></img>
              <p>{record.tenNhanVien}</p>
            </div>
          )}
          key="tenNhanVien"
        ></Column>
        <Column
          title="Mã nhân viên"
          dataIndex="maNhanVien"
          key="maNhanVien"
        ></Column>
        <Column title="Ngày Sinh" dataIndex="ngaySinh" key="ngaySinh"></Column>
        <Column title="Địa chỉ" dataIndex="diaChiHienNay" key="diaChiHienNay"></Column>
        <Column title="Chức vụ" dataIndex="chucVu" key="chucVu"></Column>
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button onClick={() => handleEditEmployee(record)}>Sửa</Button>
              <Button onClick={() => handleDeleteEmployee(record.idUser)}>
                Xóa
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Modal Thêm/Sửa */}
      {showForm && (
        <div className={cx("form-overlay")}>
          <div className={cx("form-container")}>
            <Divider orientation="center">
              <h2>{editMode ? "Sửa thông tin nhân viên" : "Thêm nhân viên mới"}</h2>
            </Divider>
            <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
              {/* Avatar */}
              <div className={cx("form-item", "form-item-full-width")}>
                <label>Avatar</label>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <Upload
                      {...field}
                      listType="picture"
                      maxCount={1}
                      beforeUpload={() => false} // Prevent auto-upload
                      onChange={(e) => field.onChange(e.fileList)}
                    >
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  )}
                />
                {errors.avatar && (
                  <p className={cx("error-message")}>{errors.avatar.message}</p>
                )}
              </div>

              {/* Mã nhân viên */}
              <div className={cx("form-item")}>
                <label>Mã nhân viên</label>
                <Controller
                  name="maNhanVien"
                  control={control}
                  render={({ field }) => <Input {...field} disabled={editMode} />}
                />
                {errors.maNhanVien && (
                  <p className={cx("error-message")}>
                    {errors.maNhanVien.message}
                  </p>
                )}
              </div>


              {/* Họ tên */}
              <div className={cx("form-item")}>
                <label>Họ tên</label>
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.fullname && (
                  <p className={cx("error-message")}>
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Ngày sinh */}
              <div className={cx("form-item")}>
                <label>Ngày sinh</label>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                    />
                  )}
                />
                {errors.dob && (
                  <p className={cx("error-message")}>{errors.dob.message}</p>
                )}
              </div>

              {/* Giới tính */}
              <div className={cx("form-item")}>
                <label>Giới tính</label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Chọn giới tính">
                      <Select.Option value="Nam">Nam</Select.Option>
                      <Select.Option value="Nữ">Nữ</Select.Option>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className={cx("error-message")}>{errors.gender.message}</p>
                )}
              </div>

              {/* Phòng ban */}
              <div className={cx("form-item")}>
                <label>Phòng ban</label>
                <Controller
                  name="phongBan"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Chọn phòng ban">
                      {departments.map((department) => (
                        <Select.Option key={department.maPhongBan} value={department.maPhongBan} label={department.tenPhongBan}>
                          {department.tenPhongBan}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.phongBan && (
                  <p className={cx("error-message")}>
                    {errors.phongBan.message}
                  </p>
                )}
              </div>

              {/* Điện thoại */}
              <div className={cx("form-item")}>
                <label>Điện thoại</label>
                <Controller
                  name="dienThoai"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.dienThoai && (
                  <p className={cx("error-message")}>
                    {errors.dienThoai.message}
                  </p>
                )}
              </div>

              {/* Địa chỉ hiện nay */}
              <div className={cx("form-item")}>
                <label>Địa chỉ hiện nay</label>
                <Controller
                  name="diaChiHienNay"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.diaChiHienNay && (
                  <p className={cx("error-message")}>{errors.diaChiHienNay.message}</p>
                )}
              </div>

              {/* Chức vụ */}
              <div className={cx("form-item")}>
                <label>Chức vụ</label>
                <Controller
                  name="chucVu"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.chucVu && (
                  <p className={cx("error-message")}>{errors.chucVu.message}</p>
                )}
              </div>

              {/* Môn giảng dạy chính */}
              <div className={cx("form-item")}>
                <label>Môn giảng dạy chính</label>
                <Controller
                  name="monGiangDayChinh"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      allowClear
                      
                      placeholder="Chọn hoặc tìm kiếm môn học"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {subjects.map((subject) => (
                        <Select.Option key={subject.monHocID} value={subject.tenMonHoc} label={subject.tenMonHoc}>
                          {subject.tenMonHoc}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.monGiangDayChinh && <p className={cx("error-message")}>{errors.monGiangDayChinh.message}</p>}
              </div>

              <div
                className={cx(
                  "form-item",
                  "form-item-full-width",
                  "form-actions"
                )}
              >
                <Button
                  className={cx("submit-button")}
                 
                  type="primary"
                  htmlType="submit"
                >
                  {editMode ? "Cập nhật" : "Thêm"}
                </Button>
                <Button onClick={() => {
                  setShowForm(false);
                  setEditMode(false);
                  setCurrentEmployee({});
                  reset();
                }}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
