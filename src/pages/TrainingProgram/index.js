import React, { useState } from 'react';
import styles from './TrainingProgram.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TrainingProgram = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'outcomes', label: 'Chuẩn đầu ra' },
    { id: 'structure', label: 'Cấu trúc chương trình' },
    { id: 'careers', label: 'Nghề nghiệp' },
    { id: 'tuition', label: 'Học phí' },
    { id: 'requirements', label: 'Điều kiện tuyển sinh' },
    { id: 'process', label: 'Quy trình nhập học' },
    { id: 'materials', label: 'Tài liệu đào tạo' }
  ];

  return (
    <div>

    </div>
  );
};

export default TrainingProgram;
