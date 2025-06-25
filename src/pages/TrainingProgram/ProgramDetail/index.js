import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProgramDetail.module.scss";
import classNames from "classnames/bind";
import SubjectCard from "../SubjectCard/SubjectCard";


const cx = classNames.bind(styles);

// Mock data for training programs
const mockTrainingPrograms = {
  1: {
    id: 1,
    name: "Trí tuệ nhân tạo",
    code: "7480201",
    duration: "5 năm",
    campus: "Hà Nội",
    admissionPeriod: "Tháng 9",
    overview: "Chương trình đào tạo Trí tuệ nhân tạo trang bị cho sinh viên kiến thức chuyên sâu về machine learning, deep learning, xử lý ngôn ngữ tự nhiên và computer vision. Sinh viên được đào tạo để phát triển các ứng dụng AI hiện đại và giải quyết các bài toán thực tế bằng trí tuệ nhân tạo.",
    outcomes: [
      {
        id: 1,
        title: "Kiến thức AI chuyên sâu",
        content: "Nắm vững kiến thức về machine learning, deep learning, xử lý ngôn ngữ tự nhiên và computer vision."
      },
      {
        id: 2,
        title: "Kỹ năng phát triển AI",
        content: "Có khả năng thiết kế, phát triển và triển khai các ứng dụng AI và hệ thống thông minh."
      },
      {
        id: 3,
        title: "Tư duy phân tích dữ liệu",
        content: "Phát triển khả năng phân tích dữ liệu lớn và đưa ra quyết định dựa trên AI."
      }
    ],
    careers: [
      "Kỹ sư AI/ML",
      "Data Scientist",
      "NLP Engineer",
      "Computer Vision Engineer",
      "AI Research Engineer",
      "Machine Learning Engineer"
    ],
    tuition: {
      domestic: "18.000.000 VNĐ/năm",
    
      notes: "Học phí bao gồm chi phí thực hành và tài nguyên AI chuyên dụng."
    },
    requirements: [
      "Tốt nghiệp THPT hoặc tương đương",
      "Điểm tổ hợp môn Toán, Lý, Hóa hoặc Toán, Lý, Anh từ 19 điểm trở lên",
      "Có tư duy logic và khả năng toán học tốt",
      "Có đam mê với lĩnh vực trí tuệ nhân tạo"
    ],
    materials: [
      "Sách giáo khoa AI/ML chuyên ngành",
      "Phần mềm và framework AI (TensorFlow, PyTorch)",
      "GPU cluster cho deep learning",
      "Tài liệu hướng dẫn thực hành AI"
    ]
  },
  2: {
    id: 2,
    name: "Công nghệ Internet vạn vật (IoT)",
    code: "7480202",
    duration: "5 năm",
    campus: "Hà Nội",
    admissionPeriod: "Tháng 9",
    overview: "Chương trình đào tạo Công nghệ Internet vạn vật (IoT) cung cấp kiến thức về hệ thống nhúng, cảm biến, mạng không dây và ứng dụng IoT. Sinh viên được trang bị kỹ năng thiết kế và triển khai các giải pháp IoT cho smart city, smart home và các ứng dụng công nghiệp.",
    outcomes: [
      {
        id: 1,
        title: "Kiến thức IoT toàn diện",
        content: "Nắm vững kiến thức về hệ thống nhúng, cảm biến, mạng không dây và công nghệ IoT."
      },
      {
        id: 2,
        title: "Kỹ năng thiết kế IoT",
        content: "Có khả năng thiết kế, triển khai và quản lý các hệ thống IoT và smart devices."
      },
      {
        id: 3,
        title: "Phát triển giải pháp thông minh",
        content: "Có khả năng phát triển các giải pháp IoT cho smart city, smart home và công nghiệp."
      }
    ],
    careers: [
      "IoT Engineer",
      "Embedded Systems Engineer",
      "IoT Solution Architect",
      "Smart City Engineer",
      "IoT Security Specialist",
      "IoT Project Manager"
    ],
    tuition: {
      domestic: "16.000.000 VNĐ/năm",
    
      notes: "Học phí bao gồm chi phí thực hành và thiết bị IoT chuyên dụng."
    },
    requirements: [
      "Tốt nghiệp THPT hoặc tương đương",
      "Điểm tổ hợp môn Toán, Lý, Hóa hoặc Toán, Lý, Anh từ 18 điểm trở lên",
      "Có sức khỏe tốt để theo học",
      "Có đam mê với lĩnh vực IoT và công nghệ thông minh"
    ],
    materials: [
      "Sách giáo khoa IoT và embedded systems",
      "Thiết bị IoT và cảm biến",
      "Phần mềm phát triển IoT",
      "Tài liệu hướng dẫn thực hành IoT"
    ]
  },
  3: {
    id: 3,
    name: "Lập trình Android và di động",
    code: "7480203",
    duration: "5 năm",
    campus: "Hà Nội",
    admissionPeriod: "Tháng 9",
    overview: "Chương trình đào tạo Lập trình Android và di động chuyên sâu về phát triển ứng dụng di động, UI/UX design, và các công nghệ mobile hiện đại. Sinh viên được đào tạo để tạo ra các ứng dụng mobile chất lượng cao cho Android và các nền tảng di động khác.",
    outcomes: [
      {
        id: 1,
        title: "Kiến thức mobile development",
        content: "Nắm vững kiến thức về phát triển ứng dụng di động, UI/UX design và mobile technologies."
      },
      {
        id: 2,
        title: "Kỹ năng phát triển app",
        content: "Có khả năng thiết kế, phát triển và triển khai ứng dụng mobile chất lượng cao."
      },
      {
        id: 3,
        title: "Tư duy sáng tạo UI/UX",
        content: "Phát triển khả năng thiết kế giao diện người dùng đẹp và trải nghiệm người dùng tốt."
      }
    ],
    careers: [
      "Android Developer",
      "Mobile App Developer",
      "UI/UX Designer",
      "Mobile App Architect",
      "Mobile Testing Engineer",
      "Mobile Project Manager"
    ],
    tuition: {
      domestic: "17.000.000 VNĐ/năm",
      notes: "Học phí bao gồm chi phí thực hành và thiết bị mobile development."
    },
    requirements: [
      "Tốt nghiệp THPT hoặc tương đương",
      "Điểm tổ hợp môn Toán, Lý, Hóa hoặc Toán, Lý, Anh từ 18 điểm trở lên",
      "Có sức khỏe tốt để theo học",
      "Có đam mê với lĩnh vực phát triển ứng dụng di động"
    ],
    materials: [
      "Sách giáo khoa mobile development",
      "Thiết bị Android và iOS cho testing",
      "Phần mềm phát triển mobile (Android Studio, Xcode)",
      "Tài liệu hướng dẫn thực hành mobile development"
    ]
  }
};

