import { Madrasah } from "@/types/madrasah.interface";
import { defineStore } from "pinia";
import { daftarMadrasah } from '@/assets/data/data-dummy';
interface MadrasahState {
    madrasahList: Madrasah[];
    madrasah: Madrasah;
    isLoading: boolean;
}

export const useMadrasah = defineStore('useMadrasah', {
    state: (): MadrasahState => ({
        madrasahList: daftarMadrasah,
        madrasah: {} as Madrasah,
        isLoading: false
    })
})