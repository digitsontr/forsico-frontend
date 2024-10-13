import React from "react";
import "../styles/ElipsisMenu.css";


function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={
        type === "Boards"
          ? "elipsis-menu-container-boards"
          : "elipsis-menu-container-others"
      }
    >
      <div className="flex-container">
        <div
          className={`menu-box ${
            type === "Boards" ? "menu-box-dark" : ""
          }`}
        >
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className={`menu-item ${
              type === "Boards" ? "menu-item-dark" : ""
            }`}
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="menu-item-red"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;
