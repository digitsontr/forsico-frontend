import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import "../css/EmptyBoard.css";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div
      className={`empty-board-container ${
        type === "edit" ? "" : "empty-board-container-dark"
      }`}
    >
      <h3 className="empty-board-heading">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className={`empty-board-button ${
          type === "edit" ? "" : "empty-board-button-dark"
        }`}
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
