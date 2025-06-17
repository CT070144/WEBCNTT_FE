import React, { useState } from "react";
import styles from "./TrainingProgram.module.scss";
import classNames from "classnames/bind";
import SubjectCard from "./SubjectCard/SubjectCard";

const cx = classNames.bind(styles);


const content = [
    {
        id: "overview",
        title: "Tổng quan",
        content: "Chương trình đào tạo ngành Trí tuệ nhân tạo (TTNT) của Học viện Công nghệ Bưu chính Viễn thông được thiết kế nhằm đào tạo nhân lực trình độ Đại học (Kỹ sư) ngành Trí tuệ nhân tạo trong bối cảnh hội nhập quốc tế và chuyển đổi số. Sinh viên tốt nghiệp được trang bị các kỹ năng nghề nghiệp trong tương lai về Trí tuệ nhân tạo và Khoa học máy tính bao gồm cả chuyên môn, phẩm chất chính trị, đạo đức nghề nghiệp, và kỹ năng mềm. Nội dung đào tạo kết hợp giữa lý thuyết và thực tiễn, nhằm giúp học viên ứng dụng hiệu quả các kiến thức về Trí tuệ nhân tạo vào giải quyết các bài toán thực tế. Đồng thời, chương trình đào tạo ngành Trí tuệ nhân tạo nằm trong chiến lược phát triển của Học viện với triết lý giáo dục “Tri thức – Sáng tạo – Đạo đức - Trách nhiệm” hướng tới mục tiêu đào tạo nguồn nhân lực “vừa có tài vừa có đức” để đóng góp cho sự phát triển chung của đất nước và nhân loại."
    },
    {
        id: "outcomes",
        title: "Chuẩn đầu ra",
        content: [
            {
                id: "lo1",
                title: "LO1: Nhận diện được vấn đề và các giải pháp có thể để giải quyết vấn đề liên quan đến trí tuệ nhân tạo.",
                content: "PI 1.1: Hiểu bài toán và các yêu cầu PI 1.2: Đề xuất và phân tích giải pháp tính toán giải quyết bài toán PI 1.3: Xác định giải pháp phù hợp dựa trên các nguyên lý tính toán để giải quyết bài toán."
            }
        ]
    }
]

