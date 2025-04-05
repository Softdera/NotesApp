import React, { useState } from 'react';
import { useNotes } from './NotesContext';

const NotesControls = () => {
  const { toggleTheme, darkMode } = useNotes();
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('date-desc');

  // Expose to context or pass down via props as needed...
  // For brevity, we'll attach to window (not recommended in prod)
  window.__search = search;
  window.__sort   = sort;

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="input-group w-75">
        <input
          className="form-control"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>
      <button className="btn btn-outline-secondary" onClick={toggleTheme}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default NotesControls;