// Mock data for curriculum structure - AI Program
const aiStructure = [
  {
    "hocKy": 1,
    "monHoc": [
      {
        "tenMon": "Toán học rời rạc",
        "maMon": "MATH101",
        "soTinChi": 3,
        "moTa": "Cung cấp kiến thức cơ bản về logic, tập hợp, quan hệ và đồ thị"
      },
      {
        "tenMon": "Lập trình Python cơ bản",
        "maMon": "CS101",
        "soTinChi": 4,
        "moTa": "Giới thiệu về lập trình Python cho AI"
      },
      {
        "tenMon": "Tiếng Anh chuyên ngành CNTT",
        "maMon": "ENG101",
        "soTinChi": 2,
        "moTa": "Rèn luyện kỹ năng tiếng Anh chuyên ngành"
      }
    ]
  },
  {
    "hocKy": 2,
    "monHoc": [
      {
        "tenMon": "Cấu trúc dữ liệu và giải thuật",
        "maMon": "CS201",
        "soTinChi": 4,
        "moTa": "Nghiên cứu các cấu trúc dữ liệu và thuật toán cơ bản"
      },
      {
        "tenMon": "Thống kê và xác suất",
        "maMon": "MATH202",
        "soTinChi": 3,
        "moTa": "Kiến thức thống kê cơ bản cho machine learning"
      },
      {
        "tenMon": "Lập trình hướng đối tượng",
        "maMon": "CS203",
        "soTinChi": 3,
        "moTa": "Phát triển ứng dụng theo mô hình hướng đối tượng"
      }
    ]
  },
  {
    "hocKy": 3,
    "monHoc": [
      {
        "tenMon": "Machine Learning cơ bản",
        "maMon": "AI301",
        "soTinChi": 4,
        "moTa": "Giới thiệu về machine learning và các thuật toán cơ bản"
      },
      {
        "tenMon": "Xử lý dữ liệu với Python",
        "maMon": "AI302",
        "soTinChi": 3,
        "moTa": "Kỹ thuật xử lý và phân tích dữ liệu"
      },
      {
        "tenMon": "Cơ sở dữ liệu",
        "maMon": "CS303",
        "soTinChi": 3,
        "moTa": "Thiết kế và quản lý cơ sở dữ liệu"
      }
    ]
  },
  {
    "hocKy": 4,
    "monHoc": [
      {
        "tenMon": "Deep Learning",
        "maMon": "AI401",
        "soTinChi": 4,
        "moTa": "Mạng nơ-ron sâu và ứng dụng"
      },
      {
        "tenMon": "Xử lý ngôn ngữ tự nhiên",
        "maMon": "AI402",
        "soTinChi": 3,
        "moTa": "Kỹ thuật xử lý và hiểu ngôn ngữ tự nhiên"
      },
      {
        "tenMon": "Computer Vision",
        "maMon": "AI403",
        "soTinChi": 3,
        "moTa": "Thị giác máy tính và nhận dạng hình ảnh"
      }
    ]
  },
  {
    "hocKy": 5,
    "monHoc": [
      {
        "tenMon": "AI Ethics và Responsible AI",
        "maMon": "AI501",
        "soTinChi": 2,
        "moTa": "Đạo đức AI và phát triển AI có trách nhiệm"
      },
      {
        "tenMon": "AI trong thực tế",
        "maMon": "AI502",
        "soTinChi": 4,
        "moTa": "Ứng dụng AI trong các lĩnh vực thực tế"
      },
      {
        "tenMon": "Big Data Analytics",
        "maMon": "AI503",
        "soTinChi": 3,
        "moTa": "Phân tích dữ liệu lớn với AI"
      }
    ]
  },
  {
    "hocKy": 6,
    "monHoc": [
      {
        "tenMon": "Đồ án AI chuyên ngành",
        "maMon": "AI601",
        "soTinChi": 6,
        "moTa": "Thực hiện dự án AI hoàn chỉnh"
      },
      {
        "tenMon": "Thực tập tốt nghiệp",
        "maMon": "AI602",
        "soTinChi": 4,
        "moTa": "Thực tập tại doanh nghiệp AI"
      },
      {
        "tenMon": "Khóa luận tốt nghiệp",
        "maMon": "AI603",
        "soTinChi": 8,
        "moTa": "Nghiên cứu và báo cáo tốt nghiệp AI"
      }
    ]
  }
];

