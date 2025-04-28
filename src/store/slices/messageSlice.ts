import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MessageType} from "../../common/enums/enum.ts";
import {MessageI} from "../../common/interface/interface.ts";


interface messageStateI {
    messages: MessageI[];
}

const initialState: messageStateI = {
    messages: [{
        id: Date.now(),
        sender: MessageType.BOT,
        text: "Hi, I can help you with anything."
    }],
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state,
                   action: PayloadAction<{ id: number; sender: MessageType; text: string }>) {
            state.messages.push({...action.payload});
        },
    },
});

export const {addMessage} = messageSlice.actions;
export default messageSlice.reducer;