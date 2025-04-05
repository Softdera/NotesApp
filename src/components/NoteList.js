import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NoteCard from './NoteCard';
//import ReactMarkdown from 'react-markdown';


const NoteList = ({ notes, onEdit, onDeleteRequest, setNotes }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            className="note-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {notes.map((note, index) => (
               <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
               {(provided) => (
                 <div
                   ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                 >
               
                 <NoteCard
                   note={note}
                   onEdit={() => onEdit(note)}
                  onDelete={() => onDeleteRequest(note.id)}
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
  );
};

export default NoteList;
