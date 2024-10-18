import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/workspaceCss/TaskModal.css";
import Plus from "../../assets/sidebar-plus-icon.svg"
import Assignees from "../../assets/taskcard-info-assignees.svg"
import DueDate from "../../assets/taskcard-info-duedate.svg"
import Status from "../../assets/taskcard-info-status.svg"
import Priority from "../../assets/taskcard-info-priority.svg"
import RightArrow from "../../assets/taskcard-info-rightarrow.svg"
import Comment from "../../assets/taskcard-info-comment.svg"
import Cross from "../../assets/taskcard-info-cross.svg"
import TextEditor from "../Editor/TextEditor"

const TaskModal = ({ taskIndex, colIndex, setIsTaskModalOpen }) =>  {
  const [description, setDescription] = useState("Task description here...");
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  const [comment, setComment] = useState("Add a comment...");
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  const handleSaveDescription = () => setIsDescriptionEditing(false);
  const handleSaveComment = () => setIsCommentEditing(false);

  return (
    <div className="modal-wrapper">
      <div className={`modal-content-trello`}>
        <div className="taskcard-info-upper-area">
          <div className="taskcard-info-left-upper">
            <span>Forsico/General</span>
          </div>
          <div className="taskcard-infor-right-upper">
            <img src={RightArrow} alt="taskcard-info-right-arrow" />
            <img
              src={Cross}
              alt="taskcard-info-cross"
              onClick={() => setIsTaskModalOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="taskcard-info-line"></div>
        <div className="taskcard-info-lower-area">
          <div className="taskcard-info-left-lower">
            <div className="taskcard-info-title-area">
              <p className="taskcard-info-title">Task Title</p>
            </div>

            {/* Description Section */}
            <div className="taskcard-info-description-area">
              {isDescriptionEditing ? (
                <TextEditor
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleSaveDescription}
                />
              ) : (
                <textarea
                  className="taskcard-info-textarea"
                  value={description}
                  onClick={() => setIsDescriptionEditing(true)}
                  readOnly
                />
              )}
            </div>

            {/* Comment Section */}
            <div className="taskcard-info-comment-area" id="editor">
              {isCommentEditing ? (
                <TextEditor
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onBlur={handleSaveComment}
                />
              ) : (
                <textarea
                  className="taskcard-info-textarea"
                  value={comment}
                  onClick={() => setIsCommentEditing(true)}
                  readOnly
                />
              )}
            </div>

            <div className="taskcard-info-subtask-area">
              <div className="taskcard-info-subtack-inside">
                <p className="taskcard-info-gray-letter">
                  Create subtask of this task
                </p>
                <button className="generate-subtask-button">
                  Generate Subtask
                </button>
              </div>
            </div>

            <div className="taskcard-info-checklist-area">
              <input className="checklist-checkbox" type="checkbox" />
              <p className="taskcard-info-gray-letter">
                Create a checklist for this task
              </p>
            </div>
          </div>

          <div className="taskcard-info-right-lower">
            <div className="taskcard-info-assignees">
              <a className="td-none" href="#">
                <img src={Assignees} alt="assignees" />
                Assignees
              </a>
              <img src={Plus} alt="plus" />
            </div>

            <div className="taskcard-info-due-date">
              <a className="td-none" href="#">
                <img src={DueDate} alt="duedate" />
                Due Date
              </a>
              <img src={Plus} alt="plus" />
            </div>

            <div className="taskcard-info-status">
              <a className="td-none" href="#">
                <img src={Status} alt="status" />
                Status
              </a>
              <img src={Plus} alt="plus" />
            </div>

            <div className="taskcard-info-priority">
              <a className="td-none" href="#">
                <img src={Priority} alt="priority" />
                Priority
              </a>
              <img src={Plus} alt="plus" />
            </div>

            <div className="taskcard-info-features">
              <a className="td-none" href="#">Features</a>
              <img src={Plus} alt="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TaskModal;