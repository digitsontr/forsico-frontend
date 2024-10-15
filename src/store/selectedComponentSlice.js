import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedComponent: "",
};

const selectedComponentSlice = createSlice({
    name: 'selectedComp',
    initialState,
    reducers: {
        setSelectedComponent: (state, action) => {
            state.selectedComponent = action.payload.selectedComponent;
        },

    },
});

// Export edilen actionlar
export const {
    setSelectedComponent,
} = selectedComponentSlice.actions;

export default selectedComponentSlice.reducer;
