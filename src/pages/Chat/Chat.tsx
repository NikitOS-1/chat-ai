import './style.scss'
import {Message} from "../../components/Message/Message.tsx";
import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../helpers/useAppSelector.ts";
import {useAppDispatch} from "../../helpers/useAppDispatch.ts";
import {addMessage} from "../../store/slices/messageSlice.ts";
import {MessageType} from "../../common/enums/enum.ts";
import {MessageI} from "../../common/interface/interface.ts";
import {getMessageFromAI} from "../../services/chatService.ts";
import {WelcomeMessage} from "../../components/Welcome/WelcomeMessage.tsx";


export const Chat = () => {
    const [question, setQuestion] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBotTypingText, setIsBotTypingText] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.message.messages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async () => {
        if (question.trim() === '') return;

        dispatch(addMessage({id: Date.now(), sender: MessageType.USER, text: question}));

        setQuestion('');
        setIsLoading(true);
        setIsBotTypingText(true);

        try {
            const response = await getMessageFromAI({message: question});

            dispatch(addMessage({
                id: Date.now(),
                sender: MessageType.BOT,
                text: response
            }));
        } catch (error) {
            console.error("Error sending message:", error);
            dispatch(addMessage({
                id: Date.now(),
                sender: MessageType.BOT,
                text: error as string
            }));
        } finally {
            setIsLoading(false);
            setIsBotTypingText(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-messages">
                    {messages.length === 0 ?
                        <WelcomeMessage/>
                        :
                        messages.map(({id, sender, text}: MessageI) => (
                            <Message key={id} sender={sender} text={text}/>
                        ))}
                    {isBotTypingText && (
                        <div className="bot-typing">
                            <Message sender={MessageType.BOT} typing={isBotTypingText}/>
                        </div>
                    )}
                    <div ref={bottomRef}/>
                </div>
                <div className="chat-input">
                    <Input
                        type="text"
                        placeholder="Ask me a question..."
                        value={question}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSubmit} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}