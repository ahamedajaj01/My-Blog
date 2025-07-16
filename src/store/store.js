import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../appFeatures/authSlice';
import blogReducer from '../appFeatures/blogSlice';  

const store = configureStore({
    reducer:{
        // Add reducers here
        auth: authReducer,
        blog: blogReducer, 
    }
})

export default store;