// Mock data for curriculum structure - IoT Program
const iotStructure = [
  {
    "hocKy": 1,
    "monHoc": [
      {
        "tenMon": "Toán học rời rạc",
        "maMon": "MATH101",
        "soTinChi": 3,
        "moTa": "Cung cấp kiến thức cơ bản về logic, tập hợp, quan hệ và đồ thị"
      },
      {
        "tenMon": "Lập trình C cơ bản",
        "maMon": "CS101",
        "soTinChi": 4,
        "moTa": "Giới thiệu về lập trình C cho embedded systems"
      },
      {
        "tenMon": "Vật lý điện tử",
        "maMon": "PHY101",
        "soTinChi": 3,
        "moTa": "Kiến thức cơ bản về điện tử và mạch điện"
      }
    ]
  },
  {
    "hocKy": 2,
    "monHoc": [
      {
        "tenMon": "Vi xử lý và vi điều khiển",
        "maMon": "IOT201",
        "soTinChi": 4,
        "moTa": "Lập trình vi xử lý và vi điều khiển"
      },
      {
        "tenMon": "Cảm biến và thiết bị đo",
        "maMon": "IOT202",
        "soTinChi": 3,
        "moTa": "Nguyên lý hoạt động và ứng dụng của cảm biến"
      },
      {
        "tenMon": "Mạng máy tính cơ bản",
        "maMon": "CS203",
        "soTinChi": 3,
        "moTa": "Kiến thức về mạng và truyền thông dữ liệu"
      }
    ]
  },
  {
    "hocKy": 3,
    "monHoc": [
      {
        "tenMon": "Hệ thống nhúng",
        "maMon": "IOT301",
        "soTinChi": 4,
        "moTa": "Thiết kế và lập trình hệ thống nhúng"
      },
      {
        "tenMon": "Mạng không dây",
        "maMon": "IOT302",
        "soTinChi": 3,
        "moTa": "Công nghệ mạng không dây cho IoT"
      },
      {
        "tenMon": "Lập trình Python cho IoT",
        "maMon": "IOT303",
        "soTinChi": 3,
        "moTa": "Sử dụng Python trong phát triển IoT"
      }
    ]
  },
  {
    "hocKy": 4,
    "monHoc": [
      {
        "tenMon": "IoT Protocols",
        "maMon": "IOT401",
        "soTinChi": 3,
        "moTa": "Các giao thức truyền thông IoT"
      },
      {
        "tenMon": "Cloud Computing cho IoT",
        "maMon": "IOT402",
        "soTinChi": 3,
        "moTa": "Điện toán đám mây và IoT"
      },
      {
        "tenMon": "IoT Security",
        "maMon": "IOT403",
        "soTinChi": 3,
        "moTa": "Bảo mật cho hệ thống IoT"
      }
    ]
  },
  {
    "hocKy": 5,
    "monHoc": [
      {
        "tenMon": "Smart City Solutions",
        "maMon": "IOT501",
        "soTinChi": 3,
        "moTa": "Giải pháp IoT cho thành phố thông minh"
      },
      {
        "tenMon": "Industrial IoT",
        "maMon": "IOT502",
        "soTinChi": 3,
        "moTa": "IoT trong công nghiệp 4.0"
      },
      {
        "tenMon": "IoT Data Analytics",
        "maMon": "IOT503",
        "soTinChi": 3,
        "moTa": "Phân tích dữ liệu IoT"
      }
    ]
  },
  {
    "hocKy": 6,
    "monHoc": [
      {
        "tenMon": "Đồ án IoT chuyên ngành",
        "maMon": "IOT601",
        "soTinChi": 6,
        "moTa": "Thực hiện dự án IoT hoàn chỉnh"
      },
      {
        "tenMon": "Thực tập tốt nghiệp",
        "maMon": "IOT602",
        "soTinChi": 4,
        "moTa": "Thực tập tại doanh nghiệp IoT"
      },
      {
        "tenMon": "Khóa luận tốt nghiệp",
        "maMon": "IOT603",
        "soTinChi": 8,
        "moTa": "Nghiên cứu và báo cáo tốt nghiệp IoT"
      }
    ]
  }
];

