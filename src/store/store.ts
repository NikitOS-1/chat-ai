import {configureStore} from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import {wsMiddleware} from './middlewares/wsMiddleware';

const reducer = {
    message: messageReducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wsMiddleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;