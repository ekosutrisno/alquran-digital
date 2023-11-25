import { AES, enc } from 'crypto-js';

const secretKey = import.meta.env.VITE_BASE_FIREBASE_APIKEY;

export function encrypt(value: string): string {
    return AES.encrypt(value, secretKey).toString();
}

export function decrypt(encryptedValue: string): string {
    const bytes = AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(enc.Utf8);
}