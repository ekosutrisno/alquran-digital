import type { MainMenuType, QuickMenuType } from "@/types/user.interface"

export const mainMenu: MainMenuType[] = [
    {
        id: '0',
        title: 'Pencarian',
        description: 'Mencari secara spesifik berdasarkan nomor Surah dan nomor Ayah',
        to: '/app/dashboard/search',
        total: 6236
    },
    {
        id: '1',
        title: 'Surah',
        description: 'Bagian dari Al-Quran, merupakan divisi terbesar yang terdiri dari ayat-ayat dengan tema dan pesan tertentu.',
        to: '/app/dashboard/surah',
        total: 114
    },
    {
        id: '2',
        title: 'Halaman',
        description: 'Satuan fisik dalam Al-Quran yang memuat beberapa ayat, membantu pembacaan dan referensi.',
        to: '/app/dashboard/pages',
        total: 604
    },
    {
        id: '3',
        title: 'Manzil',
        description: 'Pembagian Al-Quran menjadi tujuh bagian, membantu pembacaan dalam tujuh hari atau seminggu.',
        to: '/app/dashboard/manzil',
        total: 7
    },
    {
        id: '4',
        title: 'Rukuk',
        description: 'Tanda berupa garis horizontal yang menandai akhir ayat, membantu pelafaz menghentikan bacaan.',
        to: '/app/dashboard/rukuk',
        total: 556
    },
    {
        id: '5',
        title: 'Sajda',
        description: 'Ayat-ayat yang memerintahkan muslim untuk melakukan sujud sebagai tanda pengakuan terhadap kebesaran Allah.',
        to: '/app/dashboard/sajda',
        total: 15
    },
    {
        id: '6',
        title: 'Juz',
        description: 'Pembagian Al-Quran menjadi 30 bagian, memudahkan pembacaan dan penyelesaian dalam sebulan.',
        to: '/app/dashboard/juz',
        total: 30
    },
]

export const quickMenu: QuickMenuType[] = [
    {
        id: '1',
        icon: 'bookmark',
        title: 'Bacaanku',
        description: 'Menandai bacaan terakhir.',
        to: '/app/dashboard/bacaanku'
    },
    {
        id: '2',
        icon: 'heart',
        title: 'Favorit',
        description: 'Menyimpan ayat-ayat favorit.',
        to: '/app/dashboard/favorite'
    },
    {
        id: '3',
        icon: 'books',
        title: 'Surah Pilihan',
        description: 'Koleksi dan baca surah-surah pilihan.',
        to: '/app/dashboard/surah-pilihan'
    },
    {
        id: '4',
        icon: 'classroom',
        title: 'E-Madrasah',
        description: 'Membuat madrasah dan ruang kelas.',
        to: '/app/dashboard/class-room'
    }
]