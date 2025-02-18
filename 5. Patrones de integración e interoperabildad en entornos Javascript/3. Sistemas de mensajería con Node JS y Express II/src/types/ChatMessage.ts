import ChatUser from "./ChatUser";

type ChatMessage = {
    user: ChatUser;
    message_text: string;
    message_date: Date;
    status: "Read" | "Unread"
}

export default ChatMessage;
