import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import classNames from "classnames/bind";
import styles from "./SpecialEvent.module.scss";
import { CalendarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useAuth } from "~/Authentication/AuthContext";
import { toast } from 'react-toastify';

function SpecialEvent({titleHidden = false, buttonHidden = false}) {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const url = process.env.REACT_APP_API_URL;
   
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [registering, setRegistering] = useState(false);
    const userString = localStorage.getItem('user');
                const user = JSON.parse(userString);



    const fetchEvent = async (eventId) => {
        try {
            const response = await fetch(url + `/api/public/sukien/${eventId}`)
            const data = await response.json();
            setCurrentEvent(data);

            if (!response.ok)
                throw new Error("Không thể lấy được sự kiện")
        } catch (error) {
            alert(error)
        }
    }

    const fetchNew = async () => {
        try {
            const response = await fetch(url + "/api/public/sukien?page=0", {
                method: 'GET'
            });

            if (!response.ok)
                throw new Error("Không lấy được Events");

            const data = await response.json();
            setArr(data.content.slice(0, 4));
            setCurrentEvent(data.content[0])
            setLoading(false);

        } catch (error) {
            alert(error)
        }
    };

    useEffect(() => {
        fetchNew();
        console.log(currentEvent)
    }, [])

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

    // Hàm đăng ký sự kiện
    const handleRegister = async () => {
        if (!user || !user.userName) {
            toast.error("Vui lòng đăng nhập để đăng ký tham gia");
            
            setTimeout(() => {
                navigate("/login");
            }, 500);
            return;
        }
        setRegistering(true);
        try {
            const formData = new FormData();
            formData.append('maSinhVien', user.userName);
            formData.append('eventId', currentEvent.eventId);

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
        } catch (err) {
            toast.error(err.message);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('container')}>
            {!titleHidden && <h1>SỰ KIỆN MỚI NHẤT</h1>}

            <div className={cx("list-detail")}> 
                <div className={cx("event-cel")}> 
                    <img src={currentEvent.fileDTOList[0] ? (url + currentEvent.fileDTOList[0].downloadUrl) : "https://soict.hust.edu.vn/wp-content/uploads/2019/05/a.jpg"}></img>
                    <div className={cx("event-info")}> 
                        <div className={cx("info-header")}> 
                            <img src={currentEvent.fileDTOList[0] ? (url + currentEvent.fileDTOList[0].downloadUrl) : "https://actvn.edu.vn/Images/actvn_big_icon.png"}></img>
                            <h2>{currentEvent.eventName}</h2>
                        </div>

                        <div className={cx("info-content")}> 
                            <div className={cx("info-detail")}> 
                                <div><CalendarFilled /> Ngày bắt đầu: {currentEvent.startAt.split("-").reverse().join("/")}</div>
                                <div><CalendarFilled /> Ngày kết thúc: {currentEvent.endAt.split("-").reverse().join("/")}</div>
                                <div><i className="fa-solid fa-location-dot"></i> {currentEvent.location}</div>
                            </div>
                            <div className={cx("info-actions")}> 
                               {((user==null)||(user&&user.roles.includes("ROLE_STUDENT")))&&(
                                <Button
                                    className={cx("register")}
                                    onClick={handleRegister}
                                    loading={registering}
                                    disabled={registering}
                                >
                                    Đăng ký ngay
                                </Button>
                               )}
                                <Button className={cx("register")} onClick={() => navigate(`/events/${currentEvent.eventId}`)}>Chi tiết</Button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('event-list')}>
                    {arr.map((event, index) => (
                        <div onClick={() => fetchEvent(event.eventId)} key={index} className={cx('event-item')}>
                            <div className={cx('event-tag')}>
                                <img style={{ width: "100%" }} src={url + event.fileDTOList[0]?.downloadUrl}></img>
                            </div>
                            <div className={cx('event-details')}>
                                <div className={cx('event-name')}>{event.eventName}</div>
                                <div className={cx('event-date')}>
                                    <span className={cx('start-date')}>{event.startAt.split('-').reverse().join('/')}</span> -
                                    <span className={cx('end-date')}>{event.endAt.split('-').reverse().join('/')}</span>
                                </div>
                                <div className={cx('event-location')}>{event.location}</div>
                                <div className={cx('event-organized')}>{event.organizedBy}</div>
                            </div>
                            <div className={cx('event-status', getEventStatus(event.startAt, event.endAt))}>
                                {getEventStatus(event.startAt, event.endAt) === 'chua-bat-dau' && 'Sắp diễn ra'}
                                {getEventStatus(event.startAt, event.endAt) === 'dang-dien-ra' && 'Đang diễn ra'}
                                {getEventStatus(event.startAt, event.endAt) === 'da-ket-thuc' && 'Đã kết thúc'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Thêm Link dẫn đến trang xem toàn bộ bài viết */}
           
                <div className={cx('view-all')}>
                    {!buttonHidden && (
                        <Link to="/events" className={cx('view-all-link')}>
                            Xem tất cả sự kiện
                        </Link>
                    )}
                    {buttonHidden && (
                       <a href="#all-events" className={cx('view-all-link')}>Xem tất cả sự kiện</a>
                    )}
                </div>
            
        </div>
    );
}

export default SpecialEvent;
