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

export interface MemberList {
    name: string;
    id: string;
    color: string;
    avatar: string;
}

export interface UserOnlineStatus {
    state: string;
    last_changed: number | object;
}