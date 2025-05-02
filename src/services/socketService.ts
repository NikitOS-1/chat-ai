type Listener = (message: string) => void;

let isConnected = false;
const listeners: Listener[] = [];

const connect = () => {
    if (isConnected) return;

    const message = 'Hi! AI Bot was connected';
    const delay = 3000

    isConnected = true;
    console.log(message);
    emitMessage(message, delay);
};

const disconnect = () => {
    if (!isConnected) return;

    const message = 'WebSocket was disconnected'

    isConnected = false;
    console.log(message);
};

const send = (message: string) => {
    const warnMessage = 'Message cannot send. Not connected.'
    const delay = 1999

    if (!isConnected) {
        const delay = 500

        emitMessage(warnMessage, delay);
        return;
    }

    emitMessage(`AI response: "${message}"`, delay);
};

const onMessage = (listener: Listener) => {
    listeners.push(listener);
};

const emitMessage = (message: string, delay = 0) => {
    setTimeout(() => {
        listeners.forEach(cb => cb(message));
    }, delay);
};


const socketService = {
    connect,
    disconnect,
    send,
    onMessage,
};

export default socketService;