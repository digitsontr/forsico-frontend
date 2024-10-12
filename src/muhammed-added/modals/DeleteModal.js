import React from "react";
import "../css/DeleteModal.css";

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="modal-container-trello"
    >
      {/* Delete Modal */}
      <div className="modal-trello">
        <h3>Delete this {type}?</h3>
        {type === "task" ? (
          <p>
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p>
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="modal-buttons-trello">
          <button
            onClick={onDeleteBtnClick}
            className="button-delete-trello"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            className="button-cancel-trello"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
