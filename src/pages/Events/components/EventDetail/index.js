import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EventDetail.module.scss'; // Import SCSS file
import classNames from 'classnames/bind';


const EventDetail = () => {
    const cx = classNames.bind(styles);
    const { slug } = useParams();
    const eventId = slug; // Lấy eventId từ URL (slug)
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sinhVienThamGia, setParticipants] = useState([]);

    useEffect(() => {
        // Hàm fetch data
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8084/api/sukien/${eventId}`);

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

        const fetchParticipant = async () => {
            try {
                const response = await fetch(`http://localhost:8084/api/sukien/participation_list/${eventId}`);

                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách tham gia');
                }

                const data = await response.json();
                setParticipants(data.content);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchParticipant();
        fetchEventDetail();
    }, [eventId]);

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
        } = eventDetail;



        return (
            <div className={cx("event-detail")}>
                <h1>{eventName}</h1>
                <p><strong>Miêu tả:</strong> {description}</p>
                <p><strong>Thời gian:</strong> {startAt} đến {endAt}</p>
                <p><strong>Địa điểm:</strong> {location}</p>
                <p><strong>Ngày tạo:</strong> {createAt}</p>
                <p><strong>Đơn vị tổ chức:</strong> {organizedBy}</p>

                {sinhVienThamGia.length > 0 ? (
                    <div>
                        <h2>Danh sách sinh viên tham gia</h2>
                        <div className={cx("table-container")}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã sinh viên</th>
                                        <th>Tên sinh viên</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>Quê quán</th>
                                        <th>Khoa</th>
                                        <th>Lớp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sinhVienThamGia.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.maSinhVien}</td>
                                            <td>{student.tenSinhVien}</td>
                                            <td>{student.gioiTinh}</td>
                                            <td>{student.ngaySinh}</td>
                                            <td>{student.queQuan}</td>
                                            <td>{student.khoa}</td>
                                            <td>{student.tenLop}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>) : (
                    <div className={cx('noStudents')}>Chưa có sinh viên nào tham gia sự kiện này.</div>

                )}
            </div>
        );
    }

    return null;
};

export default EventDetail;
