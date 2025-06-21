import React from "react";
import styles from "./SubjectCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SubjectCard = ({ subject }) => {
  return (
    <div className={cx("subject-card")}>
      <div className={cx("subject-card-badge")}>{subject.soTinChi} tín chỉ</div>
      <h4 className={cx("subject-card-name")}>{subject.tenMon}</h4>
      <p className={cx("subject-card-description")}>{subject.moTa}</p>
    </div>
  );
};

export default SubjectCard;
