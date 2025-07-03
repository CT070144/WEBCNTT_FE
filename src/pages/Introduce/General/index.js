import React, { useState, useEffect } from 'react';
import styles from './General.module.scss';

const General = () => {
  const [activeSection, setActiveSection] = useState('tong-quan');

  // Xử lý smooth scroll khi click vào menu
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theo dõi scroll để highlight menu item
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'tong-quan',
        'y-nghia-logo',
        'lich-su-phat-trien',
        'cac-nganh-dao-tao',
        'to-chuc',
        'khen-thuong',
        'thong-tin-lien-he'
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'tong-quan', label: 'Tổng quan' },
    { id: 'y-nghia-logo', label: 'Ý nghĩa Logo Học viện' },
    { id: 'lich-su-phat-trien', label: 'Lịch sử phát triển' },
    { id: 'cac-nganh-dao-tao', label: 'Các ngành đào tạo' },
    { id: 'to-chuc', label: 'Tổ chức'},
    { id: 'khen-thuong', label: 'Khen thưởng' },
    { id: 'thong-tin-lien-he', label: 'Thông tin liên hệ' }
  ];

  return (
    <div className={styles.generalWrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerBackground}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.mainTitle}>HỌC VIỆN KỸ THUẬT MẬT MÃ</h1>
              <p className={styles.subtitle}>Academy of Cryptography Techniques - ACT</p>
              <p className={styles.description}>
                Trung tâm đào tạo, nghiên cứu và chuyển giao công nghệ hàng đầu Việt Nam về an toàn thông tin, mật mã, CNTT và điện tử viễn thông
              </p>
            </div>
            <div className={styles.headerLogo}>
              <img 
                src="https://gist.githubusercontent.com/vinhjaxt/fa4208fd6902dd8b2f4d944fa6e7f2af/raw/454f58aeac4fdeb459476eae7128dc6ff57df25f/logo-hvktmm.png" 
                alt="Logo Học viện Kỹ thuật Mật mã" 
                className={styles.logoImage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Thông tin chung</h3>
          </div>
          <nav className={styles.sidebarNav}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Tổng quan */}
          <section id="tong-quan" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              Tổng quan
            </h2>
            <div className={styles.sectionContent}>
              <p>
                <strong>Học viện Kỹ thuật Mật mã</strong> (Academy of Cryptography Techniques - ACT)  là một trường đại học công lập trực thuộc Ban Cơ yếu Chính phủ của Bộ Quốc phòng, được thành lập ngày 17 tháng 2 năm 1995 có chức năng đào tạo cán bộ có trình độ đại học, sau đại học và nghiên cứu khoa học kỹ thuật mật mã của ngành Cơ yếu Việt Nam. Học viện cũng được chính phủ Việt Nam lựa chọn là một trong tám cơ sở trọng điểm đào tạo nhân lực an toàn thông tin Việt Nam theo Đề án đào tạo và phát triển nguồn nhân lực an toàn, an ninh thông tin đến năm 2025
              </p>
              
              <div className={styles.missionVision}>
                <div className={styles.missionCard}>
                  <h3>🎯 Sứ mệnh</h3>
                  <p>Đào tạo nguồn nhân lực chất lượng cao, đáp ứng yêu cầu bảo mật, an toàn thông tin quốc gia và phát triển kinh tế số. Học viện cung cấp các chương trình đại học, sau đại học và các khóa bồi dưỡng chuyên sâu, góp phần xây dựng và bảo vệ Tổ quốc trong thời đại chuyển đổi số.</p>
                </div>
                <div className={styles.visionCard}>
                  <h3>👁️ Tầm nhìn</h3>
                  <p>Trở thành trung tâm đào tạo, nghiên cứu và chuyển giao công nghệ hàng đầu khu vực về an toàn thông tin, mật mã, công nghệ thông tin và điện tử viễn thông.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Ý nghĩa Logo */}
          <section id="y-nghia-logo" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
           
              Ý nghĩa Logo Học viện
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.logoSection}>
                <img 
                  src="https://gist.githubusercontent.com/vinhjaxt/fa4208fd6902dd8b2f4d944fa6e7f2af/raw/454f58aeac4fdeb459476eae7128dc6ff57df25f/logo-hvktmm.png" 
                  alt="Logo Học viện" 
                  className={styles.logoDetail}
                />
                <div className={styles.logoMeaning}>
                  <p>Với ý tưởng là một biểu tượng mang tính truyền thống, tiếp nối, thân thiện, đơn giản và linh hoạt, hình ảnh và màu sắc ấn tượng, dễ nhớ</p>
                  <ul>
                    <li><strong>Hình tròn: </strong>Biểu tượng hình tròn tổng thể của logo mang ý nghĩa về sự hoàn hảo, thuần nhất, không có sự phân biệt hoặc phân chi, không có sự khởi đầu và không có kết thúc. Thể hiện sự đặc trưng vĩnh cửu của thời gian. Biểu tượng còn là biểu trưng của sự vận động, đối chuyeenf, sự bảo hộ, sự sung túc và thành đạt. Bên cạnh đó còn thể hiện sự sáng tạo, mở mang không giới hạn, không đi theo lối mòn, rập khuôn cứng nhắc</li>
                    <li><strong>Biểu tượng chiếc chìa khoá: </strong>Chìa khóa là biểu tượng có nhiều ý nghĩa tổng quát trong đời sống giống như một màu nhiệêm bí ẩn, tượng trưng cho quyền chức, biểu tượng của hạnh phúc, chìa khóa thành công và sự tin tưởng. Đối với logo trường Học Viện Kỹ Thuật Mật Mã chìa khóa mang ý nghĩa của sự bảo mật, an toàn và tin tưởng.</li>
                    <li><strong>Biểu tượng mặt trời: </strong>  biểu tượng của sự sung túc, thịnh vượng, ánh hào quang, mang năng lượng của mặt trời.</li>
                    <li><strong>Biểu tượng cuốn sách: </strong> Cuốn sách đang mở có hướng đi lên hai phía nói lên sự hoạt động (dạy và học)