const structure = [
    {
      "hocKy": 1,
      "monHoc": [
        { "ten": "Giải tích 1", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Pháp luật đại cương", "tinChi": 2, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Đại số", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Lập trình Python cơ bản", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" }
      ]
    },
    {
      "hocKy": 2,
      "monHoc": [
        { "ten": "Tiếng Anh (Course 1)", "tinChi": 4, "loai": "Giáo dục chuyên nghiệp", "mau": "#D8B4FE" },
        { "ten": "Vật lý ứng dụng", "tinChi": 4, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Giải tích 2", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Xác suất thống kê", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Phương pháp lập trình cơ bản", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Cơ sở dữ liệu", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" }
      ]
    },
    {
      "hocKy": 3,
      "monHoc": [
        { "ten": "Tiếng Anh (Course 2)", "tinChi": 4, "loai": "Giáo dục chuyên nghiệp", "mau": "#D8B4FE" },
        { "ten": "Toán rời rạc 1", "tinChi": 3, "loai": "Cơ sở ngành", "mau": "#FEC7D2" },
        { "ten": "Khoa học dữ liệu cơ bản", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Điện tử số", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Cấu trúc dữ liệu và giải thuật", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Nền tảng phát triển trí tuệ nhân tạo", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" }
      ]
    },
    {
      "hocKy": 4,
      "monHoc": [
        { "ten": "Triết học Mác Lênin", "tinChi": 3, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Tiếng Anh (Course 3)", "tinChi": 4, "loai": "Giáo dục chuyên nghiệp", "mau": "#D8B4FE" },
        { "ten": "Kiến trúc máy tính", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Lý thuyết đồ thị", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Trí tuệ nhân tạo cơ bản", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Lập trình hướng đối tượng", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" }
      ]
    },
    {
      "hocKy": 5,
      "monHoc": [
        { "ten": "Kinh tế chính trị Mác Lênin", "tinChi": 2, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Tiếng Anh (Course 3 Plus)", "tinChi": 2, "loai": "Giáo dục chuyên nghiệp", "mau": "#D8B4FE" },
        { "ten": "Xử lý ảnh", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Lập trình web", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Mạng máy tính", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Nhập môn Học máy", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Xử lý ngôn ngữ tự nhiên", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" }
      ]
    },
    {
      "hocKy": 6,
      "monHoc": [
        { "ten": "Chủ nghĩa xã hội khoa học", "tinChi": 2, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Nhập môn công nghệ phần mềm", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Đạo đức và chính sách TTNT", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Nhập môn Học sâu", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Học phần tự chọn", "tinChi": 3, "loai": "Bổ trợ ngành", "mau": "#FEC7D2" },
        { "ten": "Thực tập cơ sở", "tinChi": 4, "loai": "Thực tập", "mau": "#1D4ED8" },
        { "ten": "Pháp luật luận NCKH", "tinChi": 2, "loai": "Cơ sở ngành", "mau": "#FEC7D2" }
      ]
    },
    {
      "hocKy": 7,
      "monHoc": [
        { "ten": "Tư tưởng Hồ Chí Minh", "tinChi": 2, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Mô hình ngôn ngữ lớn", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Thị giác máy tính", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Trí tuệ nhân tạo cho an toàn bảo mật TT", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Công cụ triển khai và vận hành ứng dụng TTNT", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Học phần tự chọn", "tinChi": 3, "loai": "Bổ trợ ngành", "mau": "#FEC7D2" }
      ]
    },
    {
      "hocKy": 8,
      "monHoc": [
        { "ten": "Lịch sử Đảng Cộng sản VN", "tinChi": 2, "loai": "Bắt buộc chung", "mau": "#98A8F8" },
        { "ten": "Học tăng cường và ứng dụng", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Truy xuất thông tin", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Phát triển ứng dụng TTNT", "tinChi": 3, "loai": "Chuyên ngành", "mau": "#FEC84B" },
        { "ten": "Học phần tự chọn", "tinChi": 6, "loai": "Bổ trợ ngành", "mau": "#FEC7D2" }
      ]
    },
    {
      "hocKy": 9,
      "monHoc": [
        { "ten": "Thực tập và tốt nghiệp", "tinChi": 12, "loai": "Thực tập", "mau": "#1D4ED8" }
      ]
    }
  ]
  

const TrainingProgram = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Tổng quan" },
    { id: "outcomes", label: "Chuẩn đầu ra" },
    { id: "structure", label: "Cấu trúc chương trình" },
    { id: "careers", label: "Nghề nghiệp" },
    { id: "tuition", label: "Học phí" },
    { id: "requirements", label: "Điều kiện tuyển sinh" },
    { id: "process", label: "Quy trình nhập học" },
    { id: "materials", label: "Tài liệu đào tạo" },
  ];

  return (
    <div className={cx("container")}>
      <div className={cx("breadcrumbs")}>
        <div className={cx("breadcrumbs-container")}>
          <div className={cx("breadcrumbs-item")}>
            <h1>Chương trình đào tạo - Nghành Công nghệ thông tin </h1>
           
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("card-top")}>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Mã nghành</div>
            <div className={cx("card-top-item-content")}>7480107</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Thời gian</div>
            <div className={cx("card-top-item-content")}>5 năm</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Kỳ nhập học</div>
            <div className={cx("card-top-item-content")}>Mùa thu</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Cơ sở</div>
            <div className={cx("card-top-item-content")}>Hà Nội</div>
          </div>
        </div>
        <div className={cx("wrapper")}>
          <div className={cx("side-bar")}>
            <ul className={cx("menu-list")}>
              {menuItems.map((item) => (
                <a href={`#${item.id}`}>
                    <li
                  key={item.id}
                  
                  className={cx("menu-item", {
                    active: activeSection === item.id,
                  })}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </li>
                </a>
              ))}
            </ul>
          </div>
          <div className={cx("main-content")}>
            <section id="overview" >
              <h1 className={cx("title")}>Tổng quan</h1>
              <p className={cx("content")}>
                Chương trình đào tạo ngành Trí tuệ nhân tạo (TTNT) của Học viện
                Kỹ thuật mật mã được thiết kế nhằm đào tạo nhân lực trình độ Đại
                học (Kỹ sư) ngành Trí tuệ nhân tạo trong bối cảnh hội nhập quốc
                tế và chuyển đổi số. Sinh viên tốt nghiệp được trang bị các kỹ
                năng nghề nghiệp trong tương lai về Trí tuệ nhân tạo và Khoa học
                máy tính bao gồm cả chuyên môn, phẩm chất chính trị, đạo đức
                nghề nghiệp, và kỹ năng mềm. Nội dung đào tạo kết hợp giữa lý
                thuyết và thực tiễn, nhằm giúp học viên ứng dụng hiệu quả các
                kiến thức về Trí tuệ nhân tạo vào giải quyết các bài toán thực
                tế. Đồng thời, chương trình đào tạo ngành Trí tuệ nhân tạo nằm
                trong chiến lược phát triển của Học viện với triết lý giáo dục
                “Tri thức – Sáng tạo – Đạo đức - Trách nhiệm” hướng tới mục tiêu
                đào tạo nguồn nhân lực “vừa có tài vừa có đức” để đóng góp cho
                sự phát triển chung của đất nước và nhân loại.
              </p>
            </section>
            <section id="outcomes">
              <h1 className={cx("title")}>Chuẩn đầu ra</h1>

              <h3 className={cx("sub-title")}>
                LO1: Nhận diện được vấn đề và các giải pháp có thể để giải quyết
                vấn đề liên quan đến trí tuệ nhân tạo.
              </h3>
<pre className={cx("special-content")}>
{`PI 1.1: Hiểu bài toán và các yêu cầu 
PI 1.2: Đề xuất và phân tích giải pháp tính toán giải quyết bài toán 
PI 1.3: Xác định giải pháp phù hợp dựa trên các nguyên lý tính toán để giải quyết bài toán.
`}
</pre>
<h3 className={cx("sub-title")}>
LO2: Giao tiếp hiệu quả trong nhiều bối cảnh chuyên nghiệp khác nhau.
</h3>
<pre className={cx("special-content")}>
{`PI 2.1: Xây dựng được các dạng tài liệu kỹ thuật và phi kỹ thuật khác nhau phù hợp với ngữ cảnh và qui định.
PI 2.2: Chuẩn bị và trình bày các bài thuyết trình thành thạo.
PI 2.3: Giao tiếp và thực hiện hiệu quả các hoạt động chuyên môn bằng ngoại ngữ.
`}
</pre>
<h3 className={cx("sub-title")}>
LO3: Nhận thức được trách nhiệm nghề nghiệp và đưa ra những đánh giá sáng suốt dựa trên các nguyên tắc pháp lý và đạo đức.
</h3>
<pre className={cx("special-content")}>
{`PI 3.1: Thể hiện được hiểu biết các lý thuyết và các quy định thực thi đạo đức cơ bản quan trọng trong hoạt động 
Trí tuệ nhân tạo; Nhận thức được các kết quả về đạo đức của các quyết định và các hành động trong lĩnh vực Trí tuệ 
nhân tạo; Đảm bảo tuân thủ các quy định pháp lý trong thiết kế và cài đặt hệ thống.
PI 3.2: Cho thấy được tính minh bạch trong các công việc liên quan đến báo cáo lỗi, các hạn chế hoặc các xung đột 
lợi ích trong công việc về Trí tuệ nhân tạo; Chịu trách nhiệm cho các quyệt định và các kết quả của các dự án hoặc
các nhiệm vụ.
`}
</pre>
<h3 className={cx("sub-title")}>
LO4: Hoạt động hiệu quả với tư cách là thành viên hoặc lãnh đạo một nhóm tham gia vào các hoạt động phù hợp với chuyên môn trí tuệ nhân tạo.
</h3>
<pre className={cx("special-content")}>
{`PI 4.1: Phối hợp, chia sẻ công việc trong một nhóm.
PI 4.2: Hoàn thành nhiệm vụ trong các vai trò khác nhau của nhóm.
`}
</pre>
<h3 className={cx("sub-title")}>
LO5: Thực hiện được một công đoạn của quy trình phát triển một dự án về Trí tuệ nhân tạo.
</h3>
<pre className={cx("special-content")}>
{`PI 5.1: Xác định được mong muốn và yêu cầu của người dùng trong việc phát triển mô hình Trí tuệ nhân tạo và/hoặc 
phần mềm ứng dụng Trí tuệ nhân tạo.
PI 5.2: Có thể tham gia vào ít nhất một trong các công đoạn: phân tích yêu cầu, thiết kế, cài đặt, kiểm thử và 
triển khai mô hình Trí tuệ nhân tạo và/hoặc phần mềm ứng dụng Trí tuệ nhân tạo.
PI 5.3: Có thể viết tài liệu dự án phát triển mô hình Trí tuệ nhân tạo và/hoặc phần mềm ứng dụng Trí tuệ nhân tạo.
`}
</pre>

            </section>
            <section id="structure">
              <h1 className={cx("title")}>Cấu trúc chương trình các chuyên nghành (Tiến trình học tập theo học chế tín chỉ)</h1>
              <span className={cx("major")}>Công nghệ thông tin</span>

              <div className={cx("structure-content")}>
              
                    {
                        structure.map((item, index) => (
                            <div className={cx("structure-content-item")}>
                                <span className={cx("structure-content-item-semester")}>
                                    Học kỳ {item.hocKy}
                                </span>

                                <div className={cx("structure-content-item-content")}>
                                    {
                                        item.monHoc.map((subject, index) => (
                                            <SubjectCard color={subject.mau} credits={subject.tinChi} subjectName={subject.ten} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
              

              </div>
            </section>

            <section id="careers">
                <h1 className={cx("title")}>Nghề nghiệp</h1>
                <pre className={cx("content")}>
{`
Sinh viên sau khi tốt nghiệp ngành Trí tuệ nhân tạo và nắm vững các kĩ năng từ cơ bản đến chuyên ngành 
thì có thể làm việc ở một trong các vị trí việc làm sau:

- Kỹ sư xử lý ngôn ngữ tự nhiên (NLP Engineer): Phát triển và triển khai các mô hình, thuật toán, 
kỹ thuật về NLP đặc biệt là các mô hình ngôn ngữ lớn (LLMs) và Mô hình tạo sinh (GenAI), huấn luyện và tinh chỉnh các mô hình ngôn ngữ.

- Kỹ sư Thị giác máy tính (CV Engineer): Phát triển và triển khai các mô hình học máy/học sâu để xử lý 
hình ảnh và video cho các bài toán thị giác máy tính. Phân tích và tiền xử lý dữ liệu hình ảnh/video, cải thiện chất lượng đầu vào cho các mô hình. Tích hợp các thuật toán thị giác máy tính vào các ứng dụng thực tế.

- Chuyên viên phân tích dữ liệu (Data Analyst): phân tích các dữ liệu lớn của văn bản hoặc hình ảnh để 
đưa ra các thống kê hữu ích cho doanh nghiệp, trực quan hóa dữ liệu để từ đó đưa ra các quyết định quan trọng mang tính chiến lược, xây dựng các mô hình dự đoán dựa trên nguồn dữ liệu thực tế.

- Chuyên gia nghiên cứu về Trí tuệ nhân tạo (AI Research Scientist): làm việc trong bộ phận Research and 
Development (R&D) của các tổ chức để nghiên cứu về các mô hình, thuật toán, công nghệ mới nhằm giải quyết bài toán thực tiễn. Đây là vị trí yêu cầu nắm vững các kiến thức nền tảng của học máy, học sâu.

- Chuyên viên phát triển phần mềm Trí tuệ nhân tạo (AI Software Developer): tích hợp các mô hình Trí tuệ 
nhân tạo vào các ứng dụng, nâng cao hiệu quả hoạt động của các hệ thống phần mềm và phần cứng. Đây là vị trí yêu cầu nắm vững các công đoạn xây dựng một mô hình hoàn chỉnh từ chuẩn bị dữ liệu, xây dựng mô hình, triển khai, sử dụng thành thạo các công cụ và nền tảng phát triển ứng dụng Trí tuệ nhân tạo.
`}
                </pre>
            </section>

            <section id="tuition">
                <h1 className={cx("title")}>Học phí</h1>
                <div className={cx("content")}>448.000 VNĐ/tín chỉ</div>
            </section>
            <section id="requirements">
                <h1 className={cx("title")}>Điều kiện tuyển sinh</h1>
                
                <div className={cx("content")}>
                Là người đã tốt nghiệp THPT hoặc tương đương, tham dự và trúng tuyển (đạt các yêu cầu đầu vào) trong kỳ tuyển sinh đại học hệ chính quy với Tổ hợp xét tuyển: Toán, Lý, Hóa (A00 – khối A); hoặc Toán, Lý, Anh văn (A01 – khối A1) hoặc các phương án xét tuyển riêng của Học viện Công nghệ Bưu chính Viễn thông
                </div>
            </section>
            <section id="process" className={cx("process")}>
                <h1 className={cx("title")}>Quy trình nhập học</h1>
                <div className={cx("process-content")}>
                    <div className={cx("process-content-item")}>
                        <img src="https://daotao.ptit.edu.vn/wp-content/images/contract.png" alt="process-1" className={cx("process-content-item-image")} />
                         <span className={cx("process-content-item-title")}>
                            1. Chọn chương trình
                         </span>
                    </div>
                    <div className={cx("process-content-item")}>
                        <img src="https://daotao.ptit.edu.vn/wp-content/images/accept.png" alt="process-1" className={cx("process-content-item-image")} />
                         <span className={cx("process-content-item-title")}>
                            2.Kiểm tra điều kiện
                         </span>
                    </div>
                    <div className={cx("process-content-item")}>
                        <img src="https://daotao.ptit.edu.vn/wp-content/images/preparation.png" alt="process-1" className={cx("process-content-item-image")} />
                         <span className={cx("process-content-item-title")}>
                            3. Chuẩn bị hồ sơ
                         </span>
                    </div>
                    <div className={cx("process-content-item")}>
                        <img src="https://daotao.ptit.edu.vn/wp-content/images/admission.png" alt="process-1" className={cx("process-content-item-image")} />
                         <span className={cx("process-content-item-title")}>
                           4. Nộp hồ sơ
                         </span>
                    </div>

                </div>
                <a className={cx("button")}>Chi tiết tại đây</a>
            </section>
            <section id="materials">
              <h1 className={cx("title")}>Tài liệu đào tạo</h1>
              <div className={cx("materials-content")}>
                <a href="https://actvneduvn-my.sharepoint.com/personal/vinhlk_actvn_edu_vn/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fvinhlk%5Factvn%5Fedu%5Fvn%2FDocuments%2FC%C3%B4ng%20vi%E1%BB%87c%2FTin%20t%E1%BB%A9c%20Website%2FChuong%20trinh%20dao%20tao%20dai%20hoc%2FCh%C6%B0%C6%A1ng%20tr%C3%ACnh%20%C4%91%C3%A0o%20t%E1%BA%A1o%20ng%C3%A0nh%20C%C3%B4ng%20ngh%E1%BB%87%20th%C3%B4ng%20tin%2Epdf&parent=%2Fpersonal%2Fvinhlk%5Factvn%5Fedu%5Fvn%2FDocuments%2FC%C3%B4ng%20vi%E1%BB%87c%2FTin%20t%E1%BB%A9c%20Website%2FChuong%20trinh%20dao%20tao%20dai%20hoc&ga=1" target="_blank" className={cx("doccument-link")}>10QD_Chuan dau ra</a>

                <a href="https://actvneduvn-my.sharepoint.com/personal/vinhlk_actvn_edu_vn/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fvinhlk%5Factvn%5Fedu%5Fvn%2FDocuments%2FC%C3%B4ng%20vi%E1%BB%87c%2FTin%20t%E1%BB%A9c%20Website%2FChuong%20trinh%20dao%20tao%20dai%20hoc%2FCh%C6%B0%C6%A1ng%20tr%C3%ACnh%20%C4%91%C3%A0o%20t%E1%BA%A1o%20ng%C3%A0nh%20C%C3%B4ng%20ngh%E1%BB%87%20th%C3%B4ng%20tin%2Epdf&parent=%2Fpersonal%2Fvinhlk%5Factvn%5Fedu%5Fvn%2FDocuments%2FC%C3%B4ng%20vi%E1%BB%87c%2FTin%20t%E1%BB%A9c%20Website%2FChuong%20trinh%20dao%20tao%20dai%20hoc&ga=1" target="_blank" className={cx("doccument-link")}>14QD_Chương trình đào tạo</a>
              </div>
            </section>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TrainingProgram;
