import {MessageType} from "../enums/enum.ts";

export interface MessageI {
    id: number;
    sender: MessageType;
    text: string;
}