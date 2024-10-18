import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import selectedComponentReducer from './selectedComponentSlice';
//import boardsSlice from "./boardsSlice";
//boards: boardsSlice.reducer,

export const store = configureStore({
    reducer: {
        auth: authReducer,
        selectedComp: selectedComponentReducer
    },
});
