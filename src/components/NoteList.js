import React from 'react';
import SortableNote from './SortableNote';

const NoteList = ({ notes, onEdit, onDeleteRequest }) => {
  return (
    <div className="note-list">
      {notes.map(note => (
        <SortableNote
          key={note.id}
          id={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDeleteRequest(note.id)}
        />
      ))}
    </div>
  );
};

export default NoteList;
