import {configureStore} from '@reduxjs/toolkit';
import messageReducer from "./slices/messageSlice.ts";

const reducer = {
    message: messageReducer,
};

export const store = configureStore({
    reducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;