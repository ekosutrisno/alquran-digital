import { InfoMetadata } from "./user.interface";

export interface ClassSubject extends InfoMetadata {
    code: string;
    subject: string;
    title: string;
    description: string;
    members: any[];
    discussionRoom: string;
    commentRoom: string;
    week: number;
    year: number;
    time: number;
    examinationDate: string;
    examinationTime: string;
    colorAccent: string;
}