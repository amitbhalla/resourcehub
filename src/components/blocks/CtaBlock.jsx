// File: src/components/blocks/CtaBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CtaBlock.module.css';

const CtaBlock = ({ data, iconSet }) => {
  if (!data || !data.title || !data.content) {
    return <div className={styles.error}>CTA block data is missing or invalid.</div>;
  }

  const { title, content, buttonText, buttonUrl, icon } = data;

  return (
    <div className={styles.ctaBlock}>
      <div className={styles.ctaContent}>
        {icon && (
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={icon} className={styles.icon} />
          </div>
        )}
        
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{content}</p>
        
        {buttonText && buttonUrl && (
          <a 
            href={buttonUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.ctaButton}
          >
            {buttonText}
            <FontAwesomeIcon icon="external-link-alt" className={styles.buttonIcon} />
          </a>
        )}
      </div>
      
      <div className={styles.ctaBackground}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
      </div>
    </div>
  );
};

export default CtaBlock;