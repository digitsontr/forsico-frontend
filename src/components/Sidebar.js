import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import useDarkMode from "../hooks/useDarkMode";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import authSlice from "../store/authSlice";
import "../styles/sidebar_wspace.css";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.auth.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
<div className={`sidebar-open ${colorTheme === 'dark' ? 'sidebar-dark' : ''}`}>
  <div className={`board-list ${colorTheme === 'dark' ? 'dark' : ''}`}>
    <h3 className={`board-title ${colorTheme === 'dark' ? 'dark' : ''}`}>
      ALL BOARDS ({boards?.length})
    </h3>
    <div className="dropdown-board">
      {boards.map((board, index) => (
        <div
          key={index}
          className={`board-item ${board.isActive ? 'active' : ''} ${colorTheme === 'dark' ? 'dark' : ''}`}
          onClick={() => dispatch(authSlice.actions.setBoardActive({ index }))}
        >
          <img src={boardIcon} alt="Board Icon" />
          <p className="text-lg font-bold">{board.name}</p>
        </div>
      ))}
      <div
        className="new-board-button"
        onClick={() => setIsBoardModalOpen(true)}
      >
        <img src={boardIcon} alt="New Board Icon" />
        <p className="text-lg font-bold">Create New Board</p>
      </div>
    </div>

    {/* <div className={`theme-switcher ${colorTheme === 'dark' ? 'dark' : ''}`}>
      <img src={lightIcon} alt="Light Mode Icon" />
      <Switch
        checked={darkSide}
        onChange={(checked) => {
          setTheme(colorTheme);
          setDarkSide(checked);
        }}
        className={`toggle-switch ${darkSide ? 'checked' : ''}`}
      >
        <span className={`toggle-thumb ${darkSide ? 'checked' : ''}`} />
      </Switch>
      <img src={darkIcon} alt="Dark Mode Icon" />
    </div> */}
  </div>
</div>


      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;
