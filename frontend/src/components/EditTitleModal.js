import React, { useEffect, useRef } from 'react';

const EditTitleModal = ({
  show,
  editedtitleTitle,
  setEditedtitleTitle,
  handleSavetitleTitle,
  handleCloseEditModal,
}) => {

// input ref  
 const titleInputRef = useRef(null);

  useEffect(() => {
    if (show && titleInputRef.current) {
      titleInputRef.current.focus(); 
    }
  }, [show]); 

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      tabIndex="-1"
      aria-labelledby="edittitleModalLabel"
      aria-hidden="true"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="edittitleModalLabel">
              Edit title
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseEditModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="editedtitleTitle" className="form-label">Title</label>
              <input
                ref={titleInputRef}  
                type="text"
                className="form-control"
                id="editedtitleTitle"
                value={editedtitleTitle}
                onChange={(e) => setEditedtitleTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseEditModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSavetitleTitle}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTitleModal;
