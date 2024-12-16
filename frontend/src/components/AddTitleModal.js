import React, { useEffect, useRef } from 'react';

const AddTitleModal = ({
  show,
  newtitleTitle,
  newtitleOrder,
  setNewtitleTitle,
  setNewtitleOrder,
  handleAddtitle,
  setShowAddtitleModal,
}) => {
  // input ref
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (show && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [show]); 

  const handleSave = () => {
    handleAddtitle();

    setShowAddtitleModal(false);
  };

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      id="addtitleModal"
      tabIndex="-1"
      aria-labelledby="addtitleModalLabel"
      aria-hidden="true"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addtitleModalLabel">
              Add New title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowAddtitleModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="titleTitle" className="form-label">title Title</label>
              <input
                ref={titleInputRef}  
                type="text"
                className="form-control"
                id="titleTitle"
                value={newtitleTitle}
                onChange={(e) => setNewtitleTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowAddtitleModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}  
                          >
               <i class="bi bi-check2-circle"></i> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTitleModal;
