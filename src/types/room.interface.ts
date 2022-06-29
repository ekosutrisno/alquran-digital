import { DocumentReference } from "firebase/firestore";
import { InfoMetadata, User } from "./user.interface";

export interface Room extends InfoMetadata {
    id: string;
    totalMember: number;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: DocumentReference;
    ratings: number;
    heroImage: string;
    isActive: boolean;
    members: string[];
}

export interface RoomData extends InfoMetadata {
    id: string;
    totalMember: number;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: User;
    ratings: number;
    heroImage: string;
    isActive: boolean;
    members: User[];
}

