import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetail.module.scss'; // Import SCSS file
import classNames from 'classnames/bind';
import { Button, Modal, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckOutlined } from '@ant-design/icons';

const EventDetail = () => {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const { slug } = useParams();
    const eventId = slug; // Lấy eventId từ URL (slug)
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sinhVienThamGia, setParticipants] = useState([]);
    const [registering, setRegistering] = useState(false);
    const [user, setUser] = useState(null);
    const [participatedEvents, setParticipatedEvents] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [studentTotal, setStudentTotal] = useState(0);
    const [studentLoading, setStudentLoading] = useState(false);
    const url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
    }, []);

    useEffect(() => {
        // Hàm fetch data
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`${url}/api/public/sukien/${eventId}`);

                if (!response.ok) {
                    throw new Error('Không thể lấy thông tin sự kiện');
                }

                const data = await response.json();
                setEventDetail(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [eventId]);

    // Fetch participated events and check registration
    useEffect(() => {
        const fetchParticipatedEvents = async () => {
            if (!user || !user.userName) return;
            try {
                const token = localStorage.getItem('auth_token');
                const response = await fetch(`http://localhost:8084/api/students/participated_events/${user.userName}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setParticipatedEvents(data);
                    setIsRegistered(data.some(event => event.eventId === Number(eventId)));
                } else {
                    setParticipatedEvents([]);
                    setIsRegistered(false);
                }
            } catch (err) {
                setParticipatedEvents([]);
                setIsRegistered(false);
            }
        };
        if (user && eventId) {
            fetchParticipatedEvents();
        }
    }, [user, eventId]);

    // Fetch số lượt đăng ký tham gia khi load trang
    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await fetch(`http://localhost:8084/api/sukien/participation_list/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Không thể lấy danh sách sinh viên');
                const data = await response.json();
                setStudentTotal(data.content ? data.content.length : 0);
            } catch (err) {
                setStudentTotal(0);
            }
        };
        if (eventId) fetchStudentCount();
    }, [eventId]);

    // Fetch danh sách sinh viên tham gia
    const handleShowStudentList = async () => {
        setStudentLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`http://localhost:8084/api/sukien/participation_list/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Không thể lấy danh sách sinh viên');
            const data = await response.json();
            setStudentList(data.content || []);
            setShowModal(true);
        } catch (err) {
            toast.error(err.message || 'Không thể lấy danh sách sinh viên');
        } finally {
            setStudentLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!user || !user.userName) {
            toast.error("Vui lòng đăng nhập để đăng ký tham gia");
            return;
        }

        setRegistering(true);
        try {
            const formData = new FormData();
            formData.append('maSinhVien', user.userName);
            formData.append('eventId', eventId);

            const token = localStorage.getItem('auth_token');
            const response = await fetch('http://localhost:8084/api/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Bạn đã đăng kí tham gia sự kiện này trước đó');
            }

            toast.success("Đăng ký tham gia thành công!");
            setIsRegistered(true);
            // Sau khi đăng ký thành công, cập nhật lại số lượt đăng ký
            setStudentTotal(prev => prev + 1);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (eventDetail) {
        const {
            eventName,
            description,
            startAt,
            endAt,
            location,
            createAt,
            organizedBy,
            fileDTOList
        } = eventDetail;

        const srcImg = fileDTOList[0].downloadUrl

        // Cột cho bảng sinh viên
        const columns = [
            { title: 'Mã SV', dataIndex: 'maSinhVien', key: 'maSinhVien' },
            { title: 'Tên sinh viên', dataIndex: 'tenSinhVien', key: 'tenSinhVien' },
            { title: 'Giới tính', dataIndex: 'gioiTinh', key: 'gioiTinh' },
            { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh' },
            { title: 'Quê quán', dataIndex: 'queQuan', key: 'queQuan' },
            { title: 'Khoa', dataIndex: 'khoa', key: 'khoa' },
            { title: 'Lớp', dataIndex: 'tenLop', key: 'tenLop' },
        ];

        return (
            <div className={cx("event-detail")}> 
                <img src={url + srcImg}></img>
                <h1>{eventName}</h1>
                <p><strong>Miêu tả:</strong> {description}</p>
                <p><strong>Thời gian:</strong> {startAt} đến {endAt}</p>
                <p><strong>Địa điểm:</strong> {location}</p>
                <p><strong>Ngày tạo:</strong> {createAt}</p>
                <p><strong>Đơn vị tổ chức:</strong> {organizedBy}</p>

                {/* Số lượt đăng ký tham gia */}
                {studentTotal > 0 && (
                    <div className={cx("event-participants")}> 
                        <span className={cx("event-participants-title")}>Số lượt đăng ký tham gia: <b>{studentTotal}</b></span>
                    </div>
                )}

            {((user && user.roles.includes("ROLE_STUDENT"))) && (
                <div className={cx("register-section")}> 
                    {new Date(endAt) > new Date() ? (
                        isRegistered ? (
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "100%" }}
                                icon={<CheckOutlined />}
                                disabled
                                className={cx("register-button-disabled")}
                            >
                                Đã đăng ký
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "100%" }}
                                onClick={handleRegister}
                                loading={registering}
                                disabled={registering}
                            >
                                {registering ? 'Đang đăng ký...' : 'Đăng ký tham gia'}
                            </Button>
                        )
                    ) : (
                        <Button type="primary" disabled={true} size="large" style={{ width: "100%" }}>Đã kết thúc</Button>
                    )}
                </div>
            )}
             {user&&user.roles.includes("ROLE_ADMIN")&&(
                <div className={cx("event-participants")}> 
                    <Button className={cx("view-participants")}
                        type="primary"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={handleShowStudentList}
                        loading={studentLoading}
                    >
                        Danh sách sinh viên đăng kí tham gia
                    </Button>
                    <Modal
                        title={<div className={cx('student-modal-title')}>Danh sách sinh viên đăng ký tham gia sự kiện</div>}
                        open={showModal}
                        onCancel={() => setShowModal(false)}
                        footer={null}
                        width={900}
                        className={cx('student-modal')}
                    >
                        <div className={cx('student-modal-table')}>
                            <Table
                                dataSource={studentList}
                                columns={columns}
                                rowKey="maSinhVien"
                                pagination={false}
                                bordered
                            />
                        </div>
                    </Modal>
                </div>
             )}
            </div>
        );
    }

    return null;
};

export default EventDetail;
