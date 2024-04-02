import { DocumentReference } from "firebase/firestore";
import { InfoMetadata } from "./user.interface";

export interface Madrasah extends InfoMetadata {
    code: string | number;
    name: string;
    headMaster: DocumentReference | null;
    govermentCode: string;
    description: string;
    postalCode: string;
    email: string;
    phoneNumber: string;
    address: string;
    province: string;
    district: string;
    subDistrict: string;
    ward: string;
    logo?: string;
    public: boolean;
    type: MadrasahTypeOption
}

export type MadrasahTypeOption = 'SM' | 'SU' | 'SP';

export interface MadrasahType {
    img: string,
    type: MadrasahTypeOption,
    title: string;
    description: string
}


export interface CreateMadrasahRequest {
    name: string,
    email: string,
    description: string
}