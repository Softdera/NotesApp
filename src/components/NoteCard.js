import React from 'react';
import ReactMarkdown from 'react-markdown';

const NoteCard = ({ note, onEdit, onDelete }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5>{note.title}</h5>
      {note.category && (
        <span className="badge bg-info text-dark mb-2">{note.category}</span>
      )}
          <div className="card-text">
          <ReactMarkdown>
            {note.content}
          </ReactMarkdown>
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
);



export default NoteCard;
