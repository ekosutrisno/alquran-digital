import { DBMadrasahStore } from "@/types/db.interface";
import { IndexedDBStore } from "@/utils/indexedDb";

export const madrasah_db = new IndexedDBStore<DBMadrasahStore>();