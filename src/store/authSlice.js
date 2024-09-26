import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isThirdParty:false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.token;
            state.isThirdParty = action.payload.thirdParty ? thirdParty : false;
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
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
