import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import draftReducer from '../features/draftSlice';
import postReducer  from '../features/postSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        draft : draftReducer,
        post : postReducer
    }
});

export default store;