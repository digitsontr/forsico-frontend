import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import authSlice from "../store/authSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import "../styles/TaskModal.css";
import { setTaskStatus } from '../store/authSlice';
import Plus from "../assets/sidebar-plus-icon.svg"
import Assignees from "../assets/taskcard-info-assignees.svg"
import DueDate from "../assets/taskcard-info-duedate.svg"
import Status from "../assets/taskcard-info-status.svg"
import Priority from "../assets/taskcard-info-priority.svg"
import RightArrow from "../assets/taskcard-info-rightarrow.svg"
import Comment from "../assets/taskcard-info-comment.svg"
import Cross from "../assets/taskcard-info-cross.svg"
import TextEditor from "../components/Editor/TextEditor"

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.auth.boards); // authSlice'dan boards'ı al
  const board = boards.find((board) => board.isActive === true);



  if (!board) return null; // Eğer aktif bir board yoksa render edilmesin

  const columns = board.columns;
  const col = columns[colIndex];
  const task = col ? col.tasks[taskIndex] : null;

  if (!task) return null; // Eğer görev yoksa render edilmesin

  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(authSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div onClick={onClose} className="modal-wrapper">
      <div className={`modal-content-trello ${isDeleteModalOpen ? "dark-mode" : ""}`}>
        <div className="taskcard-info-upper-area">
          <div className="taskcard-info-left-upper">
            <span>Forsico/General</span>
          </div>
          <div className="taskcard-infor-right-upper">
            <img src={RightArrow} alt="taskcard-info-right-arrow" />
            <img src={Cross} alt="taskcard-info-cross" />
          </div>
        </div>
        <div className="taskcard-info-line">
        </div>
        <div className="taskcard-info-lower-area">
          <div className="taskcard-info-left-lower">
            <div className="taskcard-info-title-area">
              <p className="taskcard-info-title">{task.title}</p>
            </div>
            <div className="taskcard-info-description-area">
            <TextEditor></TextEditor>
            </div>
            <div className="taskcard-info-comment-area" id="editor">
             <TextEditor></TextEditor>
            </div>
            <div className="taskcard-info-subtask-area">
              <div className="taskcard-info-subtack-inside">
                <p className="taskcard-info-gray-letter">Create subtask of this task</p>
                <button className="generate-subtask-button">Generate Subtask</button>
              </div>
            </div>
            <div className="taskcard-info-checklist-area">
              <input className="checklist-checkbox" type="checkbox" />
              <p className="taskcard-info-gray-letter">Create a checklist for this task</p>
            </div>
          </div>
          <div className="taskcard-info-right-lower">
            <div className="taskcard-info-assignees">
              <a className="td-none" href="#"><img src={Assignees} alt="assignees" />Assignees</a>
              <img src={Plus} alt="plus" />
            </div>
            <div className="taskcard-info-due-date">
              <a className="td-none" href="#"><img src={DueDate} alt="duedate" />Due Date</a>
              <img src={Plus} alt="plus" />
            </div>
            <div className="taskcard-info-status">
              <a className="td-none" href="#"><img src={Status} alt="status" />Status</a>
              <img src={Plus} alt="plus" />
            </div>
            <div className="taskcard-info-priority">
              <a className="td-none" href="#"><img src={Priority} alt="priority" />Priority</a>
              <img src={Plus} alt="plus" />
            </div>
            <div className="taskcard-info-features">
              <a className="td-none" href="#">Features</a>
              <img src={Plus} alt="plus" />
            </div>

          </div>
        </div>

      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
