import React, { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
import authSlice from "../store/authSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import "../styles/AddEditBoardModal.css";


function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.auth.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(authSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(authSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div className="modal-content-trello">
        <h3 className="modal-title">{type === "edit" ? "Edit" : "Add New"} Board</h3>

        {/* Task Name */}
        <div className="input-group">
          <label>Board Name</label>
          <input
            type="text"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="input-group">
          <label>Board Columns</label>
          {newColumns.map((column, index) => (
            <div key={index} className="column-item">
              <input
                type="text"
                value={column.name}
                onChange={(e) => onChange(column.id, e.target.value)}
              />
              <img
                src={crossIcon}
                alt="Delete column"
                onClick={() => onDelete(column.id)}
              />
            </div>
          ))}

          <button
            className="button button-secondary"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", tasks: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Column
          </button>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) onSubmit(type);
            }}
            className="button button-primary"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
