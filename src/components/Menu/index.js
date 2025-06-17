import React, { useState } from 'react';
import styles from './Menu.module.scss';
import { useLocation } from 'react-router-dom';

const Menu = ({ items = [] }) => {
  const location = useLocation();

  function isActive(item) {
    // Nếu item có children, kiểm tra children
    if (item.children && item.children.length > 0) {
      return item.children.some(isActive);
    }
    // Nếu item có key là slug, so sánh với pathname
    if (item.to) {
      return location.pathname === item.to;
    }
    // Nếu label là Link, thử lấy props to
    if (item.label && item.label.props && item.label.props.to) {
      return location.pathname === item.label.props.to;
    }
    return false;
  }

  function MenuItem({ item }) {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item);
    return (
      <div
        className={
          styles.menuItem +
          (active ? ' ' + styles.active : '')
        }
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className={styles.menuLabel}>
          {item.label}
          
        </div>
        {hasChildren && open && (
          <div className={styles.dropdown}>
            {item.children.map((child) => (
              <MenuItem key={child.key} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className={styles.menu}>
      {items.map((item) => (
        <MenuItem key={item.key} item={item} />
      ))}
    </nav>
  );
};

export default Menu;
