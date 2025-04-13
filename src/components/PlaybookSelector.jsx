// File: src/components/PlaybookSelector.jsx
// Path: src/components/

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlaybookSelector.module.css';

const PlaybookSelector = ({ playbooks, selectedPlaybook, onPlaybookChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectPlaybook = (playbookSlug) => {
    onPlaybookChange(playbookSlug);
    setIsOpen(false);
  };

  if (!playbooks || playbooks.length === 0 || !selectedPlaybook) {
    return null;
  }

  return (
    <div className={styles.selectorContainer} ref={dropdownRef}>
      <div className={styles.selectorLabel}>Select a Playbook:</div>
      
      <div 
        className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        role="combobox"
      >
        <div className={styles.selectedOption}>
          <span>{selectedPlaybook.title}</span>
          <FontAwesomeIcon 
            icon="chevron-down" 
            className={`${styles.icon} ${isOpen ? styles.rotated : ''}`} 
          />
        </div>
        
        {isOpen && (
          <ul className={styles.options} role="listbox">
            {playbooks.map((playbook) => (
              <li 
                key={playbook.id} 
                className={`${styles.option} ${playbook.id === selectedPlaybook.id ? styles.active : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlaybook(playbook.slug);
                }}
                role="option"
                aria-selected={playbook.id === selectedPlaybook.id}
              >
                <span className={styles.optionTitle}>{playbook.title}</span>
                <span className={styles.optionDescription}>{playbook.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={styles.selectedInfo}>
        <div className={styles.audience}>
          <FontAwesomeIcon icon="users" className={styles.infoIcon} />
          <span><strong>Audience:</strong> {selectedPlaybook.audience}</span>
        </div>
        <div className={styles.tone}>
          <FontAwesomeIcon icon="comment" className={styles.infoIcon} />
          <span><strong>Tone:</strong> {selectedPlaybook.tone}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaybookSelector;