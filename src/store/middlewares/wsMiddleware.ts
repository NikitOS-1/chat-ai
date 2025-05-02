import {Middleware} from '@reduxjs/toolkit';
import {addMessage} from '../slices/messageSlice';
import {MessageType} from '../../common/enums/enum';
import socketService from "../../services/socketService";
import {wsConnect, wsDisconnect, wsSendMessage} from "../actions/wsActions.ts";


export const wsMiddleware: Middleware = store => {
    socketService.onMessage((text) => {
        store.dispatch(addMessage({
            id: Date.now(),
            sender: MessageType.BOT,
            text
        }));
    });

    return next => action => {
        if (wsConnect.match(action)) {
            socketService.connect();
        }

        if (wsDisconnect.match(action)) {
            socketService.disconnect();
        }

        if (wsSendMessage.match(action)) {
            store.dispatch(addMessage({
                id: Date.now(),
                sender: MessageType.USER,
                text: action.payload
            }));
            socketService.send(action.payload);
        }

        return next(action);
    };
};
