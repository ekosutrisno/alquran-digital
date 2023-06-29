import type { MainMenuType, QuickMenuType } from "@/types/user.interface"

export const mainMenu: MainMenuType[] = [
    {
        id: '0',
        title: 'Search',
        description: 'Mencari secara spesifik berdasarkan nomor Surah dan nomor Ayah',
        to: '/app/dashboard/search',
        total: 6236
    },
    {
        id: '1',
        title: 'Surah',
        description: 'Mencari berdasarkan Surat yang disajikan secara terurut.',
        to: '/app/dashboard/surah',
        total: 114
    },
    {
        id: '2',
        title: 'Page',
        description: 'Mencari berdasarkan Page yang disajikan secara terurut.',
        to: '/app/dashboard/pages',
        total: 604
    },
    {
        id: '3',
        title: 'Manzil',
        description: 'Mencari berdasarkan Manzil yang disajikan secara terurut.',
        to: '/app/dashboard/manzil',
        total: 7
    },
    {
        id: '4',
        title: 'Rukuk',
        description: 'Mencari berdasarkan Rukuk yang disajikan secara terurut.',
        to: '/app/dashboard/rukuk',
        total: 556
    },
    {
        id: '5',
        title: 'Sajda',
        description: 'Mencari berdasarkan Sajda yang disajikan secara terurut.',
        to: '/app/dashboard/sajda',
        total: 15
    },
    {
        id: '6',
        title: 'Juz',
        description: 'Mencari berdasarkan Juz yang disajikan secara terurut.',
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
        description: 'Koleksi ayat-ayat favorit.',
        to: '/app/dashboard/favorite'
    },
    {
        id: '3',
        icon: 'books',
        title: 'Surah Pilihan',
        description: 'Baca surah-surah pilihan.',
        to: '/app/dashboard/surah-pilihan'
    },
    {
        id: '4',
        icon: 'classroom',
        title: 'Ruang Kelas',
        description: 'Ruang kelas hafalan.',
        to: '/app/dashboard/class-room'
    }
]