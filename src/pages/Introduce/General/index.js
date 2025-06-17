import React from 'react';
import styles from './General.module.scss';

const General = () => {
  return (
    <div className={styles.generalWrapper}>
      <div className={styles.headerRow}>
        <span className={styles.time}>17/06/2022 8:46:00 AM |</span>
        <span className={styles.contact}>CONTACT</span>
      </div>
      <h2 className={styles.title}>HỌC VIỆN KỸ THUẬT MẬT MÃ</h2>
      <div className={styles.separator}>*******************************</div>
      <div className={styles.info}>
        <div className={styles.address}>
          Địa chỉ: <span> Số 141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội</span>
        </div>
        <div className={styles.phone}>Điện thoại: <span>02438544244</span></div>
        <div className={styles.email}>Email: <span>Support@actvn.edu.vn</span></div>
      </div>
      <div className={styles.mapWrapper}>
        <iframe
          title="Học viện Kỹ thuật Mật mã Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.726964024052!2d105.8009733148836!3d20.99987638601906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb6e2e2c6e7%3A0x6e2e2e2e2e2e2e2e!2zSOG7kyB2aeG7h24gS8O9IFRodeG7sWMgTeG6tXQgTWE!5e0!3m2!1svi!2s!4v1655459200000!5m2!1svi!2s"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default General;
