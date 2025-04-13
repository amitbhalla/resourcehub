// File: src/components/blocks/QuoteBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './QuoteBlock.module.css';

const QuoteBlock = ({ data, iconSet }) => {
  if (!data || !data.quote) {
    return <div className={styles.error}>Quote block data is missing or invalid.</div>;
  }

  const { quote, author, title, icon } = data;

  return (
    <div className={styles.quoteBlock}>
      <div className={styles.quoteContent}>
        <div className={styles.quoteIconContainer}>
          <FontAwesomeIcon icon={icon || 'quote-left'} className={styles.quoteIcon} />
        </div>
        
        <blockquote className={styles.quote}>
          {quote}
        </blockquote>
        
        {(author || title) && (
          <div className={styles.attribution}>
            {author && <span className={styles.author}>{author}</span>}
            {title && <span className={styles.title}>{title}</span>}
          </div>
        )}
      </div>
      
      <div className={styles.quoteBackground}>
        <div className={styles.quoteBgIcon}>
          <FontAwesomeIcon icon={icon || 'quote-left'} />
        </div>
      </div>
    </div>
  );
};

export default QuoteBlock;