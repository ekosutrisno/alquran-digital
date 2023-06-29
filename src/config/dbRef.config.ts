import { db } from "@/config/firebase.config";
import { CollectionReference, DocumentData, OrderByDirection, collection, doc, limit, orderBy, query, where } from "firebase/firestore";
import { TABLES } from "./db.config";

/**
 * All User Collection Reference
 * userCollectionRefConfig, userDataRefConfig
 */
export const userCollectionRefConfig = () => collection(db, TABLES.USER_COLLECTIONS);
export const userDataRefConfig = (userId: string) => doc(db, TABLES.USER_COLLECTIONS, userId);

/**
 * All Role Collection Reference
 * roleCollectionRefConfig
 */
export const roleDataRefConfig = (roleId: string) => doc(db, TABLES.ROLE_COLLECTIONS, roleId);


/**
 * All Surah Collection Reference
 * surahCollectionRefConfig, surahDataRefConfig
 */
export const surahCollectionRefConfig = () => collection(db, TABLES.SURAH_COLLECTIONS);
export const surahDataRefConfig = (surahId: string) => doc(db, TABLES.SURAH_COLLECTIONS, surahId);
export const surahAyahCollectionRefConfig = (surahId: string) => collection(surahDataRefConfig(surahId), TABLES.AYAHS);

/**
 * All Ayah Collection Reference
 * ayahCollectionRefConfig, ayahDataRefConfig
 */
export const ayahCollectionRefConfig = () => collection(db, TABLES.AYAH_COLLECTIONS);
export const ayahDataRefConfig = (ayahId: string) => doc(db, TABLES.AYAH_COLLECTIONS, ayahId);

/**
 * All User Ayat Favorite Collection Reference
 * userAyatFavoriteCollectionRefConfig, userAyatFavoriteDataRefConfig
 */
export const userAyatFavoriteCollectionRefConfig = (userId: string) => collection(userDataRefConfig(userId), TABLES.FAVORITS);
export const userAyatFavoriteDataRefConfig = (userId: string, ayaId: string) => doc(userDataRefConfig(userId), TABLES.FAVORITS, ayaId);

/**
 * All User Surah Pilihan Collection Reference
 * userSurahPilihanCollectionRefConfig, userSurahPilihanDataRefConfig
 */
export const userSurahPilihanCollectionRefConfig = (userId: string) => collection(userDataRefConfig(userId), TABLES.SURAH_PILIHAN);
export const userSurahPilihanDataRefConfig = (userId: string, suratId: string) => doc(userDataRefConfig(userId), TABLES.SURAH_PILIHAN, suratId);

/**
 * All Notification Collection Reference
 * notificationCollectionRefConfig, notificationDataRefConfig
 */
export const notificationCollectionRefConfig = () => collection(db, TABLES.NOTIFICATION_COLLECTIONS);
export const notificationDataRefConfig = (notifId: string) => doc(db, TABLES.NOTIFICATION_COLLECTIONS, notifId);

/**
 * All Room Collection Reference
 * roomCollectionRefConfig, roomDataRefConfig
 */
export const roomCollectionRefConfig = () => collection(db, TABLES.ROOM_COLLECTIONS);
export const roomDataRefConfig = (roomId: string) => doc(db, TABLES.ROOM_COLLECTIONS, roomId);

/**
 * All Page Collection Reference
 * pageCollectionRefConfig
 */
export const pageCollectionRefConfig = () => collection(db, TABLES.PAGE_COLLECTIONS);

/**
 * All Juz Collection Reference
 * juzCollectionRefConfig
 */
export const juzCollectionRefConfig = () => collection(db, TABLES.JUZ_COLLECTIONS);

/**
 * All Rukuk Collection Reference
 * rukukCollectionRefConfig
 */
export const rukukCollectionRefConfig = () => collection(db, TABLES.RUKUK_COLLECTIONS);

/**
 * All Manzil Collection Reference
 * manzilCollectionRefConfig
 */
export const manzilCollectionRefConfig = () => collection(db, TABLES.MANZIL_COLLECTIONS);

/**
 * All Sajda Collection Reference
 * sajdaCollectionRefConfig
 */
export const sajdaCollectionRefConfig = () => collection(db, TABLES.SAJDA_COLLECTIONS);

/**
 * All Generic Query
 * queryByPropertyRefConfig, queryOrderByRefConfig
 */
export const queryByPropertyRefConfig = (colRef: CollectionReference<DocumentData>, property: string, q: string) => query(colRef, where(property, '==', q));
export const queryOrderByRefConfig = (colRef: CollectionReference<DocumentData>, property: string, order: OrderByDirection, limitNumber?: number) => limitNumber ? query(colRef, orderBy(property, order), limit(limitNumber)) : query(colRef, orderBy(property, order));