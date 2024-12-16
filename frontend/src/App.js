import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TitleCard from './components/TitleCard'; 
import AddTitleModal from './components/AddTitleModal'; 
import EditTitleModal from './components/EditTitleModal'; 
import { fetchtitles, createtitle, updatetitle, deletetitle, addSubtask, updateSubtask } from './api'; 

const App = () => {
  const [titles, settitles] = useState([]);
  const [updatedtitleIds, setUpdatedtitleIds] = useState([]);
  const [newtitleTitle, setNewtitleTitle] = useState('');
  const [newtitleOrder, setNewtitleOrder] = useState(1);
  const [newSubtask, setNewSubtask] = useState('');
  const [showAddtitleModal, setShowAddtitleModal] = useState(false);
  const [editingtitleId, setEditingtitleId] = useState(null);
  const [editedtitleTitle, setEditedtitleTitle] = useState('');
  const [showEdittitleModal, setShowEdittitleModal] = useState(false);

  // get the data api.js file call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const titlesData = await fetchtitles();
        settitles(titlesData);
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdittitleTitle = (titleId) => {
    setEditingtitleId(titleId);
    const title = titles.find((title) => title._id === titleId);
    setEditedtitleTitle(title.title); 
    setShowEdittitleModal(true); 
  };

  const handleSavetitleTitle = async () => {
    try {
      const updatedtitle = await updatetitle(editingtitleId, {
        title: editedtitleTitle,
        subtasks: titles.find((title) => title._id === editingtitleId).subtasks,
      });
      settitles(titles.map((title) => (title._id === editingtitleId ? updatedtitle : title)));
      setShowEdittitleModal(false);
      setEditingtitleId(null);
      setEditedtitleTitle('');
    } catch (error) {
      console.error('Error saving title title:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEdittitleModal(false);
    setEditingtitleId(null);
    setEditedtitleTitle('');
  };

  //move for the title update db
  useEffect(() => {
    const synctitles = async () => {
      if (updatedtitleIds.length === 0) return;
      for (const titleId of updatedtitleIds) {
        const title = titles.find((t) => t._id === titleId);
        if (!title) continue;
        try {
          await updatetitle(titleId, { subtasks: title.subtasks });
          console.log(`title ${titleId} subtasks updated successfully.`);
        } catch (error) {
          console.error(`Error updating title ${titleId}:`, error);
        }
      }
      // Clear the updated title list
      setUpdatedtitleIds([]); 
    };
    synctitles();
  }, [updatedtitleIds, titles]);

  // drag and drop
  const onSubtaskDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourcetitleIndex = parseInt(source.droppableId.split('-')[1], 10);
    const destinationtitleIndex = parseInt(destination.droppableId.split('-')[1], 10);

    const sourcetitle = titles[sourcetitleIndex];
    const destinationtitle = titles[destinationtitleIndex];
    const movedSubtask = sourcetitle.subtasks[source.index];

    if (sourcetitleIndex === destinationtitleIndex && source.index === destination.index) return;

    const updatedtitles = [...titles];
    updatedtitles[sourcetitleIndex].subtasks.splice(source.index, 1);
    updatedtitles[destinationtitleIndex].subtasks.splice(destination.index, 0, movedSubtask);

    settitles(updatedtitles);

    const newUpdatedtitleIds = new Set(updatedtitleIds);
    newUpdatedtitleIds.add(sourcetitle._id);
    newUpdatedtitleIds.add(destinationtitle._id);
    setUpdatedtitleIds(Array.from(newUpdatedtitleIds));
  };

  const handleAddtitle = async () => {
    if (!newtitleTitle) return;

    try {
      const newtitle = await createtitle({
        title: newtitleTitle,
        order: newtitleOrder,
        subtasks: [],
      });
      settitles([...titles, newtitle]);
      setNewtitleTitle('');
      setNewtitleOrder(newtitleOrder + 1); 
    } catch (error) {
      console.error('Error adding title:', error);
    }
  };

  const handleDeletetitle = async (titleId) => {
    try {
      await deletetitle(titleId);
      settitles(titles.filter((title) => title._id !== titleId));
    } catch (error) {
      console.error('Error deleting title:', error);
    }
  };

  const handleAddSubtask = async (titleId) => {
    if (!newSubtask) return;

    const updatedtitles = [...titles];
    const title = updatedtitles.find((title) => title._id === titleId);
    title.subtasks.push(newSubtask);
    settitles(updatedtitles);

    try {
      await addSubtask(titleId, title.subtasks);
      setNewSubtask('');
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };

  const handleEditSubtask = (titleId, subtaskIndex) => {
    const title = titles.find((title) => title._id === titleId);
    const subtask = title.subtasks[subtaskIndex];
    setEditingtitleId(`${titleId}-${subtaskIndex}`);
    setEditedtitleTitle(subtask);
  };

  const handleSaveSubtask = async (titleId, subtaskIndex) => {
    const updatedtitles = [...titles];
    updatedtitles.find((title) => title._id === titleId).subtasks[subtaskIndex] = editedtitleTitle;
    settitles(updatedtitles);

    try {
      await updateSubtask(titleId, updatedtitles.find((title) => title._id === titleId).subtasks);
      setEditingtitleId(null);
      setEditedtitleTitle('');
    } catch (error) {
      console.error('Error editing subtask:', error);
    }
  };

  const handleDeleteSubtask = async (titleId, subtaskIndex) => {
    const updatedtitles = [...titles];
    const title = updatedtitles.find((title) => title._id === titleId);
    title.subtasks.splice(subtaskIndex, 1);
    settitles(updatedtitles);

    try {
      await updateSubtask(titleId, title.subtasks);
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"> Todo App</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddtitleModal(true)}>
        Add title
      </button>
{/* modal */}
      <AddTitleModal
        show={showAddtitleModal}
        newtitleTitle={newtitleTitle}
        newtitleOrder={newtitleOrder}
        setNewtitleTitle={setNewtitleTitle}
        setNewtitleOrder={setNewtitleOrder}
        handleAddtitle={handleAddtitle}
        setShowAddtitleModal={setShowAddtitleModal}
      />
{/* edit modal */}
      <EditTitleModal
        show={showEdittitleModal}
        editedtitleTitle={editedtitleTitle}
        setEditedtitleTitle={setEditedtitleTitle}
        handleSavetitleTitle={handleSavetitleTitle}
        handleCloseEditModal={handleCloseEditModal}
      />
{/* cards in title and subtitle */}
      <DragDropContext onDragEnd={onSubtaskDragEnd}>
        <Droppable droppableId="titles" direction="vertical">
          {(provided) => (
            <div
              className="row"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {titles.map((title, titleIndex) => (
                <Draggable key={title._id} draggableId={title._id} index={titleIndex}>
                  {(provided) => (
                    <div
                      className="col-12 col-lg-4 col-md-6 mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TitleCard
                        title={title}          titleIndex={titleIndex}
                        provided={provided}
                        editingtitleId={editingtitleId}
                        editedtitleTitle={editedtitleTitle}
                        setEditingtitleId={setEditingtitleId}
                        setEditedtitleTitle={setEditedtitleTitle}
                        handleEdittitleTitle={handleEdittitleTitle}
                        handleSavetitleTitle={handleSavetitleTitle}
                        handleDeletetitle={handleDeletetitle}
                        handleAddSubtask={handleAddSubtask}
                        handleEditSubtask={handleEditSubtask}
                        handleSaveSubtask={handleSaveSubtask}
                        handleDeleteSubtask={handleDeleteSubtask}
                        newSubtask={newSubtask}
                        setNewSubtask={setNewSubtask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
