// File: src/components/PageNavigation.jsx
// Path: src/components/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PageNavigation.module.css';

const PageNavigation = ({ 
  pages, 
  currentPageIndex, 
  onPageChange 
}) => {
  if (!pages || pages.length <= 1) {
    return null;
  }

  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;
  
  const handlePrev = (e) => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPageIndex - 1);
    }
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPageIndex + 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentPageIndex + 1) / pages.length) * 100;
  
  return (
    <div className={styles.navigationContainer}>
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progressPercentage}%` }}
        />
        <div className={styles.progressText}>
          {currentPageIndex + 1} of {pages.length}
        </div>
      </div>
      
      <div className={styles.navigationButtons}>
        <button
          className={`${styles.navButton} ${styles.prevButton} ${isFirstPage ? styles.disabled : ''}`}
          onClick={handlePrev}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          <FontAwesomeIcon icon="arrow-left" className={styles.navIcon} />
          <div className={styles.buttonContent}>
            <span className={styles.buttonLabel}>Previous</span>
            {!isFirstPage && (
              <span className={styles.pageTitle}>{pages[currentPageIndex - 1].title}</span>
            )}
          </div>
        </button>
        
        <button
          className={`${styles.navButton} ${styles.nextButton} ${isLastPage ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Next page"
        >
          <div className={styles.buttonContent}>
            <span className={styles.buttonLabel}>Next</span>
            {!isLastPage && (
              <span className={styles.pageTitle}>{pages[currentPageIndex + 1].title}</span>
            )}
          </div>
          <FontAwesomeIcon icon="arrow-right" className={styles.navIcon} />
        </button>
      </div>
      
      {/* Mobile Floating Navigation */}
      <div className={styles.mobileNavigation}>
        <button
          className={`${styles.mobileNavButton} ${isFirstPage ? styles.disabled : ''}`}
          onClick={handlePrev}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>
        
        <div className={styles.mobileProgress}>
          <div 
            className={styles.mobileProgressBar} 
            style={{ width: `${progressPercentage}%` }}
          />
          <span>{currentPageIndex + 1}/{pages.length}</span>
        </div>
        
        <button
          className={`${styles.mobileNavButton} ${isLastPage ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Next page"
        >
          <FontAwesomeIcon icon="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;