import React from 'react';
import styles from './Notification.module.scss';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const iconMap = {
  success: <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />,
  error: <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 48 }} />,
};

function Notification({ type = 'success', message = '', visible = false, onClose}) {

  if (!visible) return null;
  return (
    <div className={cx('notification-overlay')}>
      <div className={cx('notification-container')}>
        <div className={cx('notification-icon')}>{iconMap[type]}</div>
        <div className={cx('notification-message')}>{message}</div>
       {type === 'error' && <button className={cx('notification-btn')} onClick={onClose}>OK</button>}
      </div>
    </div>
  );
}

export default Notification;
