import { createSlice } from '@reduxjs/toolkit';
import data from '../muhammed-added/data.json'; 

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isThirdParty: false,
    boards: data.boards, // boards'ı ekliyoruz
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.token;
            state.isThirdParty = action.payload.thirdParty ? action.payload.thirdParty : false;
            // localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // localStorage'dan kaldır
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        addBoard: (state, action) => {
            const isActive = state.boards.length > 0 ? false : true;
            const payload = action.payload;
            const board = {
                name: payload.name,
                isActive,
                columns: payload.newColumns || [], // newColumns kontrolü ekleniyor
            };
            state.boards.push(board);
        },
        editBoard: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                board.name = payload.name;
                board.columns = payload.newColumns || board.columns; // newColumns kontrolü
            }
        },
        deleteBoard: (state) => {
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                state.boards.splice(state.boards.indexOf(board), 1);
            }
        },
        setBoardActive: (state, action) => {
            state.boards.forEach((board, index) => {
                board.isActive = index === action.payload.index;
            });
        },
        addTask: (state, action) => {
            const { title, status, description, subtasks, newColIndex } = action.payload;
            const task = { title, description, subtasks, status };
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const column = board.columns[newColIndex];
                if (column) {
                    column.tasks.push(task);
                }
            }
        },
        editTask: (state, action) => {
            const {
                title,
                status,
                description,
                subtasks,
                prevColIndex,
                newColIndex,
                taskIndex,
            } = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const column = board.columns[prevColIndex];
                const task = column.tasks[taskIndex];
                if (task) {
                    task.title = title;
                    task.status = status;
                    task.description = description;
                    task.subtasks = subtasks;

                    if (prevColIndex !== newColIndex) {
                        column.tasks.splice(taskIndex, 1);
                        board.columns[newColIndex].tasks.push(task);
                    }
                }
            }
        },
        dragTask: (state, action) => {
            const { colIndex, prevColIndex, taskIndex } = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const prevCol = board.columns[prevColIndex];
                const task = prevCol.tasks.splice(taskIndex, 1)[0];
                board.columns[colIndex].tasks.push(task);
            }
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const col = board.columns[payload.colIndex];
                const task = col.tasks[payload.taskIndex];
                const subtask = task.subtasks[payload.index];
                if (subtask) {
                    subtask.isCompleted = !subtask.isCompleted;
                }
            }
        },
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const col = board.columns[payload.colIndex];
                const task = col.tasks[payload.taskIndex];
                if (task) {
                    task.status = payload.status;
                    col.tasks.splice(payload.taskIndex, 1);
                    board.columns[payload.newColIndex].tasks.push(task);
                }
            }
        },
        deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.boards.find((board) => board.isActive);
            if (board) {
                const col = board.columns[payload.colIndex];
                col.tasks.splice(payload.taskIndex, 1);
            }
        },
    },
});

// Export edilen actionlar
export const {
    setCredentials,
    logout,
    addBoard,
    editBoard,
    deleteBoard,
    setBoardActive,
    addTask,
    editTask,
    dragTask,
    setSubtaskCompleted,
    setTaskStatus,
    deleteTask,
} = authSlice.actions;

export default authSlice.reducer;
