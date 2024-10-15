import { useState } from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedComponent } from '../store/selectedComponentSlice';

const Sidebar = () => {
  // State to track which workspace dropdown is open
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState({
    Eneftimbu: false,
    Startup: false,
    Forsico: false,
  });

  // Function to toggle dropdown
  const toggleDropdown = (workspace) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [workspace]: !prevState[workspace],
    }));
  };

  const handleClick = (comp) => {
    dispatch(
      setSelectedComponent({
          selectedComponent: comp,
      })
    );
  }
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <img
          className="sidebar-home-icon"
          src="./sidebar-home-icon.svg"
          alt="home"
        />
        {/* <Link className="sidebar-home sidebar-blue-letter" to="/taskboardhomepage">Home</Link> */}
        <a className="sidebar-home sidebar-blue-letter" type="button" onClick={()=>handleClick("home-page")}>Home</a>
      </div>
      <div className="sidebar-menu">
        <img
          className="sidebar-tasks-icon"
          src="./sidebar-tasks-icon.svg"
          alt="tasks"
        />
        <span className="sidebar-blue-letter">My Tasks</span>
      </div>
      <div className="sidebar-menu">
        <img
          className="sidebar-docs-icon"
          src="./sidebar-docs-icon.svg"
          alt="docs"
        />
        <span className="sidebar-blue-letter">My Docs</span>
      </div>
      <div className="sidebar-line"></div>

      <div className="sidebar-workspaces">
        <span className="add-workspace">WORKSPACES</span>
        <a type="button" onClick={()=>handleClick("workspace-ai")}><img
          className="sidebar-home-icon"
          src="./sidebar-plus-icon.svg"
          alt="plus"
        /></a>
      </div>

      {/* Eneftimbu Dropdown */}
      <div className="sidebar-menu sidebar-workspaces-menu">
        <img
          className="sidebar-home-icon"
          src="./sidebar-dot-icon.svg"
          alt="dot"
          onClick={() => toggleDropdown("Eneftimbu")}
        />
        <span className="sidebar-blue-letter" onClick={() => toggleDropdown("Eneftimbu")}>Eneftimbu</span>
      </div>
      {openDropdown.Eneftimbu && (
        <div className="sidebar-submenu">
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />General</span>
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />UX/UI</span>
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />Software</span>
        </div>
      )}

      {/* Startup Dropdown */}
      <div className="sidebar-menu">
        <img
          className="sidebar-home-icon"
          src="./sidebar-dot-icon.svg"
          alt="dot"
          onClick={() => toggleDropdown("Startup")}
        />
        <span className="sidebar-blue-letter" onClick={() => toggleDropdown("Startup")}>Startup</span>
      </div>
      {openDropdown.Startup && (
        <div className="sidebar-submenu">
          
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />General</span>
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />Marketing</span>
        </div>
      )}

      {/* Forsico Dropdown */}
      <div className="sidebar-menu">
        <img
          className="sidebar-home-icon"
          src="./sidebar-dot-icon.svg"
          alt="dot"
          onClick={() => toggleDropdown("Forsico")}
        />
        <span className="sidebar-blue-letter" onClick={() => toggleDropdown("Forsico")}>Forsico</span>
      </div>
      {openDropdown.Forsico && (
        <div className="sidebar-submenu">
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />General</span>
          <span className="sidebar-blue-letter"><img className="sidebar-submenu-dot" src="./sidebar-dot-icon.svg" alt="dot" />Social Media</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;