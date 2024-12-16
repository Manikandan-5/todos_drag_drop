import React, { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TitleCard = ({
  title,
  titleIndex,
  provided,
  editingtitleId,
  editedtitleTitle,
  setEditingtitleId,
  setEditedtitleTitle,
  handleEdittitleTitle,
  handleSavetitleTitle,
  handleDeletetitle,
  handleAddSubtask,
  newSubtask,
  setNewSubtask,
  handleEditSubtask,
  handleSaveSubtask,
  handleDeleteSubtask,
}) => {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [editedSubtask, setEditedSubtask] = useState("");  
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState(null); 

  // input ref

  const titleInputRef = useRef(null);  
  const subtaskInputRef = useRef(null);  
  const subtaskEditRefs = useRef([]);  

  useEffect(() => {
    if (editingtitleId === title._id && titleInputRef.current) {
      titleInputRef.current.focus();  
    }
  }, [editingtitleId]);

  useEffect(() => {
    if (subtaskInputRef.current && showSubtaskInput) {
      subtaskInputRef.current.focus();  
    }
  }, [showSubtaskInput]);

  useEffect(() => {
    if (editingSubtaskIndex !== null && subtaskEditRefs.current[editingSubtaskIndex]) {
      subtaskEditRefs.current[editingSubtaskIndex].focus();  
    }
  }, [editingSubtaskIndex]);

  const handleAddSubtaskAndClose = () => {
    if (newSubtask.trim() !== "") {
      handleAddSubtask(title._id, newSubtask); 
      setNewSubtask(''); 
      setShowSubtaskInput(false); 
    }
  };

  const handleCancelSubtaskInput = () => {
    setShowSubtaskInput(false);
    setNewSubtask('');
  };

  const handleEditSubtaskTitle = (subtaskIndex) => {
    setEditingSubtaskIndex(subtaskIndex);
    setEditedSubtask(title.subtasks[subtaskIndex]);
  };

  const handleSaveSubtaskTitle = (subtaskIndex) => {
    handleSaveSubtask(title._id, subtaskIndex, editedSubtask);  
    setEditingSubtaskIndex(null);  
    setEditedSubtask("");  
  };

  return (
    <div
      className="col-12 mb-3"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="card">
        <div className="card-body">
          {/* title edit */}
    
                   
            <div>
              <h5 className="card-title">{title.title}</h5>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleEdittitleTitle(title._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => handleDeletetitle(title._id)}
              >
                Delete Title
              </button>
            </div>
         
          {/* add subtitle */}
          <div className="mt-3">
            {!showSubtaskInput && (
              <button
                className="btn btn-success btn-sm mt-2"
                onClick={() => setShowSubtaskInput(true)}
              >
                Add Subtask
              </button>
            )}

            {showSubtaskInput && (
              <div className="mt-2">
                <input
                  ref={subtaskInputRef}  
                  type="text"
                  className="form-control"
                  placeholder="Enter subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}  
                />
                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={handleAddSubtaskAndClose}  
                >
                  Add Subtask
                </button>
                <button
                  className="btn btn-secondary btn-sm mt-2 ms-2"
                  onClick={handleCancelSubtaskInput} 
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* subtitle list */}
          <Droppable droppableId={`subtasks-${titleIndex}`} direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-3"
              >
                {title.subtasks.map((subtask, subtaskIndex) => (
                  <Draggable
                    key={`${title._id}-subtask-${subtaskIndex}`}
                    draggableId={`${title._id}-subtask-${subtaskIndex}`}
                    index={subtaskIndex}
                  >
                    {(provided) => (
                      <div
                        className="card mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="card-body">
                          {editingSubtaskIndex === subtaskIndex ? (
                            <div>
                              <input
                                ref={(el) => (subtaskEditRefs.current[subtaskIndex] = el)}  
                                type="text"
                                className="form-control"
                                value={editedSubtask}
                                onChange={(e) => setEditedSubtask(e.target.value)}
                              />
                              <button
                                className="btn btn-success btn-sm mt-2"
                                onClick={() => handleSaveSubtaskTitle(subtaskIndex)}
                              >
                                Save Subtask
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p>{subtask}</p>
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEditSubtaskTitle(subtaskIndex)}
                              >
                                Edit Subtask
                              </button>
                              <button
                                className="btn btn-danger btn-sm float-end"
                                onClick={() => handleDeleteSubtask(title._id, subtaskIndex)}
                              >
                                Delete Subtask
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
