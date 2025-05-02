import './style.scss'
import {Message} from "../../components/Message/Message.tsx";
import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../helpers/useAppSelector.ts";
import {useAppDispatch} from "../../helpers/useAppDispatch.ts";
import {MessageType} from "../../common/enums/enum.ts";
import {MessageI} from "../../common/interface/interface.ts";
import {WelcomeMessage} from "../../components/Welcome/WelcomeMessage.tsx";
import {wsConnect, wsDisconnect, wsSendMessage} from "../../store/actions/wsActions.ts";


export const Chat = () => {
    const [question, setQuestion] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBotTypingText, setIsBotTypingText] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.message.messages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (!question.trim()) return;

        setIsLoading(true);
        setIsBotTypingText(true);

        dispatch(wsSendMessage(question));

        setQuestion('');

        setTimeout(() => {
            setIsLoading(false);
            setIsBotTypingText(false);
        }, 2000);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        dispatch(wsConnect());

        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);


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