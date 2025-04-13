// File: src/components/PlaybookNav.jsx
// Path: src/components/

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlaybookNav.module.css';

const PlaybookNav = ({ pages, currentPageIndex, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu when a selection is made or user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuElement = document.getElementById('mobileNavMenu');
      if (menuElement && !menuElement.contains(event.target) && 
          !event.target.classList.contains(styles.mobileMenuToggle)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close menu when page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPageIndex]);
  
  if (!pages || pages.length === 0) {
    return null;
  }
  
  const currentPage = pages[currentPageIndex];
  
  return (
    <div className={styles.navContainer}>
      {/* Desktop Sidebar Navigation */}
      <nav className={styles.desktopNav}>
        <ul className={styles.pageList}>
          {pages.map((page, index) => (
            <li key={page.id} className={index === currentPageIndex ? styles.activePage : ''}>
              <button 
                onClick={() => onPageChange(index)}
                aria-current={index === currentPageIndex ? 'page' : undefined}
                className={styles.pageButton}
              >
                <span className={styles.pageNumber}>{index + 1}</span>
                <span className={styles.pageTitle}>{page.title}</span>
                {index === currentPageIndex && (
                  <FontAwesomeIcon icon="circle" className={styles.activeIndicator} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div 
          className={styles.mobileCurrentPage}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <button className={styles.mobileMenuToggle}>
            <span className={styles.mobilePageTitle}>
              {currentPage.title}
            </span>
            <FontAwesomeIcon 
              icon="chevron-down" 
              className={`${styles.chevronIcon} ${isMenuOpen ? styles.rotated : ''}`} 
            />
          </button>
        </div>
        
        {isMenuOpen && (
          <ul id="mobileNavMenu" className={styles.mobileMenu}>
            {pages.map((page, index) => (
              <li key={page.id} className={index === currentPageIndex ? styles.activeMobileItem : ''}>
                <button onClick={() => onPageChange(index)}>
                  <span className={styles.mobileItemNumber}>{index + 1}.</span>
                  <span>{page.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlaybookNav;