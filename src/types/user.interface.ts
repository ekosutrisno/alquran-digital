import { DocumentReference } from "firebase/firestore";
import { AyahData } from "./alquran.interface";

export interface InfoMetadata {
    createdDate?: Date | any
    lastModifiedDate?: Date | any
}

export interface User extends InfoMetadata {
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
    lastActive?: number;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface UserNotification{
    id: string;
    user_id: User['user_id'];
    title: string;
    body: string;
    image: string;
    timestamp: number;
    icon: string;
    type: string;
    read: boolean;
}

export enum UserNotificationType{
    ACCOUNT = 'A',
    NEWS = 'N',
    CHAT = 'C',
    REMINDER = 'R',
    INFO = 'I'
}

export enum FlagUseOn {
    REGISTRATION = 'REGISTRATION'
}