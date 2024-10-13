import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
//import boardsSlice from "./boardsSlice";
//boards: boardsSlice.reducer,

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
