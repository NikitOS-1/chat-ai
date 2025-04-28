interface PostMessage {
    message: string;
}

export const getMessageFromAI = async (message: PostMessage): Promise<string> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`AI answer: "${message.message}"`);
        }, 1500);
    });
};