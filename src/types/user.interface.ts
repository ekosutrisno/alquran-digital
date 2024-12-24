import { DocumentReference } from "firebase/firestore";
import { AyahData } from "./alquran.interface";
import { LocationQueryRaw } from "vue-router";
export interface InfoMetadata {
    createdDate?: Date | string | number
    lastModifiedDate?: Date | string | number
}

export interface AppUser extends InfoMetadata {
    bacaanku?: AyahData | null;
    email: string;
    join_at: number;
    photo_url?: string;
    user_id: string;
    username?: string;
    full_name?: string;
    mentor_id?: DocumentReference;
    telephone?: string;
    main_role: DocumentReference;
    gender?: string | number;
    dob?: string;
    pob?: string;
    hobby?: string;
    religion?: string | number;
    about?: string;
    is_active: boolean;
    is_mentor: boolean;
    nationality?: string;
    colorCode?: string;
    rooms?: Array<string>;
    fcms?: Array<string>;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface UserNotification {
    id: string;
    user_id: string;
    title: string;
    body: string;
    image: string;
    timestamp: number;
    icon: string;
    type: string;
    read: boolean;
}

export interface NotificationMapper {
    actualDate: string | Date;
    key: string;
    data: Array<UserNotification>
}

export interface SearchItem {
    id: number;
    info: string;
    text: string;
    desc: string;
    to: string;
    params?: {
        [key: string]: string
    },
    query?: LocationQueryRaw
}

export enum UserNotificationType {
    ACCOUNT = 'A',
    NEWS = 'N',
    CHAT = 'C',
    REMINDER = 'R',
    INFO = 'I'
}

export type NotificationFilter = "All" | "Read" | "Unread";

export interface NotifFilterOption {
    id: number;
    filter: NotificationFilter
}

export enum FlagUseOn {
    REGISTRATION = 'REGISTRATION',
    LOGIN = 'LOGIN',
    VERIFY = 'VERIFY'
}

export type LocalesSupport = "en" | "id";

export interface MainMenuType {
    id: string;
    total: number;
    description: string;
    title: string;
    to: string;
    tag?: TagType;
    query?: string[];
}


export interface QuickMenuType {
    id?: string;
    title?: string;
    description?: string;
    to: string;
    icon: string;
    tag?: TagType;
    query?: string[]
}

export type TagType = 'dev' | 'alpha' | 'beta' | 'new' | 'stable';

export type SettingTab = 'profile' | 'account' | 'privacy' | 'appearance';

export interface QuranLayoutSize { id: number, size: string, text: string, class: string };