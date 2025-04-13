// File: src/components/PlaybookHub.jsx
// Path: src/components/

import React, { useState, useEffect } from 'react';
import PlaybookSelector from './PlaybookSelector';
import PlaybookRenderer from './PlaybookRenderer';
import playbooksIndex from '../data/playbooksIndex.json';
import styles from './PlaybookHub.module.css';

const PlaybookHub = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [playbookStructure, setPlaybookStructure] = useState(null);
  const [playbookContent, setPlaybookContent] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parse URL parameters on initial load
  useEffect(() => {
    const parseUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const playbookParam = searchParams.get('p');
      const pageParam = searchParams.get('c');
      
      let playbookToLoad;
      
      // Check if playbook ID exists in URL
      if (playbookParam) {
        // Handle numeric playbook ID
        if (!isNaN(parseInt(playbookParam, 10))) {
          const index = parseInt(playbookParam, 10) - 1; // Convert to 0-based index
          playbookToLoad = (index >= 0 && index < playbooksIndex.length) 
            ? playbooksIndex[index].slug 
            : playbooksIndex[0]?.slug;
        } 
        // Handle slug-based playbook ID
        else {
          const playbook = playbooksIndex.find(p => p.slug === playbookParam);
          playbookToLoad = playbook ? playbook.slug : playbooksIndex[0]?.slug;
        }
      } 
      // Default to first playbook if no parameter
      else if (playbooksIndex.length > 0) {
        playbookToLoad = playbooksIndex[0].slug;
      }
      
      // Load the selected playbook
      if (playbookToLoad) {
        loadPlaybook(playbookToLoad).then(() => {
          // After playbook is loaded, handle page parameter
          if (pageParam && playbookStructure) {
            let pageIndexToShow = 0;
            
            // Handle numeric page ID
            if (!isNaN(parseInt(pageParam, 10))) {
              const index = parseInt(pageParam, 10) - 1; // Convert to 0-based index
              pageIndexToShow = (index >= 0 && index < playbookStructure.pages.length) 
                ? index 
                : 0;
            } 
            // Handle slug-based page ID
            else {
              const pageIndex = playbookStructure.pages.findIndex(page => page.id === pageParam);
              pageIndexToShow = pageIndex >= 0 ? pageIndex : 0;
            }
            
            setCurrentPageIndex(pageIndexToShow);
          }
        });
      }
    };
    
    parseUrlParams();
  }, []);

  // Update URL when playbook or page changes
  useEffect(() => {
    if (selectedPlaybook && playbookStructure) {
      const currentPage = playbookStructure.pages[currentPageIndex];
      
      // Find playbook index (for numeric parameter)
      const playbookIndex = playbooksIndex.findIndex(p => p.id === selectedPlaybook.id) + 1;
      const pageIndex = currentPageIndex + 1;
      
      // Update URL without reloading page
      const url = new URL(window.location);
      url.searchParams.set('p', playbookIndex.toString());
      url.searchParams.set('c', pageIndex.toString());
      
      window.history.pushState({}, '', url);
    }
  }, [selectedPlaybook, currentPageIndex, playbookStructure]);

  // Load playbook data
  const loadPlaybook = async (playbookSlug) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPageIndex(0); // Reset to first page when changing playbooks
      
      // Find the selected playbook in the index
      const playbook = playbooksIndex.find(p => p.slug === playbookSlug);
      
      if (!playbook) {
        throw new Error(`Playbook with slug "${playbookSlug}" not found`);
      }
      
      setSelectedPlaybook(playbook);
      
      // Load the structure and content JSON files
      const structureModule = await import(`../data/${playbookSlug}.structure.json`);
      const contentModule = await import(`../data/${playbookSlug}.content.json`);
      
      setPlaybookStructure(structureModule.default);
      setPlaybookContent(contentModule.default);
      
      return true;
    } catch (err) {
      console.error('Error loading playbook:', err);
      setError(`Failed to load playbook: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePlaybookChange = (playbookSlug) => {
    loadPlaybook(playbookSlug);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
    // Removed scrolling behavior to prevent jumping to top
  };

  return (
    <div className={styles.playbookHub}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Resource Hub</h1>
          <p>Free playbooks and guides to help you succeed</p>
        </header>
        
        <PlaybookSelector 
          playbooks={playbooksIndex}
          selectedPlaybook={selectedPlaybook}
          onPlaybookChange={handlePlaybookChange}
        />
        
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading playbook...</p>
          </div>
        )}
        
        {error && (
          <div className={styles.errorState}>
            <p>{error}</p>
            <button onClick={() => handlePlaybookChange(playbooksIndex[0].slug)}>
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && selectedPlaybook && playbookStructure && playbookContent && (
          <PlaybookRenderer
            playbook={selectedPlaybook}
            structure={playbookStructure}
            content={playbookContent}
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PlaybookHub;