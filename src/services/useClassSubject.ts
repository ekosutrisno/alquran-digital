import { ClassSubject } from "@/types/subject.interface";
import { defineStore } from "pinia";

import { classSubjects } from '@/assets/data/subject';

interface ClassSubjectState {
    subjects: ClassSubject[]
}

export const useClassSubject = defineStore('useClassSubject', {
    state: (): ClassSubjectState => ({
        subjects: classSubjects
    })
})