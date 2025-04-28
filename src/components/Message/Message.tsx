import './style.scss'
import {MessageType} from "../../common/enums/enum.ts";

interface MessageProps {
    sender: MessageType
    text?: string
    typing?: boolean
}

export const Message = ({sender, text, typing}: MessageProps) => {
    return (
        <div className="chat-message">
            <div className={`message ${sender}`}>
                {typing ? (
                    <div className="typing">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                ) : text}
            </div>
        </div>
    )
}
