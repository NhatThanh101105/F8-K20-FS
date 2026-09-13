import React from 'react';
import styles from './FAQ.module.css';
import FAQItem from './FAQItem';

const FAQ = ({ faqData }) => {
  const handleSelectFaq = (id) => {
    alert(`Bạn đang xem chi tiết câu hỏi có ID: ${id}`);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.sectionTitle}>Câu hỏi thường gặp (FAQ)</h2>
      {faqData.length > 0 ? (
        <div className={styles.accordion}>
          {faqData.map(faq => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              onSelectFaq={handleSelectFaq} 
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>Không có câu hỏi nào.</p>
      )}
    </div>
  );
};

export default FAQ;
