import {createAction} from '@reduxjs/toolkit';

export enum WSActions {
    CONNECT = 'ws/connect',
    DISCONNECT = 'ws/disconnect',
    SEND = 'ws/send',
}

export const wsConnect = createAction(WSActions.CONNECT);
export const wsDisconnect = createAction(WSActions.DISCONNECT);
export const wsSendMessage = createAction<string>(WSActions.SEND);