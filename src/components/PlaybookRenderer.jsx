// File: src/components/PlaybookRenderer.jsx
// Path: src/components/

import React, { useState, useEffect } from 'react';
import PlaybookNav from './PlaybookNav';
import PageContent from './PageContent';
import PageNavigation from './PageNavigation';
import SupportFooter from './SupportFooter';
import styles from './PlaybookRenderer.module.css';

const PlaybookRenderer = ({ 
  playbook, 
  structure, 
  content, 
  currentPageIndex, 
  onPageChange 
}) => {
  const [themeStyles, setThemeStyles] = useState({});
  
  useEffect(() => {
    // Apply theming based on playbook colors
    if (playbook && playbook.colors) {
      const primaryRGB = hexToRgb(playbook.colors.primary);
      
      setThemeStyles({
        '--playbook-primary': playbook.colors.primary,
        '--playbook-primary-rgb': primaryRGB ? `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}` : '37, 99, 235',
        '--playbook-primary-dark': playbook.colors.primary === '#2563eb' ? '#1e40af' : shadeColor(playbook.colors.primary, -20),
        '--playbook-secondary': playbook.colors.secondary,
        '--playbook-accent': playbook.colors.accent,
        '--playbook-bg': playbook.colors.background,
      });
    }
  }, [playbook]);

  if (!structure || !structure.pages || structure.pages.length === 0) {
    return <div className={styles.error}>Playbook structure is invalid or empty.</div>;
  }

  const pages = structure.pages;
  const currentPage = pages[currentPageIndex];

  return (
    <div className={styles.playbookRenderer} style={themeStyles}>
      <div className={styles.playbookHeader}>
        <h2 className={styles.playbookTitle}>{playbook.title}</h2>
      </div>
      
      <div className={styles.playbookContent}>
        {/* Sidebar or mobile dropdown navigation */}
        <PlaybookNav
          pages={pages}
          currentPageIndex={currentPageIndex}
          onPageChange={onPageChange}
        />
        
        <div className={styles.pageContainer}>
          <PageContent
            page={currentPage}
            content={content}
            iconSet={playbook.iconSet}
          />
          
          {/* Next/Prev navigation */}
          <PageNavigation 
            pages={pages}
            currentPageIndex={currentPageIndex}
            onPageChange={onPageChange}
          />
          
          {currentPageIndex === pages.length - 1 && (
            <SupportFooter />
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Check if parsing was successful
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  
  return { r, g, b };
}

// Helper function to shade a color (positive percent brightens, negative darkens)
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3), 16);
  let G = parseInt(color.substring(3,5), 16);
  let B = parseInt(color.substring(5,7), 16);

  R = Math.max(0, Math.min(255, R + (R * percent / 100)));
  G = Math.max(0, Math.min(255, G + (G * percent / 100)));
  B = Math.max(0, Math.min(255, B + (B * percent / 100)));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

export default PlaybookRenderer;