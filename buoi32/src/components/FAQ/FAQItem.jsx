import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQItem = ({ faq, onSelectFaq }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, question, answer, category, isHot } = faq;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <div className={styles.faqHeader} onClick={toggleOpen}>
        <div className={styles.questionSection}>
          <h3 className={styles.question}>{question}</h3>
          {isHot && <span className={styles.hotBadge}>Hot</span>}
        </div>
        <div className={styles.categoryBadge}>{category}</div>
      </div>
      
      {isOpen && (
        <div className={styles.faqBody}>
          <p className={styles.answer}>{answer}</p>
          <button 
            className={styles.detailBtn}
            onClick={() => onSelectFaq(id)}
          >
            Xem chi tiết
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
