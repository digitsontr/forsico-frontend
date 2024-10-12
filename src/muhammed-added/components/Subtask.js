import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../store/authSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.auth.boards); // auth.slice'dan boards'ı al
  const board = boards.find((board) => board.isActive === true);
  const col = board ? board.columns[colIndex] : null;
  const task = col ? col.tasks[taskIndex] : null;
  const subtask = task ? task.subtasks[index] : null;
  
  if (!subtask) return null; // Eğer alt görev yoksa hiçbir şey render etmeyin.

  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      authSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
      <input
        className="w-4 h-4 accent-[#635fc7] cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
