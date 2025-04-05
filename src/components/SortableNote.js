import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ReactMarkdown from 'react-markdown';

const SortableNote = ({ id, note, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: 'none',
    marginBottom: 8
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card">
        <div className="card-body">
          <h5>{note.title}</h5>
          {note.category && (
            <span className="badge bg-info text-dark mb-2">{note.category}</span>
          )}
          <div className="card-text">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
          <p className="text-muted small mb-2">
            Created: {new Date(note.createdAt).toLocaleString()}<br/>
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </p>
          <button className="btn btn-sm btn-outline-primary me-2" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortableNote;
