import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../store/authSlice";
import "../css/Subtask.css";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.auth.boards); // Get boards from auth.slice
  const board = boards.find((board) => board.isActive === true);
  const col = board ? board.columns[colIndex] : null;
  const task = col ? col.tasks[taskIndex] : null;
  const subtask = task ? task.subtasks[index] : null;

  if (!subtask) return null; // Render nothing if there is no subtask

  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      authSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className={`subtask-container ${checked ? 'completed' : ''}`}>
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`subtask-title ${checked ? 'completed' : ''}`}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
