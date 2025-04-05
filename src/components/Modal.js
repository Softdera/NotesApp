import React from 'react';

const Modal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <p>Delete this note?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
            <button className="btn btn-secondary" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
