import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './messagesSlice';

export const store = configureStore({
    reducer: {
        message: messageReducer
    }
})