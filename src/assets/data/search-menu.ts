import { SearchItem } from '@/types/user.interface';
export const menuSearchList: Array<SearchItem> = [
    {
        to: 'AppDashboard',
        id: 1,
        info: 'Main Dashboard',
        text: 'Dashboard',
        desc: "Main Dasboard Al-Qur'an Digital."
    },
    {
        to: 'BacaankuPage',
        id: 2,
        info: 'Bacaanku Page',
        text: 'Bacaanku',
        desc: 'Halaman bacaan terakhir yang kamu tandai.'
    },
    {
        to: 'FavoritePage',
        id: 3,
        info: 'Favorite Page',
        text: 'Favorite',
        desc: 'Menyimpan semua ayat-ayat favorit.'
    },
    {
        to: 'SettingPage',
        id: 4,
        info: 'User Settings Page',
        text: 'User Settings',
        desc: 'Semua pengaturan user dan aplikasi.',
        query: {
            tab: 'profile'
        }
    },
    {
        to: 'MadrasahPage',
        id: 6,
        info: 'Class Room Page',
        text: 'Class Room',
        desc: 'Ruang kelas belajar, status peserta, dan chat.'
    },
    {
        to: 'NotificationPage',
        id: 8,
        info: 'List of Notifications Page',
        text: 'Notifications',
        desc: "Semua riwayat notifikasi akun Al-Qur'an Digital milikmu."
    },
    {
        to: 'SurahPilihan',
        id: 5,
        info: 'Surah Pilihan Page',
        text: 'Surah Pilihan',
        desc: 'Semua surah-surah pilihan yang kamu simpan.'
    },
    {
        to: 'SurahPage',
        id: 7,
        info: 'List of Surah Metadata Page',
        text: 'Surah',
        desc: 'Berisi indek dari 114 surah yang tersimpan, search, dll.'
    },
    {
        to: 'PagesPage',
        id: 7,
        info: "Al-Qur'an Per Halaman",
        text: "Halaman Al-Qur'an",
        desc: "Mencari Al-Qur'an per halaman"
    },
    {
        to: 'ManzilPage',
        id: 7,
        info: "Al-Qur'an Per Manzil",
        text: "Manzil Al-Qur'an",
        desc: "Mencari Al-Qur'an per Manzil"
    },
    {
        to: 'RukukPage',
        id: 7,
        info: "Al-Qur'an Per Rukuk",
        text: "Rukuk Al-Qur'an",
        desc: "Mencari Al-Qur'an per Rukuk"
    },
    {
        to: 'SajdaPage',
        id: 7,
        info: "Al-Qur'an Per Sajda",
        text: "Sajda Al-Qur'an",
        desc: 'List Semua Ayat Sajda'
    },
    {
        to: 'JuzPage',
        id: 7,
        info: "Al-Qur'an Per Juz",
        text: "Juz Al-Qur'an",
        desc: 'List Semua Juz 1-30'
    },
];