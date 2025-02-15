import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null, 
    };  
    

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            
        },
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;