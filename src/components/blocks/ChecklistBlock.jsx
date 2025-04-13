// File: src/components/blocks/ChecklistBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ChecklistBlock.module.css';

const ChecklistBlock = ({ data, iconSet }) => {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return <div className={styles.error}>Checklist block data is missing or invalid.</div>;
  }

  return (
    <div className={styles.checklistBlock}>
      {data.title && <h3 className={styles.title}>{data.title}</h3>}
      
      <ul className={styles.checklist}>
        {data.items.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.iconContainer}>
              {item.icon ? (
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              ) : (
                <FontAwesomeIcon icon="check" className={styles.icon} />
              )}
            </div>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistBlock;