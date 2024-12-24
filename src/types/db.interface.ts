import { StorableData } from "@/utils/indexedDb";

export interface DBMadrasah extends StorableData {
    madrasah: string[];
};

export interface DBMadrasahRoom extends StorableData {
    rooms: string[];
};