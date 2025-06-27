import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TrainingProgram.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// Mock data for training programs
const mockTrainingPrograms = [
  {
    id: 1,
    name: "Trí tuệ nhân tạo",
    code: "7480201",
    duration: "5 năm",
    campus: "Hà Nội",
    description: "Chương trình đào tạo Trí tuệ nhân tạo trang bị cho sinh viên kiến thức chuyên sâu về machine learning, deep learning, xử lý ngôn ngữ tự nhiên và computer vision. Sinh viên được đào tạo để phát triển các ứng dụng AI hiện đại và giải quyết các bài toán thực tế bằng trí tuệ nhân tạo.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBL5mApQQxrYzBx9HUFxtjfw4Odr2vAcnGPQ&s://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Công nghệ Internet vạn vật (IoT)",
    code: "7480202",
    duration: "5 năm",
    campus: "Hà Nội",
    description: "Chương trình đào tạo Công nghệ Internet vạn vật (IoT) cung cấp kiến thức về hệ thống nhúng, cảm biến, mạng không dây và ứng dụng IoT. Sinh viên được trang bị kỹ năng thiết kế và triển khai các giải pháp IoT cho smart city, smart home và các ứng dụng công nghiệp.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nFhHXoSvUdS54b3mCz-a8lIXVX1rPhvK0w&s"
  },
  {
    id: 3,
    name: "Lập trình Android và di động",
    code: "7480203",
    duration: "5 năm",
    campus: "Hà Nội",
    description: "Chương trình đào tạo Lập trình Android và di động chuyên sâu về phát triển ứng dụng di động, UI/UX design, và các công nghệ mobile hiện đại. Sinh viên được đào tạo để tạo ra các ứng dụng mobile chất lượng cao cho Android và các nền tảng di động khác.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIvqW4h7ytm0HwKDQQrPASueJc11sxf_WdrYimGVUK8Knqj9nNi0uIuzXln0haDGkAVFE&usqp=CAU"
  }
];

const TrainingProgram = () => {
  const navigate = useNavigate();

  const handleViewDetails = (programId) => {
    navigate(`/training-program/${programId}`);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("header-overlay")}></div>
        <div className={cx("header-content")}>
          <h1 className={cx("title")}>Chương trình đào tạo</h1>
          <p className={cx("subtitle")}>
            Khám phá các chương trình đào tạo chất lượng cao của Khoa Công nghệ thông tin
          </p>
        </div>
      </div>

      <div className={cx("content")}>
        {mockTrainingPrograms.length === 0 ? (
          <div className={cx("no-data")}> 
            <p>Không có chương trình đào tạo nào</p>
          </div>
        ) : (
          <div className={cx("programs-grid")}>
            {mockTrainingPrograms.map((program) => (
              <div key={program.id} className={cx("program-card")}>
                <div className={cx("program-image")}>
                  <img src={program.image} alt={program.name} />
                  <div className={cx("program-overlay")}>
                    <button 
                      className={cx("view-details-btn")}
                      onClick={() => handleViewDetails(program.id)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
                
                <div className={cx("program-info")}>
                  <h3 className={cx("program-name")}>{program.name}</h3>
                  <div className={cx("program-meta")}>
                    <div className={cx("meta-item")}>
                      <span className={cx("meta-label")}>Mã ngành:</span>
                      <span className={cx("meta-value")}>{program.code}</span>
                    </div>
                    <div className={cx("meta-item")}>
                      <span className={cx("meta-label")}>Thời gian:</span>
                      <span className={cx("meta-value")}>{program.duration}</span>
                    </div>
                    <div className={cx("meta-item")}>
                      <span className={cx("meta-label")}>Cơ sở:</span>
                      <span className={cx("meta-value")}>{program.campus}</span>
                    </div>
                  </div>
                  <p className={cx("program-description")}>
                    {program.description && program.description.length > 150 
                      ? `${program.description.substring(0, 150)}...` 
                      : program.description}
                  </p>
                  <div className={cx("program-footer")}>
                    <button 
                      className={cx("details-btn")}
                      onClick={() => handleViewDetails(program.id)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingProgram;
