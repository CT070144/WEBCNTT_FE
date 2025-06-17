import React from 'react';
import styles from './Card.module.scss';

const Card = ({ title, content, img, children }) => {
  return (
    <div className={styles.card}>
      {img && (
        <div className={styles.cardImgWrapper}>
          <img src={img} alt={title} className={styles.cardImg} />
        </div>
      )}
      <div className={styles.cardContent}>
        {title && <h2 className={styles.cardTitle}>{title}</h2>}
        {content && <p className={styles.cardText}>{content}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
