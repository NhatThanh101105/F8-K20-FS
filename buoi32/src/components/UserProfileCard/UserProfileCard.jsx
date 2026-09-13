import React from 'react';
import styles from './UserProfileCard.module.css';

const UserProfileCard = ({ avatar, fullName, jobTitle, isOnline, skills }) => {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt={fullName} className={styles.avatar} />
        <span className={`${styles.statusDot} ${isOnline ? styles.online : styles.offline}`}></span>
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{fullName}</h2>
        <p className={styles.job}>{jobTitle}</p>
        <div className={styles.statusText}>
          {isOnline ? (
            <span className={styles.onlineText}>Online</span>
          ) : (
            <span className={styles.offlineText}>Offline</span>
          )}
        </div>
      </div>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <span key={skill} className={styles.skillBadge}>{skill}</span>
        ))}
      </div>
      <button className={styles.contactBtn} onClick={handleContact}>
        Liên hệ
      </button>
    </div>
  );
};

export default UserProfileCard;
