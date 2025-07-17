import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    darkMode: localStorage.getItem("theme") === "dark", // ✅ default value from localStorage
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        themeToggle: (state)=>{
            state.darkMode = !state.darkMode;
        },
        setDarkMode: (state,action)=>{
            state.darkMode = action.payload;
        }
    }
});
    
export const {themeToggle, setDarkMode} = themeSlice.actions;
export default themeSlice.reducer

