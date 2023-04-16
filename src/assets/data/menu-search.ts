import { SearchItem } from '@/types/user.interface';
export const menuSearchList: Array<SearchItem> = [
    {
        to: '/app/dashboard',
        id: 1,
        info: 'Main Dashboard',
        text: 'Dashboard',
        desc: 'Main Dasboard Al-Quran Digital.'
    },
    {
        to: '/app/dashboard/bacaanku',
        id: 2,
        info: 'Bacaanku Page',
        text: 'Bacaanku',
        desc: 'Halaman bacaan terakhir yang kamu tandai.'
    },
    {
        to: '/app/dashboard/favorite',
        id: 3,
        info: 'Favorite Page',
        text: 'Favorite',
        desc: 'Menyimpan semua ayat-ayat favorit.'
    },
    {
        to: '/app/dashboard/settings',
        id: 4,
        info: 'User Settings Page',
        text: 'User Settings',
        desc: 'Semua pengaturan user dan aplikasi.'
    },
    {
        to: '/app/dashboard/class-room',
        id: 6,
        info: 'Class Room Page',
        text: 'Class Room',
        desc: 'Ruang kelas belajar, status peserta, dan chat.'
    },
    {
        to: '/app/dashboard/notification',
        id: 8,
        info: 'List of Notifications Page',
        text: 'Notifications',
        desc: 'Semua riwayat notifikasi akun Al-Quran Digital milikmu.'
    },
    {
        to: '/app/dashboard/surah-pilihan',
        id: 5,
        info: 'Surah Pilihan Page',
        text: 'Surah Pilihan',
        desc: 'Semua surah-surah pilihan yang kamu simpan.'
    },
    {
        to: '/app/dashboard/surah',
        id: 7,
        info: 'List of Surah Metadata Page',
        text: 'Surah',
        desc: 'Berisi indek dari 114 surah yang tersimpan, search, dll.'
    },
    {
        to: '/app/dashboard/pages',
        id: 7,
        info: 'Al-Quran Per Halaman',
        text: 'Halaman Al-Quran',
        desc: 'Mencari Al-Quran per halaman'
    },
    {
        to: '/app/dashboard/manzil',
        id: 7,
        info: 'Al-Quran Per Manzil',
        text: 'Manzil Al-Quran',
        desc: 'Mencari Al-Quran per Manzil'
    },
    {
        to: '/app/dashboard/rukuk',
        id: 7,
        info: 'Al-Quran Per Rukuk',
        text: 'Rukuk Al-Quran',
        desc: 'Mencari Al-Quran per Rukuk'
    },
    {
        to: '/app/dashboard/sajda',
        id: 7,
        info: 'Al-Quran Per Sajda',
        text: 'Sajda Al-Quran',
        desc: 'List Semua Ayat Sajda'
    },
    {
        to: '/app/dashboard/juz',
        id: 7,
        info: 'Al-Quran Per Juz',
        text: 'Juz Al-Quran',
        desc: 'List Semua Juz 1-30'
    },
];