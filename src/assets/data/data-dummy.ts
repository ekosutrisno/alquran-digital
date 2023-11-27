// Anggap Anda sudah mengimpor yang diperlukan untuk DocumentReference dan InfoMetadata

import { Madrasah, MadrasahType } from "@/types/madrasah.interface";
import { ClassSubject } from "@/types/subject.interface";

export const daftarMadrasah: Madrasah[] = [
    {
        code: "MAD001",
        name: "Madrasah Al-Falah",
        govermentCode: "12345",
        description: "Sebuah lembaga pendidikan Islam ternama.",
        postalCode: "12345",
        email: "info@alfalah.com",
        phoneNumber: "+123456789",
        address: "Jalan Utama 123",
        province: "Jawa Barat",
        district: "Bandung",
        subDistrict: "Cimahi",
        ward: "Cibabat",
        headMaster: null,
        createdDate: 1656478778758,
        lastModifiedDate: 1656478778758,
        logo: 'https://madrasahjamilurrahman.sch.id/wp-content/uploads/2020/09/Logo-MA-Jamilurrahman-1.png',
        public: true
    },
    {
        code: "MAD002",
        name: "Madrasah Baitul Ilmi",
        govermentCode: "54321",
        description: "Lembaga pendidikan dengan fokus pada studi Al-Quran.",
        postalCode: "54321",
        email: "kontak@baitulilmi.com",
        phoneNumber: "+987654321",
        address: "Jalan Elm 456",
        province: "Jawa Tengah",
        district: "Semarang",
        subDistrict: "Banyumanik",
        ward: "Banyumanik Timur",
        headMaster: null,
        createdDate: new Date("2023-08-17"),
        lastModifiedDate: new Date("2023-08-17"),
        logo: 'https://madrasahjamilurrahman.sch.id/wp-content/uploads/2020/09/Logo-MA-Jamilurrahman-1.png',
        public: false
    },
    {
        code: "MAD003",
        name: "Madrasah Hidayah",
        govermentCode: "78901",
        description: "Menyediakan pendidikan Islam komprehensif untuk masyarakat.",
        postalCode: "78901",
        email: "info@hidayah.com",
        phoneNumber: "+987612345",
        address: "Jalan Oak 789",
        province: "Jawa Timur",
        district: "Surabaya",
        subDistrict: "Gubeng",
        ward: "Gubeng Kertajaya",
        headMaster: null,
        createdDate: new Date("2023-08-17"),
        lastModifiedDate: new Date("2023-08-17"),
        logo: 'https://madrasahjamilurrahman.sch.id/wp-content/uploads/2020/09/Logo-MA-Jamilurrahman-1.png',
        public: true
    }
];


export const classSubjects: ClassSubject[] = [
    {
        createdDate: Date.now(),
        lastModifiedDate: Date.now(),
        code: "CS101",
        subject: "Pengenalan Ilmu Komputer",
        title: "Pengantar Ilmu Komputer",
        description: "Sebuah kursus pengantar tentang konsep ilmu komputer.",
        members: ["MahasiswaA", "MahasiswaB", "MahasiswaC"],
        discussionRoom: "CS101-Diskusi",
        commentRoom: "CS101-Komentar",
        week: 1,
        year: 2023,
        time: 90,
        examinationDate: "2023-12-15",
        examinationTime: "09:00 Pagi",
        colorAccent: ""
    },
    {
        createdDate: Date.now(),
        lastModifiedDate: Date.now(),
        code: "MATH202",
        subject: "Matematika Lanjutan",
        title: "Matematika Lanjutan",
        description: "Sebuah kursus tentang topik matematika lanjutan.",
        members: ["MahasiswaX", "MahasiswaY", "MahasiswaZ"],
        discussionRoom: "MATH202-Diskusi",
        commentRoom: "MATH202-Komentar",
        week: 2,
        year: 2023,
        time: 120,
        examinationDate: "2023-12-20",
        examinationTime: "11:00 Pagi",
        colorAccent: ""
    },
    {
        createdDate: Date.now(),
        lastModifiedDate: Date.now(),
        code: "PHYS301",
        subject: "Fisika Mekanika Kuantum",
        title: "Fisika Kuantum",
        description: "Eksplorasi prinsip-prinsip mekanika kuantum.",
        members: ["MahasiswaP", "MahasiswaQ", "MahasiswaR"],
        discussionRoom: "PHYS301-Diskusi",
        commentRoom: "PHYS301-Komentar",
        week: 3,
        year: 2023,
        time: 150,
        examinationDate: "2023-12-25",
        examinationTime: "02:00 Sore",
        colorAccent: ""
    },
    {
        createdDate: Date.now(),
        lastModifiedDate: Date.now(),
        code: "HIST101",
        subject: "Sejarah Dunia",
        title: "Gambaran Sejarah",
        description: "Sebuah kursus survei tentang sejarah dunia.",
        members: ["MahasiswaM", "MahasiswaN", "MahasiswaO"],
        discussionRoom: "HIST101-Diskusi",
        commentRoom: "HIST101-Komentar",
        week: 4,
        year: 2023,
        time: 90,
        examinationDate: "2023-12-30",
        examinationTime: "10:00 Pagi",
        colorAccent: ""
    }
];

export const madrasahType: MadrasahType[] = [
    {
        img: 'https://tairo.cssninja.io/img/illustrations/wizard/design.svg',
        type: 'SM',
        title: 'Sekolah Madrasah',
        description: 'Sekolah yang dikelola dan dibawah naungan Kementrian Agama.'
    },
    {
        img: 'https://tairo.cssninja.io/img/illustrations/wizard/development.svg',
        type: 'SU',
        title: 'Sekolah Umum',
        description: 'Sekolah yang dikelola dan dibawah naungan Kemendikbud.'
    },
    {
        img: 'https://tairo.cssninja.io/img/illustrations/wizard/marketing.svg',
        type: 'SP',
        title: 'Sekolah Swasta',
        description: 'Sekolah yang dikelola oleh badan swasta atau yayasan.'
    },
]