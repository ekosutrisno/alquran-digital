export interface Chat {
    content: string;
    from: string;
    to: string;
    isGroup: boolean;
    colorCode?: string;
    timestamps: number;
    type: ChatType;
    chatAttachment?: ChatFile | ChatAudio;
}

export type ChatType = 'text' | 'audio' | 'file' | 'image'

export interface ChatAudio {
    duration: number;
    name: string;
    size: number;
    path: string;
}

export interface ChatFile {
    ext: string;
    name: string;
    size: number;
    path: string;
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