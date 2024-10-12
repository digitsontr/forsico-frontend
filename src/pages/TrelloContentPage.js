import React, { useState } from "react";
import TaskModal from "../muhammed-added/modals/TaskModal.js";
import '../muhammed-added/css/TrelloContentPage.css';
import { useSelector } from "react-redux";

import rightButton from '../muhammed-added/right-button.svg';
import miniCalendar from '../muhammed-added/mini-calendar.svg';
import fork from '../muhammed-added/fork-blue.svg';
import people from '../muhammed-added/people-blue.svg';
import flag from '../muhammed-added/flag.svg';
console.log()
function TrelloContentPage({ colIndex, taskIndex, color }) {
  console.log("colIndex", colIndex);
  console.log("taskIndex", taskIndex);
  console.log("color", color);
  const boards = useSelector((state) => state.auth.boards);
  console.log("boards", boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  console.log("columns", columns);
  const col = columns.find((col, i) => i === colIndex);
  console.log("col", col);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
    <div
      onClick={() => {
        setIsTaskModalOpen(true);
      }}
      draggable
      onDragStart={handleOnDrag}
      className="task-container"
      style={{ borderColor: color }} // Use the passed color here
    >
      <div className="task-frame">
        <div className="task-content">
          <p className="task-title">{task.title}</p>
          <div className="task-icon">
            <img src={rightButton} alt="icon" />
          </div>
        </div>
        <div className="task-divider"></div>
      </div>

      <div className="task-info">
        <div className="task-date">
          <div className="mini-calendar-icon">
            <img src={miniCalendar} alt="mini calendar" />
          </div>
          <span className="date-text">August 12</span>
        </div>
        <div className="task-status">
          <span>%50</span>
        </div>
      </div>

      <div className="task-stats">
        <div className="stat-group">
          <div className="stat-icon">
            <img src={fork} alt="Fork icon" />
          </div>
          <div className="stat-text">8</div>
        </div>

        <div className="stat-group">
          <div className="stat-icon">
            <img src={people} alt="People icon" />
          </div>
          <div className="stat-text">4</div>
        </div>
        <div className="task-extra">
          <img src={flag} alt="Right button" />
        </div>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  </div>
);
}

export default TrelloContentPage;
