import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import classNames from "classnames/bind";
import styles from "./Events.module.scss";
import SpecialEvent from "../Home/components/SpecialEvent";

function Events({isAdmin = false}) {
    const cx = classNames.bind(styles);
    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [arr, setArr] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [user, setUser] = useState(null);
    const [participatedEvents, setParticipatedEvents] = useState([]);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
            // Fetch participated events when user is loaded
            if (userData && userData.userName) {
                fetchParticipatedEvents();
            }
        }
    }, []);

    useEffect(() => {
        fetch(url + "/api/public/sukien?page=0", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setArr(data.content); // Lấy mảng sự kiện từ data.content
                setFilteredEvents(data.content); // Khởi tạo filteredEvents với tất cả sự kiện
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching:', err);
                setLoading(false);
            });
    }, []);

    // Fetch participated events
    const fetchParticipatedEvents = async () => {
        if (!user || !user.userName) return;
        console.log("call fetchParticipatedEvents");
        
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`http://localhost:8084/api/students/participated_events/${user.userName}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data + "d");
                setParticipatedEvents(data);

                console.log(participatedEvents + "HEHEH");
                
            }
        } catch (err) {
            console.error('Error fetching participated events:', err);
        }
    };

    // Hàm tìm kiếm sự kiện
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            // Nếu không có từ khóa tìm kiếm, áp dụng filter hiện tại
            applyFilter(arr, filterType, selectedDate);
            return;
        }

        const searchLower = searchTerm.toLowerCase().trim();
        const searchResults = arr.filter(event => {
            return event.eventName && event.eventName.toLowerCase().includes(searchLower);
        });

        // Áp dụng filter lên kết quả tìm kiếm
        applyFilter(searchResults, filterType, selectedDate);
    };

    // Hàm lọc sự kiện
    const applyFilter = (eventsToFilter, type) => {
        let filtered = eventsToFilter;

        switch (type) {
            case "chua-bat-dau":
                filtered = eventsToFilter.filter(event => getEventStatus(event.startAt, event.endAt) === 'chua-bat-dau');
                break;
            case "dang-dien-ra":
                filtered = eventsToFilter.filter(event => getEventStatus(event.startAt, event.endAt) === 'dang-dien-ra');
                break;
            case "da-ket-thuc":
                filtered = eventsToFilter.filter(event => getEventStatus(event.startAt, event.endAt) === 'da-ket-thuc');
                break;
                        case "da-dang-ky":
                // Lọc sự kiện đã đăng ký - luôn sử dụng arr gốc
                console.log(participatedEvents + "HEHEHEH");
                if (participatedEvents && participatedEvents.length > 0) {
                    setFilteredEvents(participatedEvents);
                    return;
                } else {
                    filtered = []; // Không có sự kiện nào đã đăng ký
                }
                break;
          
            default:
                // "all" - không lọc gì cả
                break;
        }
        
        setFilteredEvents(filtered);
    };

    // Khi thay đổi filter
    const handleFilterChange = async (e) => {
        const newFilterType = e.target.value;
        setFilterType(newFilterType);

        if (newFilterType === "da-dang-ky") {
            await fetchParticipatedEvents();
            // KHÔNG gọi applyFilter ở đây!
        } else {
            applyFilter(arr, newFilterType);
        }
    };

    // Lắng nghe participatedEvents và filterType
    useEffect(() => {
        if (filterType === "da-dang-ky") {
            applyFilter(arr, "da-dang-ky");
        }
        // eslint-disable-next-line
    }, [participatedEvents, filterType]);

    // Xử lý khi thay đổi ngày
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        applyFilter(arr, filterType, newDate);
    };

    // Xử lý khi nhấn Enter trong ô tìm kiếm
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Xử lý khi xóa từ khóa tìm kiếm
    const handleSearchClear = () => {
        setSearchTerm("");
        applyFilter(arr, filterType, selectedDate);
    };

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

    // Lấy danh sách sự kiện đang diễn ra
    const ongoingEvents = arr.filter(event => getEventStatus(event.startAt, event.endAt) === 'dang-dien-ra');

    // Hàm xoá sự kiện
    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;
        setDeleting(true);
        setDeleteError("");
        try {
            const res = await fetch(`http://localhost:8084/api/sukien/${eventToDelete.eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            if (!res.ok) throw new Error("Xoá sự kiện thất bại!");
            // Xoá khỏi arr và filteredEvents
            const newArr = arr.filter(ev => ev.eventId !== eventToDelete.eventId);
            setArr(newArr);
            setFilteredEvents(filteredEvents.filter(ev => ev.eventId !== eventToDelete.eventId));
            setShowDeleteModal(false);
            setEventToDelete(null);
        } catch (err) {
            setDeleteError(err.message || "Đã có lỗi xảy ra!");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('container')}>
          
            <SpecialEvent buttonHidden={true} className={cx('special-event')} />
            <div className={cx('filter-container')}>
           
           <div className={cx('search-container')}>
               <div className={cx('search-section')}>
                   <label htmlFor="search">Tìm kiếm sự kiện</label>
                   <div className={cx('search-wrapper')}>
                       <input 
                           type="text" 
                           id="search" 
                           placeholder="Tìm kiếm sự kiện" 
                           value={searchTerm} 
                           onChange={(e) => setSearchTerm(e.target.value)} 
                           onKeyPress={handleSearchKeyPress} 
                       />
                       <button onClick={handleSearch} className={cx('search-button')}>Tìm kiếm</button>
                       {searchTerm && (
                           <button onClick={handleSearchClear} className={cx('clear-button')}>✕</button>
                       )}
                   </div>
               </div>

               <div className={cx('filter-section')}>
                   <label htmlFor="filter">Lọc sự kiện</label>
                   <div className={cx('filter-wrapper')}>
                       <select id="filter" value={filterType} onChange={handleFilterChange}>
                           <option value="all">Tất cả</option>
                           <option value="chua-bat-dau">Chưa bắt đầu</option>
                           <option value="dang-dien-ra">Đang diễn ra</option>
                           <option value="da-ket-thuc">Đã kết thúc</option>
                          {user&&user.roles.includes("ROLE_STUDENT")&&(
                            <option value="da-dang-ky">Đã đăng ký</option>
                          )}
                       </select>
                       
                       {filterType === "date" && (
                           <input 
                               type="date" 
                               value={selectedDate} 
                               onChange={handleDateChange}
                               className={cx('date-input')}
                           />
                       )}
                   </div>
               </div>

               {/* Hiển thị thông tin kết quả */}
               
           </div>
           

           </div>
            <div className={cx('event-container')}>
            <div id="all-events" className={cx('event-list')}>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => {
                        // Lấy ngày và tháng từ startAt
                        const dateObj = new Date(event.startAt);
                        const day = dateObj.getDate().toString().padStart(2, '0');
                        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                        return (
                            <div key={index} className={cx('event-card')} onClick={() => navigate(`/events/${event.eventId}`)}>
                                {isAdmin && (
                                    <button
                                        className={cx('delete-btn')}
                                        onClick={e => {
                                            e.stopPropagation();
                                            setEventToDelete(event);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Xoá
                                    </button>
                                )}
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

                              {/*  <span className={cx('event-participants')}> 10 lượt đăng kí tham gia</span> */}
                            </div>
                        )
                    })
                ) : (
                    <div className={cx('no-results')}>
                        {searchTerm || filterType !== "all" ? 
                         (filterType === "da-dang-ky" ? 
                          "Bạn chưa đăng ký tham gia sự kiện nào." : 
                          `Không tìm thấy sự kiện nào phù hợp với điều kiện tìm kiếm.`) : 
                         "Không có sự kiện nào để hiển thị."
                        }
                    </div>
                )}
            </div>
           {!isAdmin &&  <div className={cx('ongoing-event')}>
                <div className={cx('ongoing-event-title')}>Sự kiện nổi bật</div>
                <div className={cx('ongoing-event-list')}>
                  {ongoingEvents.length > 0 ? ongoingEvents.map((event, idx) => {
                    const dateObj = new Date(event.startAt);
                    const day = dateObj.getDate().toString().padStart(2, '0');
                    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                    return (
                      <div key={event.eventId} className={cx('ongoing-event-card')} onClick={() => navigate(`/events/${event.eventId}`)}>
                        <div className={cx('ongoing-event-img-wrap')}>
                          <img src={event.fileDTOList[0] ? (url + event.fileDTOList[0].downloadUrl) : "https://soict.hust.edu.vn/wp-content/uploads/2019/05/a.jpg"} alt={event.eventName} className={cx('ongoing-event-img')} />
                        </div>
                        <div className={cx('ongoing-event-info')}>
                          <div className={cx('ongoing-event-name')}>{event.eventName.length > 30 ? event.eventName.slice(0, 30) + '...' : event.eventName}</div>
                          <div className={cx('ongoing-event-date')}>{day}/{month}</div>
                          <div className={cx('ongoing-event-desc')}>{event.description ? (event.description.length > 50 ? event.description.slice(0, 50) + '...' : event.description) : ''}</div>
                        </div>
                      </div>
                    );
                  }) : <div className={cx('no-ongoing-event')}>Không có sự kiện nào đang diễn ra.</div>}
                </div>
            </div>}
            </div>

            {/* Modal xác nhận xoá */}
            {showDeleteModal && (
                <div className={cx('delete-modal-overlay')}>
                    <div className={cx('delete-modal')}>
                        <div className={cx('delete-modal-title')}>Xác nhận xoá sự kiện</div>
                        <div className={cx('delete-modal-message')}>
                            Bạn có chắc chắn muốn xoá sự kiện "{eventToDelete?.eventName}" không?
                        </div>
                        {deleteError && <div style={{color:'#dc3545', marginBottom:8}}>{deleteError}</div>}
                        <div className={cx('delete-modal-actions')}>
                            <button className={cx('delete-modal-cancel')} onClick={() => {setShowDeleteModal(false); setEventToDelete(null);}} disabled={deleting}>Huỷ</button>
                            <button className={cx('delete-modal-confirm')} onClick={handleDeleteEvent} disabled={deleting}>
                                {deleting ? 'Đang xoá...' : 'Xoá'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Events;