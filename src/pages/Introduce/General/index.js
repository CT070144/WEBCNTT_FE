import React from 'react';
import styles from './General.module.scss';

const General = () => {
  return (
    <div className={styles.generalWrapper}>
      <div className={styles.headerRow}>
        <span className={styles.time}>Cập nhật: 27/06/2025 |</span>
        <span className={styles.contact}>LIÊN HỆ</span>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.titleOverlay}>
      <h2 className={styles.title}>HỌC VIỆN KỸ THUẬT MẬT MÃ</h2>
      
        </div>
      </div>
      <img src="https://actvn.edu.vn/Images/Uploadimages/Logo%20HV/0010.jpg" alt="logo" className={styles.logo} />

      {/* Tóm tắt */}
      <div className={styles.summary}>
        <strong>Học viện Kỹ thuật Mật mã</strong> (Academy of Cryptography Techniques - ACT) là trường đại học công lập trực thuộc Ban Cơ yếu Chính phủ, thành lập năm 1976. Học viện là trung tâm đào tạo, nghiên cứu và chuyển giao công nghệ hàng đầu Việt Nam về an toàn thông tin, mật mã, CNTT và điện tử viễn thông.
      </div>

      {/* Sứ mệnh & Tầm nhìn */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}><span role="img" aria-label="target"></span> Sứ mệnh</div>
        <div className={styles.sectionContent}>
          Đào tạo nguồn nhân lực chất lượng cao, đáp ứng yêu cầu bảo mật, an toàn thông tin quốc gia và phát triển kinh tế số. Học viện cung cấp các chương trình đại học, sau đại học và các khóa bồi dưỡng chuyên sâu, góp phần xây dựng và bảo vệ Tổ quốc trong thời đại chuyển đổi số.
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}><span role="img" aria-label="vision"></span> Tầm nhìn</div>
        <div className={styles.sectionContent}>
          Trở thành trung tâm đào tạo, nghiên cứu và chuyển giao công nghệ hàng đầu khu vực về an toàn thông tin, mật mã, công nghệ thông tin và điện tử viễn thông.
        </div>
      </div>

      {/* Lịch sử */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}><span role="img" aria-label="history"></span> Lịch sử phát triển</div>
        <div className={styles.sectionContent}>
          <ul>
            <li><strong>1976</strong>: Thành lập Trung tâm Đào tạo và Nghiên cứu Kỹ thuật Mật mã.</li>
            <li><strong>2001</strong>: Đổi tên thành Học viện Kỹ thuật Mật mã, mở rộng đào tạo đại học, sau đại học.</li>
            <li><strong>2013</strong>: Được phép đào tạo tiến sĩ ngành An toàn thông tin.</li>
            <li><strong>2020</strong>: Được công nhận là cơ sở trọng điểm quốc gia về an toàn thông tin.</li>
          </ul>
        </div>
      </div>

      {/* Chương trình đào tạo */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}><span role="img" aria-label="book"></span> Các ngành/chương trình đào tạo</div>
        <div className={styles.programList}>
          <div className={styles.programCard}><span role="img" aria-label="shield">🛡️</span> An toàn thông tin</div>
          <div className={styles.programCard}><span role="img" aria-label="chip">💻</span> Công nghệ thông tin</div>
          <div className={styles.programCard}><span role="img" aria-label="antenna">📡</span> Kỹ thuật điện tử viễn thông</div>
          <div className={styles.programCard}><span role="img" aria-label="graduate">🎓</span> Thạc sĩ, Tiến sĩ An toàn thông tin</div>
        </div>
      </div>

      {/* Thành tựu */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}><span role="img" aria-label="trophy">🏆</span> Thành tựu nổi bật</div>
        <ul className={styles.achievementList}>
          <li>Được công nhận là cơ sở trọng điểm quốc gia về an toàn thông tin.</li>
          <li>Đào tạo hàng nghìn kỹ sư, chuyên gia, cán bộ cho các cơ quan, doanh nghiệp lớn.</li>
          <li>Đội ngũ sinh viên, giảng viên đạt nhiều giải thưởng quốc tế về an toàn thông tin, CNTT.</li>
          <li>Hợp tác với nhiều trường đại học, tổ chức quốc tế về nghiên cứu và đào tạo.</li>
        </ul>
      </div>

      {/* Thông tin liên hệ */}
      <div className={styles.info}>
        <div className={styles.sectionTitle}><span role="img" aria-label="contact">📞</span> Thông tin liên hệ</div>
        <div className={styles.address}>Địa chỉ: <span>141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội</span></div>
        <div className={styles.phone}>Điện thoại: <span>0243 854 4244</span></div>
        <div className={styles.email}>Email: <span>support@actvn.edu.vn</span></div>
        <div className={styles.website}>Website: <a href="https://actvn.edu.vn" target="_blank" rel="noopener noreferrer">https://actvn.edu.vn</a></div>
      </div>

      {/* Bản đồ */}
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
