import { MadrasahType } from "@/types/madrasah.interface";
import { ClassSubject } from "@/types/subject.interface";

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
        title: 'Madrasah',
        description: 'Sekolah yang dikelola dan dibawah naungan Kementrian Agama.'
    },
    {
        img: 'https://tairo.cssninja.io/img/illustrations/wizard/development.svg',
        type: 'SU',
        title: 'Umum',
        description: 'Sekolah yang dikelola dan dibawah naungan Kemendikbud.'
    },
    {
        img: 'https://tairo.cssninja.io/img/illustrations/wizard/marketing.svg',
        type: 'SP',
        title: 'Swasta',
        description: 'Sekolah yang dikelola oleh badan swasta atau yayasan.'
    },
]