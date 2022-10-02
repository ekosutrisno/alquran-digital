export interface Chat {
    content: string;
    from: string;
    to: string;
    isGroup: boolean;
    colorCode?: string;
    timestamps: number;
}

export interface ChatGroup {
    key: string;
    chats: Array<Chat>
}