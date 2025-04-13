// File: src/components/blocks/NumberedStepsBlock.jsx
// Path: src/components/blocks/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NumberedStepsBlock.module.css';

const NumberedStepsBlock = ({ data, iconSet }) => {
  if (!data || !data.steps || !Array.isArray(data.steps)) {
    return <div className={styles.error}>Numbered steps block data is missing or invalid.</div>;
  }

  return (
    <div className={styles.numberedStepsBlock}>
      {data.title && <h3 className={styles.title}>{data.title}</h3>}
      
      <div className={styles.stepsContainer}>
        {data.steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepTitle}>
                {step.icon && (
                  <FontAwesomeIcon icon={step.icon} className={styles.icon} />
                )}
                <h4>{step.title}</h4>
              </div>
            </div>
            <div className={styles.stepContent}>
              <p>{step.content}</p>
            </div>
          </div>
        ))}
        
        {/* Connecting line */}
        <div className={styles.stepsConnector}></div>
      </div>
    </div>
  );
};

export default NumberedStepsBlock;