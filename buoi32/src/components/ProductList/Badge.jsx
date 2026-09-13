import React from 'react';
import styles from './ProductList.module.css';

const Badge = ({ type, text }) => {
  const badgeClass = type === 'discount' ? styles.badgeDiscount : styles.badgeOutStock;
  return (
    <div className={`${styles.badge} ${badgeClass}`}>
      {text}
    </div>
  );
};

export default Badge;
