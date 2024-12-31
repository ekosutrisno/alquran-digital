import { StorableData } from "@/utils/indexedDb";

export interface DBMadrasahStore extends StorableData {
    madrasah: DBMadrasah[];
};

export interface DBMadrasah {
    madrasah: string;
    rooms: string[];
};