import { DocumentReference } from "firebase/firestore";
import { User } from "./user.interface";

export interface Room {
    id: string;
    createdDate: number;
    totalMember: number;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: DocumentReference;
    ratings: number;
    heroImage: string;
}

export interface RoomData {
    id: string;
    createdDate: number;
    totalMember: number;
    name: string;
    description: string;
    organization: string;
    scheduleDay: string;
    scheduleTime: string;
    mentor: User;
    ratings: number;
    heroImage: string;
}

