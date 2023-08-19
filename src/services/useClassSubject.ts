import { ClassSubject } from "@/types/subject.interface";
import { defineStore } from "pinia";

import { classSubjects } from '@/assets/data/data-dummy';

interface ClassSubjectState {
    subjects: ClassSubject[];
    subject: ClassSubject;
}

export const useClassSubject = defineStore('useClassSubject', {
    state: (): ClassSubjectState => ({
        subjects: classSubjects,
        subject: {} as ClassSubject
    })
})