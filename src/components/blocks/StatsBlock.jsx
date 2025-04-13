// File: src/components/blocks/StatsBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StatsBlock.module.css';

const StatsBlock = ({ data, iconSet }) => {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return <div className={styles.error}>Stats block data is missing or invalid.</div>;
  }

  return (
    <div className={styles.statsBlock}>
      {data.title && <h3 className={styles.title}>{data.title}</h3>}
      
      <div className={styles.statsGrid}>
        {data.items.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <div className={styles.statValue}>
              {stat.icon && (
                <FontAwesomeIcon icon={stat.icon} className={styles.icon} />
              )}
              <span>{stat.value}</span>
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBlock;