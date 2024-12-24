import { DBMadrasah, DBMadrasahRoom } from "@/types/db.interface";
import { IndexedDBStore } from "@/utils/indexedDb";

export const madrasah_db = new IndexedDBStore<DBMadrasah>();
export const room_db = new IndexedDBStore<DBMadrasahRoom>();
