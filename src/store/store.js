import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../appFeatures/authSlice';
import blogReducer from '../appFeatures/blogSlice';  
import themeReducer from "../appFeatures/themeSlice"

const store = configureStore({
    reducer:{
        // Add reducers here
        auth: authReducer,
        blog: blogReducer, 
        theme: themeReducer,
    }
})

export default store;