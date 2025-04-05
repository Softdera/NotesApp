import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes]       = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('notes'));
      if (Array.isArray(saved)) setNotes(saved);
      const dm = JSON.parse(localStorage.getItem('darkMode'));
      if (typeof dm === 'boolean') setDarkMode(dm);
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addNote = note => setNotes(ns => [...ns, note]);
  const updateNote = updated =>
    setNotes(ns => ns.map(n => (n.id === updated.id ? updated : n)));
  const deleteNote = id => setNotes(ns => ns.filter(n => n.id !== id));
  const toggleTheme = () => setDarkMode(dm => !dm);

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, darkMode, toggleTheme }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook
export const useNotes = () => useContext(NotesContext);
