import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import authSlice from "../store/authSlice";
import useDarkMode from "../hooks/useDarkMode";
import "../styles/HeaderDropDown.css";


function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.auth.boards);

  return (
    <div
      className="dropdown-overlay"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      <div className={`dropdown-container ${darkSide ? "dark-mode" : ""}`}>
        <h3 className="dropdown-title">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className="dropdown-board-list">
          {boards.map((board, index) => (
            <div
              className={`dropdown-board ${board.isActive ? "active" : ""}`}
              key={index}
              onClick={() => {
                dispatch(authSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="icon" alt="Board Icon" />
              <p>{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="dropdown-board"
          >
            <img src={boardIcon} className="icon" alt="Board Icon" />
            <p>Create New Board</p>
          </div>

          <div className={`switch-container ${darkSide ? "dark-mode" : ""}`}>
            <img src={lightIcon} alt="Light Mode Icon" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`switch ${darkSide ? "active" : ""}`}
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <span className="switch-handle" />
            </Switch>
            <img src={darkIcon} alt="Dark Mode Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
