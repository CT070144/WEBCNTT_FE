import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import classNames from "classnames/bind";
import styles from "./Events.module.scss";

function Events() {
    const cx = classNames.bind(styles);
    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url + "/api/public/sukien?page=0", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setArr(data.content); // Lấy mảng sự kiện từ data.content
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Hàm để tính trạng thái của sự kiện
    const getEventStatus = (startAt, endAt) => {
        const today = new Date(); // Ngày hôm nay
        const startDate = new Date(startAt); // Chuyển startAt thành đối tượng Date
        const endDate = new Date(endAt); // Chuyển endAt thành đối tượng Date


        // So sánh ngày hôm nay với ngày bắt đầu và kết thúc sự kiện
        if (today < startDate) {
            return 'chua-bat-dau'; // Trạng thái "Chưa bắt đầu"
        } else if (today >= startDate && today <= endDate) {
            return 'dang-dien-ra'; // Trạng thái "Đang diễn ra"
        } else {
            return 'da-ket-thuc'; // Trạng thái "Đã kết thúc"
        }
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Sự kiện mới nhất</h1>

            <div className={cx('event-list')}>
                {arr.map((event, index) => {
                    // Lấy ngày và tháng từ startAt
                    const dateObj = new Date(event.startAt);
                    const day = dateObj.getDate().toString().padStart(2, '0');
                    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                    return (
                        <div key={index} className={cx('event-card')} onClick={() => navigate(`/events/${event.eventId}`)}>
                            <div className={cx('event-image-wrapper')}>
                                <img src={event.fileDTOList[0] ? (url + event.fileDTOList[0].downloadUrl) : "https://soict.hust.edu.vn/wp-content/uploads/2019/05/a.jpg"} className={cx('event-image')}></img>
                                <div className={cx('event-date-overlay')}>
                                    <div className={cx('event-day')}>{day}</div>
                                    <div className={cx('event-month')}>TH {month}</div>
                                </div>
                            </div>
                            <div className={cx('event-info')}> 
                                <div className={cx('event-title')}>{event.eventName.length > 40 ? event.eventName.slice(0, 40) + '...' : event.eventName}</div>
                                <div className={cx('event-meta')}>
                                    <span className={cx('event-author')}><i className="fa fa-user"></i> {event.organizedBy || 'Không rõ'}</span>
                                </div>
                                <div className={cx('event-description')}>{event.description ? (event.description.length > 100 ? event.description.slice(0, 100) + '...' : event.description) : ''}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Thêm Link dẫn đến trang xem toàn bộ bài viết */}
            <div className={cx('view-all')}>
                <Link to="/events" className={cx('view-all-link')}>
                    Xem tất cả sự kiện
                </Link>
            </div>
        </div>
    );

}

export default Events;