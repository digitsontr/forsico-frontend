import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../icon-cross.svg";
import authSlice from "../../store/authSlice";
import "../css/addEditTaskModal.css";
import rightButton from '../dark-right-button.svg';
import close from '../close.svg';

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.auth.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };
 
  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        authSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        authSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="modal-content-trello">
        <div className="modal-header">
          <h3>{type === "edit" ? "Edit" : "Add New"} Task</h3>
          <div className="modal-buttons">
            <img
              src={rightButton}
              alt="Right Button"
              className="right-button"
              onClick={() => {
                // Sağdaki butona tıklandığında yapılacak işlemler
              }}
            />
            <img
              src={close}
              alt="Close Button"
              className="close-button"
              onClick={() => {
                setIsAddTaskModalOpen(false);
              }}
            />
          </div>
        </div>

        <div className="divider"></div>

        <div className="form-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Create Design Forsico"
          />
        </div>


        <div className="form-group">
          <div className="text-area-container">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field-2"
              placeholder="Comment"
            />
          </div>
        </div>


        <div className="new-area">
          {/* Buraya istediğiniz içeriği ekleyebilirsiniz */}
        </div>

        <div className="right-area">
        </div>

        <div className="bottom-left-area">
          {/* Buraya içerik ekleyebilirsiniz */}
        </div>


        {/* <div className="form-group">
          {subtasks.map((subtask, index) => (
            <div key={index} className="subtask-container">
              <input
                onChange={(e) => onChangeSubtasks(subtask.id, e.target.value)}
                type="text"
                value={subtask.title}
                className="input-field"
                placeholder="e.g. Take coffee break"
              />
              <img
                src={crossIcon}
                onClick={() => onDelete(subtask.id)}
                className="close-icon"
              />
            </div>
          ))}

          <button
            className="add-subtask-btn"
            onClick={() => setSubtasks([...subtasks, { title: "", isCompleted: false, id: uuidv4() }])}
          >
            + Add New Subtask
          </button>
        </div> */}

        {/* <div className=" form-group">
          <label>Current Status</label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="select-field"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                if (type === "edit") setIsTaskModalOpen(false);
              }
            }}
            className="submit-btn"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div> */}
      </div>
    </div>


  );
}

export default AddEditTaskModal;
