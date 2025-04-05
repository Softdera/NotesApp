import React, { useState, useEffect } from 'react';

const useUndoRedo = (initial) => {
  const [history, setHistory] = useState([initial]);
  const [index, setIndex] = useState(0);

  const value = history[index];

  const setValue = (val) => {
    const newHistory = history.slice(0, index + 1);
    newHistory.push(val);
    setHistory(newHistory);
    setIndex(index + 1);
  };

  const undo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const redo = () => {
    if (index < history.length - 1) setIndex(index + 1);
  };

  return [value, setValue, undo, redo];
};

const NoteForm = ({ onSave, editingNote }) => {
  const [title, setTitle, undoTitle, redoTitle]         = useUndoRedo('');
  const [content, setContent, undoContent, redoContent] = useUndoRedo('');
  const [category, setCategory, undoCategory, redoCategory] = useUndoRedo('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [editingNote]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required.';
    if (!content.trim()) errs.content = 'Content is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const now = new Date().toISOString();
    const note = {
      id: editingNote ? editingNote.id : Date.now(),
      title,
      content,
      category,
      createdAt: editingNote ? editingNote.createdAt : now,
      updatedAt: now
    };
    onSave(note);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h5>{editingNote ? 'Edit Note' : 'Add Note'}</h5>

      <div className="mb-3">
        <div className="d-flex gap-2 mb-1">
          <input
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={undoTitle}>undo</button>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={redoTitle}>redo</button>
        </div>
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <div className="d-flex gap-2 mb-1">
          <textarea
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            placeholder="Content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="d-flex flex-column gap-3 mt-3">
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={undoContent}>undo</button>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={redoContent}>redo</button>
          </div>
        </div>
        {errors.content && <div className="invalid-feedback">{errors.content}</div>}
      </div>

      <div className="mb-3">
        <div className="d-flex gap-2 mb-1">
          <input
            className="form-control"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={undoCategory}>undo</button>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={redoCategory}>redo</button>
        </div>
      </div>
      

      <button className="btn btn-primary">
        {editingNote ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default NoteForm;
