import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("footer-section")}>
                    <h3>CÁC ĐƠN VỊ</h3>
                    <ul>
                        <li>Khoa Khoa học Máy tính</li>
                        <li>Khoa Kỹ thuật Máy tính</li>
                        <li>Văn phòng Trường</li>
                        <li>Trung tâm Máy tính và Thực hành</li>
                        <li>Trung tâm Đổi mới Sáng tạo</li>
                        <li>
                            Trung tâm Công nghệ và Giải pháp Chuyển đổi số trong
                            Giáo dục (EdTech)
                        </li>
                        <li>Trung tâm An toàn – An ninh thông tin (BKCS)</li>
                        <li>
                            Trung tâm Nghiên cứu Quốc tế về Định vị sử dụng vệ
                            tinh (NAVIS)
                        </li>
                        <li>
                            Trung tâm Nghiên cứu Quốc tế về Trí tuệ nhân tạo
                            (BK.AI)
                        </li>
                    </ul>
                </div>
                <div className={cx("footer-section")}>
                    <h3>CHƯƠNG TRÌNH ĐÀO TẠO</h3>
                    <ul>
                        <li>Hệ đại học</li>
                        <li>Hệ thạc sĩ</li>
                        <li>Hệ tiến sĩ</li>
                    </ul>
                </div>
                <div className={cx("footer-section")}>
                    <h3>HỆ THỐNG VÀ TÀI NGUYÊN</h3>
                    <ul>
                        <li>Hệ thống Quản lý Đào tạo</li>
                        <li>Hệ thống Quản lý Hợp tác Doanh nghiệp</li>
                        <li>Các mẫu biểu dành cho sinh viên</li>
                    </ul>
                </div>
                <div className={cx("footer-section", "contact")}>
                    <h3>SOICT</h3>
                    <p>
                        <span>📞</span> (+84) 24 3869 2463
                    </p>
                    <p>
                        <span>📧</span> vp@soict.hust.edu.vn
                    </p>
                    <p>
                        P. 505 – Nhà B1 – Đại học Bách khoa Hà Nội <br />
                        Số 1 Đại Cồ Việt – Hai Bà Trưng – Hà Nội
                    </p>
                    <div className={cx("social-icons")}>
                        <a href="#">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#">
                            <i className="fas fa-map-marker-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