// Mock data for curriculum structure - Mobile Development Program
const mobileStructure = [
  {
    "hocKy": 1,
    "monHoc": [
      {
        "tenMon": "Toán học rời rạc",
        "maMon": "MATH101",
        "soTinChi": 3,
        "moTa": "Cung cấp kiến thức cơ bản về logic, tập hợp, quan hệ và đồ thị"
      },
      {
        "tenMon": "Lập trình Java cơ bản",
        "maMon": "CS101",
        "soTinChi": 4,
        "moTa": "Giới thiệu về lập trình Java cho Android"
      },
      {
        "tenMon": "Thiết kế đồ họa cơ bản",
        "maMon": "DES101",
        "soTinChi": 3,
        "moTa": "Nguyên lý thiết kế đồ họa và UI cơ bản"
      }
    ]
  },
  {
    "hocKy": 2,
    "monHoc": [
      {
        "tenMon": "Lập trình Android cơ bản",
        "maMon": "MOB201",
        "soTinChi": 4,
        "moTa": "Phát triển ứng dụng Android cơ bản"
      },
      {
        "tenMon": "UI/UX Design",
        "maMon": "MOB202",
        "soTinChi": 3,
        "moTa": "Thiết kế giao diện và trải nghiệm người dùng"
      },
      {
        "tenMon": "Cơ sở dữ liệu",
        "maMon": "CS203",
        "soTinChi": 3,
        "moTa": "Thiết kế và quản lý cơ sở dữ liệu"
      }
    ]
  },
  {
    "hocKy": 3,
    "monHoc": [
      {
        "tenMon": "Lập trình Android nâng cao",
        "maMon": "MOB301",
        "soTinChi": 4,
        "moTa": "Phát triển ứng dụng Android nâng cao"
      },
      {
        "tenMon": "Lập trình iOS",
        "maMon": "MOB302",
        "soTinChi": 3,
        "moTa": "Phát triển ứng dụng iOS với Swift"
      },
      {
        "tenMon": "Mobile App Testing",
        "maMon": "MOB303",
        "soTinChi": 3,
        "moTa": "Kiểm thử ứng dụng di động"
      }
    ]
  },
  {
    "hocKy": 4,
    "monHoc": [
      {
        "tenMon": "Cross-platform Development",
        "maMon": "MOB401",
        "soTinChi": 3,
        "moTa": "Phát triển ứng dụng đa nền tảng"
      },
      {
        "tenMon": "Mobile Backend Development",
        "maMon": "MOB402",
        "soTinChi": 3,
        "moTa": "Phát triển backend cho ứng dụng di động"
      },
      {
        "tenMon": "Mobile Security",
        "maMon": "MOB403",
        "soTinChi": 3,
        "moTa": "Bảo mật ứng dụng di động"
      }
    ]
  },
  {
    "hocKy": 5,
    "monHoc": [
      {
        "tenMon": "Mobile Game Development",
        "maMon": "MOB501",
        "soTinChi": 3,
        "moTa": "Phát triển game di động"
      },
      {
        "tenMon": "Mobile App Monetization",
        "maMon": "MOB502",
        "soTinChi": 2,
        "moTa": "Chiến lược kiếm tiền từ ứng dụng di động"
      },
      {
        "tenMon": "Mobile App Performance",
        "maMon": "MOB503",
        "soTinChi": 3,
        "moTa": "Tối ưu hiệu suất ứng dụng di động"
      }
    ]
  },
  {
    "hocKy": 6,
    "monHoc": [
      {
        "tenMon": "Đồ án Mobile chuyên ngành",
        "maMon": "MOB601",
        "soTinChi": 6,
        "moTa": "Thực hiện dự án ứng dụng di động hoàn chỉnh"
      },
      {
        "tenMon": "Thực tập tốt nghiệp",
        "maMon": "MOB602",
        "soTinChi": 4,
        "moTa": "Thực tập tại doanh nghiệp mobile development"
      },
      {
        "tenMon": "Khóa luận tốt nghiệp",
        "maMon": "MOB603",
        "soTinChi": 8,
        "moTa": "Nghiên cứu và báo cáo tốt nghiệp mobile development"
      }
    ]
  }
];

