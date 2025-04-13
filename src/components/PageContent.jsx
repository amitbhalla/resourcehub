// File: src/components/PageContent.jsx
// Path: src/components/

import React from 'react';
import HeroBlock from './blocks/HeroBlock';
import StatsBlock from './blocks/StatsBlock';
import ChecklistBlock from './blocks/ChecklistBlock';
import NumberedStepsBlock from './blocks/NumberedStepsBlock';
import QuoteBlock from './blocks/QuoteBlock';
import CodeSnippetBlock from './blocks/CodeSnippetBlock';
import CtaBlock from './blocks/CtaBlock';
import styles from './PageContent.module.css';

const PageContent = ({ page, content, iconSet }) => {
  if (!page || !page.blocks || !content || !content.blocks) {
    return <div className={styles.error}>Invalid page or content data.</div>;
  }

  // Render the appropriate block component based on block type
  const renderBlock = (block) => {
    const blockContent = content.blocks[block.id];
    
    if (!blockContent) {
      return (
        <div key={block.id} className={styles.missingBlock}>
          Content for block "{block.id}" not found.
        </div>
      );
    }
    
    switch (block.type) {
      case 'hero':
        return <HeroBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'stats':
        return <StatsBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'checklist':
        return <ChecklistBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'numberedSteps':
        return <NumberedStepsBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'quote':
        return <QuoteBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'codeSnippet':
        return <CodeSnippetBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      case 'cta':
        return <CtaBlock key={block.id} data={blockContent} iconSet={iconSet} />;
      
      default:
        return (
          <div key={block.id} className={styles.unknownBlock}>
            Unknown block type: {block.type}
          </div>
        );
    }
  };

  return (
    <div className={styles.pageContent}>
      <h2 className={styles.pageTitle}>{page.title}</h2>
      
      <div className={styles.blocksContainer}>
        {page.blocks.map(renderBlock)}
      </div>
    </div>
  );
};

export default PageContent;