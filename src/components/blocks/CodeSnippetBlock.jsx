// File: src/components/blocks/CodeSnippetBlock.jsx
// Path: src/components/blocks/

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CodeSnippetBlock.module.css';

const CodeSnippetBlock = ({ data, iconSet }) => {
  const [copied, setCopied] = useState(false);
  
  if (!data || !data.code) {
    return <div className={styles.error}>Code snippet block data is missing or invalid.</div>;
  }

  const { title, code, language } = data;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.codeSnippetBlock}>
      {title && <h3 className={styles.title}>{title}</h3>}
      
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <div className={styles.langLabel}>
            {language || 'Text'}
          </div>
          <button 
            className={styles.copyButton} 
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <FontAwesomeIcon icon="check" className={styles.copyIcon} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="copy" className={styles.copyIcon} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <pre className={styles.codeBlock}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippetBlock;