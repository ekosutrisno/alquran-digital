import type { MainMenuType, QuickMenuType } from "@/types/user.interface"

export const mainMenu: MainMenuType[] = [
    {
        id: '0',
        title: 'Pencarian',
        description: 'Mencari secara spesifik berdasarkan nomor Surah dan nomor Ayah',
        to: 'SearchPage',
        total: 6236,
        tag: 'beta'
    },
    {
        id: '1',
        title: 'Surah',
        description: "Bagian dari Al-Qur'an, merupakan divisi terbesar yang terdiri dari ayat-ayat dengan tema dan pesan tertentu.",
        to: 'SurahPage',
        total: 114
    },
    {
        id: '2',
        title: 'Halaman',
        description: "Satuan fisik dalam Al-Qur'an yang memuat beberapa ayat, membantu pembacaan dan referensi.",
        to: 'PagesPage',
        total: 604
    },
    {
        id: '3',
        title: 'Manzil',
        description: "Pembagian Al-Qur'an menjadi tujuh bagian, membantu pembacaan dalam tujuh hari atau seminggu.",
        to: 'ManzilPage',
        total: 7
    },
    {
        id: '4',
        title: 'Rukuk',
        description: 'Tanda berupa garis horizontal yang menandai akhir ayat, membantu pelafaz menghentikan bacaan.',
        to: 'RukukPage',
        total: 556
    },
    {
        id: '5',
        title: 'Sajda',
        description: 'Ayat-ayat yang memerintahkan muslim untuk melakukan sujud sebagai tanda pengakuan terhadap kebesaran Allah.',
        to: 'SajdaPage',
        total: 15
    },
    {
        id: '6',
        title: 'Juz',
        description: "Pembagian Al-Qur'an menjadi 30 bagian, memudahkan pembacaan dan penyelesaian dalam sebulan.",
        to: 'JuzPage',
        total: 30
    },
]

export const quickMenu: QuickMenuType[] = [
    {
        id: '1',
        icon: 'bookmark',
        title: 'Bacaanku',
        description: 'Menandai bacaan terakhir.',
        to: 'BacaankuPage'
    },
    {
        id: '2',
        icon: 'heart',
        title: 'Favorit',
        description: 'Menyimpan ayat-ayat favorit.',
        to: 'FavoritePage'
    },
    {
        id: '3',
        icon: 'books',
        title: 'Surah Pilihan',
        description: 'Koleksi dan baca surah-surah pilihan.',
        to: 'SurahPilihan'
    },
    {
        id: '4',
        icon: 'classroom',
        title: 'E-Madrasah',
        description: 'Membuat madrasah dan ruang kelas.',
        to: 'MadrasahPage',
        tag: 'alpha'
    }
]