const admissionProcess = [
  {
    step: 1,
    title: "Đăng ký xét tuyển",
    description: "Thí sinh đăng ký xét tuyển trực tuyến hoặc tại trường",
    time: "Tháng 3 - Tháng 7"
  },
  {
    step: 2,
    title: "Nộp hồ sơ",
    description: "Nộp đầy đủ hồ sơ xét tuyển theo quy định",
    time: "Tháng 7 - Tháng 8"
  },
  {
    step: 3,
    title: "Xét tuyển",
    description: "Hội đồng xét tuyển xem xét và đánh giá hồ sơ",
    time: "Tháng 8"
  },
  {
    step: 4,
    title: "Công bố kết quả",
    description: "Công bố danh sách trúng tuyển",
    time: "Cuối tháng 8"
  },
  {
    step: 5,
    title: "Nhập học",
    description: "Thí sinh trúng tuyển làm thủ tục nhập học và đóng học phí",
    time: "Đầu tháng 9"
  }
];

const TrainingProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  
  // Get program data from mock data
  const program = mockTrainingPrograms[id];

  // Get curriculum structure based on program
  const getCurriculumStructure = () => {
    switch (parseInt(id)) {
      case 1:
        return aiStructure;
      case 2:
        return iotStructure;
      case 3:
        return mobileStructure;
      default:
        return aiStructure;
    }
  };

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

  if (!program) {
    return (
      <div className={cx("container")}>
        <div className={cx("no-data")}>
          <p>Không tìm thấy thông tin chương trình đào tạo</p>
          <button onClick={() => navigate('/training-program')} className={cx("back-btn")}>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("container")}>
      <div className={cx("breadcrumbs")}>
        <div className={cx("breadcrumbs-container")}>
          <div className={cx("breadcrumbs-item")}>
            <h1>Chương trình đào tạo - {program.name}</h1>
          </div>
        </div>
      </div>
      
      <div className={cx("content")}>
        <div className={cx("card-top")}>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Mã ngành</div>
            <div className={cx("card-top-item-content")}>{program.code}</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Thời gian</div>
            <div className={cx("card-top-item-content")}>{program.duration}</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Kỳ nhập học</div>
            <div className={cx("card-top-item-content")}>{program.admissionPeriod}</div>
          </div>
          <div className={cx("card-top-item")}>
            <div className={cx("card-top-item-title")}>Cơ sở</div>
            <div className={cx("card-top-item-content")}>{program.campus}</div>
          </div>
        </div>
        
        <div className={cx("wrapper")}>
          <div className={cx("side-bar")}>
            <ul className={cx("menu-list")}>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className={cx("menu-item", {
                      active: activeSection === item.id,
                    })}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={cx("main-content")}>
            <section id="overview" className={cx("section")}>
              <h2 className={cx("section-title")}>Tổng quan</h2>
              <p className={cx("section-content")}>{program.overview}</p>
            </section>

            <section id="outcomes" className={cx("section")}>
              <h2 className={cx("section-title")}>Chuẩn đầu ra</h2>
              <div className={cx("outcomes-list")}>
                {program.outcomes && program.outcomes.length > 0 ? (
                  program.outcomes.map((outcome) => (
                    <div key={outcome.id} className={cx("outcome-item")}>
                      <h3 className={cx("outcome-title")}>{outcome.title}</h3>
                      <p className={cx("outcome-content")}>{outcome.content}</p>
                    </div>
                  ))
                ) : (
                  <p className={cx("no-data-text")}>Chưa có thông tin về chuẩn đầu ra</p>
                )}
              </div>
            </section>

            <section id="structure" className={cx("section")}>
              <h2 className={cx("section-title")}>Cấu trúc chương trình</h2>
              <div className={cx("structure-container")}>
                {getCurriculumStructure().map((semester) => (
                  <div key={semester.hocKy} className={cx("semester")}>
                    <h3 className={cx("semester-title")}>Học kỳ {semester.hocKy}</h3>
                    <div className={cx("subjects-grid")}>
                      {semester.monHoc.map((subject, index) => (
                        <SubjectCard key={index} subject={subject} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="careers" className={cx("section")}>
              <h2 className={cx("section-title")}>Nghề nghiệp</h2>
              <div className={cx("careers-grid")}>
                {program.careers && program.careers.length > 0 ? (
                  program.careers.map((career, index) => (
                    <div key={index} className={cx("career-item")}>
                      <span className={cx("career-icon")}>💼</span>
                      <span className={cx("career-text")}>{career}</span>
                    </div>
                  ))
                ) : (
                  <p className={cx("no-data-text")}>Chưa có thông tin về nghề nghiệp</p>
                )}
              </div>
            </section>

            <section id="tuition" className={cx("section")}>
              <h2 className={cx("section-title")}>Học phí</h2>
              <div className={cx("tuition-info")}>
                <div className={cx("tuition-item")}>
                  <h3>Sinh viên Việt Nam</h3>
                  <p className={cx("tuition-amount")}>{program.tuition.domestic}</p>
                </div>
                <div className={cx("tuition-item")}>
                  <h3>Sinh viên quốc tế</h3>
                  <p className={cx("tuition-amount")}>{program.tuition.international}</p>
                </div>
                {program.tuition.notes && (
                  <div className={cx("tuition-notes")}>
                    <p>{program.tuition.notes}</p>
                  </div>
                )}
              </div>
            </section>

            <section id="requirements" className={cx("section")}>
              <h2 className={cx("section-title")}>Điều kiện tuyển sinh</h2>
              <div className={cx("requirements-list")}>
                {program.requirements && program.requirements.length > 0 ? (
                  program.requirements.map((requirement, index) => (
                    <div key={index} className={cx("requirement-item")}>
                      <span className={cx("requirement-icon")}>✓</span>
                      <span className={cx("requirement-text")}>{requirement}</span>
                    </div>
                  ))
                ) : (
                  <p className={cx("no-data-text")}>Chưa có thông tin về điều kiện tuyển sinh</p>
                )}
              </div>
            </section>

            <section id="process" className={cx("section")}>
              <h2 className={cx("section-title")}>Quy trình nhập học</h2>
              <div className={cx("process-timeline")}>
                {admissionProcess.map((step) => (
                  <div key={step.step} className={cx("process-step")}>
                    <div className={cx("step-number")}>{step.step}</div>
                    <div className={cx("step-content")}>
                      <h3 className={cx("step-title")}>{step.title}</h3>
                      <p className={cx("step-description")}>{step.description}</p>
                      <span className={cx("step-time")}>{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="materials" className={cx("section")}>
              <h2 className={cx("section-title")}>Tài liệu đào tạo</h2>
              <div className={cx("materials-list")}>
                {program.materials && program.materials.length > 0 ? (
                  program.materials.map((material, index) => (
                    <div key={index} className={cx("material-item")}>
                      <span className={cx("material-icon")}>
                        📑
                      </span>
                      <span className={cx("material-text")}>{material}</span>
                    </div>
                  ))
                ) : (
                  <p className={cx("no-data-text")}>Chưa có thông tin về tài liệu đào tạo</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgram;
