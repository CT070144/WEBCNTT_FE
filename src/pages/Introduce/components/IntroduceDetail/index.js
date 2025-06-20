import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./IntroduceDetail.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function EmployeeDetail() {

    const { slug } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        const fetchEm = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const response = await fetch(`${api}/api/nhanvien/${slug}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();

                console.log(data);
                setEmployeeData(data);
                
                setError(null);
    
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setError(error.message);
                setEmployeeData(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEm();
    }, [slug, api]);

    if (isLoading) {
        return (
            <div className={cx('loading-container')}>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cx('error-container')}>
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!employeeData) {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-container')}>
                {employeeData.avaFileCode && (
                    <img className={cx('avatar')} src={`${api}${employeeData.avaFileCode}`} alt={employeeData.tenNhanVien} />
                )}
            </div>
            <div className={cx('info-container')}>
                <h1 className={cx('name')}>{employeeData.tenNhanVien}</h1>
                <p className={cx('info-item')}><strong>Mã nhân viên:</strong> {employeeData.maNhanVien}</p>
                <p className={cx('info-item')}><strong>Ngày sinh:</strong> {new Date(employeeData.ngaySinh).toLocaleDateString('vi-VN')}</p>
                <p className={cx('info-item')}><strong>Giới tính:</strong> {employeeData.gioiTinh}</p>
                <p className={cx('info-item')}><strong>Điện thoại:</strong> {employeeData.dienThoai}</p>
                <p className={cx('info-item')}><strong>Địa chỉ:</strong> {employeeData.diaChiHienNay}</p>
                {employeeData.phongBan && <p className={cx('info-item')}><strong>Phòng ban:</strong> {employeeData.phongBan.tenPhongBan}</p>}
                <p className={cx('info-item')}><strong>Chức vụ:</strong> {employeeData.chucVu}</p>
                {employeeData.monGiangDayChinh && <p className={cx('info-item')}><strong>Môn giảng dạy chính:</strong> {employeeData.monGiangDayChinh.tenMonHoc}</p>}
                {employeeData.cacMonLienQuan && employeeData.cacMonLienQuan.length > 0 && (
                     <div className={cx('info-item')}>
                        <strong>Các môn liên quan:</strong>
                        <ul className={cx('related-subjects')}>
                            {employeeData.cacMonLienQuan.map(mon => <li key={mon.monHocID}>{mon.tenMonHoc}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeDetail;