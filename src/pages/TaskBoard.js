import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../styles/taskboard.css'; // CSS dosyasını ayrı tutuyoruz

const initialColumns = {
  "UX-UI": {
    name: "UX-UI",
    items: [
      { id: "1", title: "Create design system for Forsico", date: "August 12", progress: 50, comments: 8, members: 4, urgent: false },
      { id: "2", title: "Update documentation", date: "August 15", progress: 30, comments: 2, members: 3, urgent: false }
    ]
  },
  "Software": {
    name: "Software",
    items: [
      { id: "3", title: "Implement authentication", date: "August 20", progress: 70, comments: 5, members: 6, urgent: true },
      { id: "4", title: "Fix login bugs", date: "August 26", progress: 80, comments: 1, members: 3, urgent: true }
    ]
  },
  "Marketing": {
    name: "Marketing",
    items: [
      { id: "5", title: "Add localization", date: "August 28", progress: 50, comments: 4, members: 4, urgent: false }
    ]
  },
  "Done": {
    name: "Done",
    items: []
  }
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems }
    });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        <div className="task-board-container">
          <div className="task-board-header">
            <h1>Forsico</h1>
            <div className="task-board-nav">
              <button>Board</button>
              <button>List</button>
              <button>Calendar</button>
            </div>
          </div>
          <div className="task-board-grid">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className="column" key={columnId}>
                  <h2 className="column-title">{column.name}</h2>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="task-list"
                      >
                        {column.items.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`task-card ${task.urgent ? 'urgent' : ''}`}
                              >
                                <TaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
          <button className="add-task-btn">Add Task +</button>
        </div>
      </DragDropContext>
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="task-card-content">
      <div className="task-card-upperside">
        <div className="task-card-title">
          <h3 className="task-card-h3">{task.title}</h3>
        </div>
        <div>
          <img src="./board-pen-icon.svg" alt="pen-icon" />
        </div>
      </div>
      <div className="task-card-info">
        <div className="task-date-progress">
          <span className="task-date">
            <img className="task-card-date-icon" src="./board-date-icon.svg" alt="date-icon" />{task.date}
          </span>
        </div>
        <div>
          <span className="task-progress">%{task.progress}</span>
        </div>
      </div>
      <div className="task-meta">
        <div className="task-card-lowerside">
          <div>
            <span className="task-comments">
              <img src="./board-comment-icon.svg" alt="comment-icon" />{task.comments}
            </span>
          </div>
          <div>
            <span className="task-members">
              <img src="./board-member-icon.svg" alt="member-icon" />{task.members}
            </span>
          </div>
        </div>
        <div className="task-actions">
          <img src="./board-flag-icon.svg" alt="flag-icon" />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Forsico</h2>
      <nav>
        <ul>
          <li><i className="fas fa-home"></i> Home</li>
          <li><i className="fas fa-tasks"></i> My tasks</li>
          <li><i className="fas fa-folder"></i> My docs</li>
          <li><i className="fas fa-brain"></i> Forsico AI</li>
        </ul>
      </nav>
      <div className="workspaces">
        <h3>Workspaces</h3>
        <ul>
          <li>Enefitimbu</li>
          <li>Startup</li>
          <li>Forsico</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskBoard;