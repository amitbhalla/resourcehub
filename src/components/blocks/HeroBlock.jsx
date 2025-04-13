// File: src/components/blocks/HeroBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './HeroBlock.module.css';

const HeroBlock = ({ data, iconSet }) => {
  if (!data) {
    return <div className={styles.error}>Hero block data is missing.</div>;
  }

  const { title, subtitle, icon, ctaText } = data;

  return (
    <div className={styles.heroBlock}>
      <div className={styles.heroContent}>
        {icon && (
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={icon} className={styles.icon} />
          </div>
        )}
        
        <div className={styles.textContent}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          
          {ctaText && (
            <button 
              className={styles.ctaButton} 
              onClick={() => {
                // Find the next section element that follows the hero block
                const heroBlock = document.querySelector(`.${styles.heroBlock}`);
                if (heroBlock) {
                  const nextSection = heroBlock.nextElementSibling;
                  if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              {ctaText}
              <FontAwesomeIcon icon="arrow-right" className={styles.buttonIcon} />
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.heroBackground}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
      </div>
    </div>
  );
};

export default HeroBlock;