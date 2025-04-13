// File: src/components/SupportFooter.jsx
// Path: src/components/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SupportFooter.module.css';

const SupportFooter = () => {
  return (
    <div className={styles.supportFooter}>
      <div className={styles.supportContent}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon="mug-hot" className={styles.icon} />
        </div>
        
        <div className={styles.supportText}>
          <h3>Support My Work</h3>
          <p>
            If you found this playbook valuable, consider supporting my work. 
            Your contribution helps me create more free resources like this one.
          </p>
          
          <a 
            href="https://ko-fi.com/amitbhalla" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.supportButton}
          >
            <FontAwesomeIcon icon={['fab', 'kofi']} className={styles.kofiIcon} />
            Support on Ko-fi
          </a>
        </div>
      </div>
      
      <div className={styles.moreResources}>
        <h4>Check out more premium playbooks:</h4>
        <div className={styles.resourceLinks}>
          <a href="https://ko-fi.com/amitbhalla" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="book" className={styles.linkIcon} />
            Content Strategy Masterclass
          </a>
          <a href="https://ko-fi.com/amitbhalla" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="chart-line" className={styles.linkIcon} />
            Marketing Analytics Playbook
          </a>
          <a href="https://ko-fi.com/amitbhalla" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="bullhorn" className={styles.linkIcon} />
            B2B Marketing Blueprint
          </a>
        </div>
      </div>
    </div>
  );
};

// Adding the kofi icon to FontAwesome library
// Note: In a real implementation, you'd need to create a custom icon
// since "kofi" isn't part of the standard FontAwesome set
const kofiIcon = {
  prefix: 'fab',
  iconName: 'kofi',
  icon: [
    512, // width
    512, // height
    [], // ligatures
    null, // unicode mask
    "M400 192H32c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h368c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zm-64 96h-64v64h-64v-64h-64v-64h64v-64h64v64h64v64z" // path
  ]
};

try {
  // This will run client-side only
  if (typeof window !== 'undefined') {
    const { library } = require('@fortawesome/fontawesome-svg-core');
    library.add(kofiIcon);
  }
} catch (error) {
  console.error('Error adding Ko-fi icon:', error);
}

export default SupportFooter;