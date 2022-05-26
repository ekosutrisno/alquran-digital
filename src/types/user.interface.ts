import { DocumentReference } from "firebase/firestore";
import { AyahData } from "./alquran.interface";

export interface InfoMetadata {
    createdDate?: Date | any
    lastModifiedDate?: Date | any
}

export interface User extends InfoMetadata {
    bacaan?: AyahData;
    email: string;
    join_at: number;
    photo_url?: string;
    user_id: string;
    username?: string;
    full_name?: string;
    mentor_id?: DocumentReference;
    telephone?: string;
    main_role: DocumentReference;
    gender?: number;
    dob?: string;
    pob?: string;
    hobby?: string;
    religion?: number;
    about?: string;
    is_active: boolean;
    is_mentor: boolean;
    nationality?: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}

export enum FlagUseOn {
    REGISTRATION = 'REGISTRATION'

}