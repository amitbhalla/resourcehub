// File: src/App.jsx
// Path: src/

import React from 'react';
import PlaybookHub from './components/PlaybookHub';
import './App.css';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add all icons to the library
library.add(fas, fab);

function App() {
  return (
    <div className="app">
      <PlaybookHub />
    </div>
  );
}

export default App;