import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NotesApp from './components/NotesApp';

const App = () => (
  <ThemeProvider>
    <NotesApp />
  </ThemeProvider>
);

export default App;
