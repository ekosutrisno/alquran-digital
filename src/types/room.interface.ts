import { DocumentReference } from "firebase/firestore";
import { InfoMetadata, AppUser } from "./user.interface";

export interface Room extends InfoMetadata {
    id: string;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: DocumentReference;
    ratings: number;
    heroImage: string;
    isActive: boolean;
    members: Array<string>;
    about?: string;
    madrasah_id: string;
}

export interface RoomData extends InfoMetadata {
    id: string;
    totalMember: number;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: AppUser;
    ratings: number;
    heroImage: string;
    isActive: boolean;
    members: AppUser[];
    about?: string;
}