của nhà trường, sự tiếp thu kiến thức, sự ham học hỏi của học sinh, sinh viên luon mong muốn vươn lên. Cuốn sách mở tạo hình chữ v tượng trưng cho sự chiến thắng và phát triển của học viện.
</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Lịch sử phát triển */}
          <section id="lich-su-phat-trien" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
             
              Lịch sử phát triển
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>1976</div>
                  <div className={styles.timelineContent}>
                    <h4>Thành lập</h4>
                    <p>Thành lập Trung tâm Đào tạo và Nghiên cứu Kỹ thuật Mật mã</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2001</div>
                  <div className={styles.timelineContent}>
                    <h4>Nâng cấp thành Học viện</h4>
                    <p>Đổi tên thành Học viện Kỹ thuật Mật mã, mở rộng đào tạo đại học, sau đại học</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2013</div>
                  <div className={styles.timelineContent}>
                    <h4>Đào tạo Tiến sĩ</h4>
                    <p>Được phép đào tạo tiến sĩ ngành An toàn thông tin</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2020</div>
                  <div className={styles.timelineContent}>
                    <h4>Cơ sở trọng điểm quốc gia</h4>
                    <p>Được công nhận là cơ sở trọng điểm quốc gia về an toàn thông tin</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Các ngành đào tạo */}
          <section id="cac-nganh-dao-tao" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
  
              Các ngành đào tạo
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.programGrid}>
                <div className={styles.programCard}>
                  <div className={styles.programIcon}>🛡️</div>
                  <h3>An toàn thông tin</h3>
                  <p>Đào tạo chuyên sâu về bảo mật hệ thống, mật mã học, phòng chống tấn công mạng</p>
                </div>
                <div className={styles.programCard}>
                  <div className={styles.programIcon}>💻</div>
                  <h3>Công nghệ thông tin</h3>
                  <p>Chương trình đào tạo toàn diện về phát triển phần mềm, hệ thống thông tin</p>
                </div>
                <div className={styles.programCard}>
                  <div className={styles.programIcon}>📡</div>
                  <h3>Kỹ thuật điện tử viễn thông</h3>
                  <p>Đào tạo về hệ thống viễn thông, mạng lưới và công nghệ truyền thông</p>
                </div>
                <div className={styles.programCard}>
                  <div className={styles.programIcon}>🎓</div>
                  <h3>Thạc sĩ, Tiến sĩ</h3>
                  <p>Chương trình sau đại học chuyên sâu về An toàn thông tin và các lĩnh vực liên quan</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tổ chức */}
          <section id="to-chuc" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
            
              Tổ chức
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.organizationGrid}>
                <div className={styles.orgCategory}>
                  <h3> Các phòng ban</h3>
                  <ul>
                    <li>Phòng Đào tạo</li>
                    <li>Phòng Khoa học Công nghệ</li>
                    <li>Phòng Hợp tác Quốc tế</li>
                    <li>Phòng Tổ chức - Hành chính</li>
                    <li>Phòng Tài chính - Kế toán</li>
                    <li>Phòng Cơ sở vật chất</li>
                  </ul>
                </div>
                <div className={styles.orgCategory}>
                  <h3>Các khoa đào tạo</h3>
                  <ul>
                    <li>Khoa An toàn thông tin</li>
                    <li>Khoa Công nghệ thông tin</li>
                    <li>Khoa Điện tử viễn thông</li>
                    <li>Khoa Cơ bản</li>
                    <li>Khoa Sau đại học</li>
                  </ul>
                </div>
                <div className={styles.orgCategory}>
                  <h3> Hệ quản lý học viên</h3>
                  <ul>
                    <li>Hệ Chính quy</li>
                    <li>Hệ Vừa học vừa làm</li>
                    <li>Hệ Liên thông</li>
                    <li>Hệ Sau đại học</li>
                  </ul>
                </div>
              
              </div>
            </div>
          </section>

          {/* Khen thưởng */}
          <section id="khen-thuong" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
             
              Khen thưởng
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.achievements}>
                <div className={styles.achievementItem}>
              
                  <div className={styles.achievementContent}>
                    <h4>Huân chương Lao động</h4>
                    <p>Được Nhà nước trao tặng Huân chương Lao động hạng Nhất, Nhì, Ba cho những đóng góp xuất sắc</p>
                  </div>
                </div>
                <div className={styles.achievementItem}>
                 
                  <div className={styles.achievementContent}>
                    <h4>Bằng khen của Thủ tướng</h4>
                    <p>Nhiều tập thể và cá nhân được Thủ tướng Chính phủ tặng Bằng khen</p>
                  </div>
                </div>
                <div className={styles.achievementItem}>
                 
                  <div className={styles.achievementContent}>
                    <h4>Giải thưởng khoa học</h4>
                    <p>Nhiều công trình nghiên cứu được trao giải thưởng khoa học công nghệ</p>
                  </div>
                </div>
                <div className={styles.achievementItem}>
                 
                  <div className={styles.achievementContent}>
                    <h4>Giải thưởng quốc tế</h4>
                    <p>Sinh viên và giảng viên đạt nhiều giải thưởng trong các cuộc thi quốc tế về an toàn thông tin</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Thông tin liên hệ */}
          <section id="thong-tin-lien-he" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
 
              Thông tin liên hệ
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.contactBlock}>
                <div className={styles.contactItem}>
                  <h4>Địa chỉ</h4>
                  <p>141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội</p>
                </div>
                <div className={styles.contactItem}>
                  <h4>Điện thoại</h4>
                  <p>0243 854 4244</p>
                </div>
                <div className={styles.contactItem}>
                  <h4>Email</h4>
                  <p>support@actvn.edu.vn</p>
                </div>
                <div className={styles.contactItem}>
                  <h4>Website</h4>
                  <a href="https://actvn.edu.vn" target="_blank" rel="noopener noreferrer">
                    https://actvn.edu.vn
                  </a>
                </div>
              </div>
              
              <div className={styles.mapContainer}>
                <iframe
                  title="Học viện Kỹ thuật Mật mã Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.726964024052!2d105.8009733148836!3d20.99987638601906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb6e2e2c6e7%3A0x6e2e2e2e2e2e2e2e!2zSOG7kyB2aeG7h24gS8O9IFRodeG7sWMgTeG6tXQgTWE!5e0!3m2!1svi!2s!4v1655459200000!5m2!1svi!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default General;
