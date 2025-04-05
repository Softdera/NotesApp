import React, { useState, useEffect } from 'react';
import NoteForm from './NotesForm';
import Modal from './Modal';
import { useTheme } from '../context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import NoteList from './NoteList'; // will now render SortableNote under the hood

const NotesApp = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [deleteId, setDeleteId] = useState(null);

  // history / undo‑redo
  const [history, setHistory] = useState([]);
  const [future, setFuture]   = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const updateWithHistory = (newNotes) => {
    const head = history.slice(0, currentHistoryIndex + 1);
    const newHistory = [...head, newNotes];
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setFuture([]);
    setNotes(newNotes);
  };

  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotes(parsed);
      setHistory([parsed]);
      setCurrentHistoryIndex(0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (editingNote) {
      const updated = notes.map(n => n.id === note.id ? note : n);
      updateWithHistory(updated);
      setEditingNote(null);
    } else {
      updateWithHistory([...notes, note]);
    }
  };

  const deleteNote = () => {
    const updated = notes.filter(n => n.id !== deleteId);
    updateWithHistory(updated);
    setDeleteId(null);
  };

  // handle drag end
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = notes.findIndex(n => n.id === active.id);
    const newIndex = notes.findIndex(n => n.id === over.id);
    const reordered = arrayMove(notes, oldIndex, newIndex);
    updateWithHistory(reordered);
  };

  const filtered = notes
    .filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title-asc')  return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'date-asc')   return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container py-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Notes</h1>
          <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* search + sort */}
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </select>
          </div>
        </div>

        <NoteForm onSave={addOrUpdateNote} editingNote={editingNote} />

        {/* drag & drop context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filtered.map(n => n.id)}
            strategy={verticalListSortingStrategy}
          >
            <NoteList
              notes={filtered}
              onEdit={setEditingNote}
              onDeleteRequest={setDeleteId}
            />
          </SortableContext>
        </DndContext>

        <Modal
          show={deleteId !== null}
          onConfirm={deleteNote}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </div>
  );
};

export default NotesApp;
