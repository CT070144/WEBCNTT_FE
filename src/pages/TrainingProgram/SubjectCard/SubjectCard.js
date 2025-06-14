import React from "react";
import styles from "./SubjectCard.module.scss";

const SubjectCard = ({ color, credits, subjectName }) => {
  return (
    <div className={styles["subject-card"]} style={{ borderLeft: `6px solid ${color}` }}>
      <div className={styles["subject-card__badge"]}>{credits} tín chỉ</div>
      <div className={styles["subject-card__name"]}>{subjectName}</div>
    </div>
  );
};

export default SubjectCard;
