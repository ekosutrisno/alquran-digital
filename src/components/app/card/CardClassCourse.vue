<template>
 <div class="relative">
    <div class="border-slate-200 dark:border-slate-700 card-shadow-sm dark:bg-slate-800 relative w-full border bg-white transition-all duration-300 rounded-xl flex h-full flex-col p-6">
        <div class="mb-6">
            <span class="inline-block px-3 font-sans transition-shadow duration-300 py-1.5 text-xs rounded-md bg-purple-500 dark:bg-purple-500 text-white">
                <span>{{ subject.subject }}</span>
            </span>
        </div>
        <div class="mb-6">
            <h3 class="font-heading text-lg font-medium leading-tight mb-2">
                <span class="text-slate-800 dark:text-slate-100">{{ subject.code }} - {{ subject.title }}</span>
            </h3>
            <p class="font-alt text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
                <span>{{ subject.description }}</span>
            </p>
        </div>
        <div class="mb-8 mt-auto flex items-center justify-between">
            <div class="flex">
                <div class="dark:bg-slate-800 relative flex shrink-0 items-center justify-center rounded-full bg-white transition-all duration-100 ease-in hover:-ms-2 hover:me-2 focus:me-2">
                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-purple-500/20 text-primary-500 !scale-90" tooltip="Clark Smith" tabindex="0">
                        <div class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                            <img src="https://tairo.cssninja.io/img/avatars/3.svg" class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-10 w-10">
                        </div>
                    </div>
                </div>
                <div class="dark:bg-slate-800 relative flex shrink-0 items-center justify-center rounded-full bg-white transition-all duration-100 ease-in hover:-ms-2 hover:me-2 focus:me-2 -ms-3 h-10 w-10 focus:-ms-5">
                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-purple-500/20 text-primary-500 !scale-90" tooltip="Maya Rosselini" tabindex="0">
                        <div class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                            <img src="https://tairo.cssninja.io/img/avatars/2.svg" class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-10 w-10">
                        </div>
                    </div>
                </div>
                <div class="dark:bg-slate-800 relative flex shrink-0 items-center justify-center rounded-full bg-white transition-all duration-100 ease-in hover:-ms-2 hover:me-2 focus:me-2 -ms-3 h-10 w-10 focus:-ms-5">
                    <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-purple-500/20 text-primary-500 !scale-90" tooltip="Clarissa Miller" tabindex="0">
                        <div class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                            <img src="https://tairo.cssninja.io/img/avatars/5.svg" class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-10 w-10">
                        </div>
                    </div>
                </div>
                <div class="dark:bg-slate-800 shrink-0 rounded-full bg-white transition-all duration-100 ease-in -ms-3 h-10 w-10">
                    <div class="bg-slate-200 dark:border-slate-800 dark:bg-slate-700 relative inline-flex h-full w-full scale-90 items-center justify-center rounded-full border-white">
                        <span class="text-slate-500 dark:text-slate-300 -ms-1 font-sans font-normal uppercase text-sm"> +1</span>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-slate-700 bg-white border-slate-300 dark:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:enabled:bg-slate-600 hover:enabled:bg-slate-50 dark:active:enabled:bg-slate-700/70 active:enabled:bg-slate-100 rounded-md">
                    <span>Ruang Diskusi</span>
                </button>
            </div>
        </div>
        <div class="mb-8">
            <h4 class="font-heading text-base font-medium leading-tight text-slate-800 dark:text-slate-100 mb-2">
                <span>Minggu ke {{ subject.week }}</span>
            </h4>
            <div class="flex gap-6">
                <div class="text-slate-400 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256">
                        <g fill="currentColor">
                            <path d="M216 136a88 88 0 1 1-88-88a88 88 0 0 1 88 88Z" opacity=".2"></path>
                            <path d="M128 40a96 96 0 1 0 96 96a96.11 96.11 0 0 0-96-96Zm0 176a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80Zm45.66-125.66a8 8 0 0 1 0 11.32l-40 40a8 8 0 0 1-11.32-11.32l40-40a8 8 0 0 1 11.32 0ZM96 16a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z"></path>
                        </g>
                    </svg>
                    <span class="font-sans text-sm">{{ subject.time }} min</span>
                </div>
                <div class="text-slate-400 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256">
                        <g fill="currentColor">
                            <path d="M224 128a96 96 0 0 1-144.07 83.11l-37.39 12.47a8 8 0 0 1-10.12-10.12l12.47-37.39A96 96 0 1 1 224 128Z" opacity=".2"></path>
                            <path d="M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24Zm0 192a87.87 87.87 0 0 1-44.06-11.81a8 8 0 0 0-4-1.08a7.85 7.85 0 0 0-2.53.42L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216Zm12-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm88 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"></path>
                        </g>
                    </svg>
                    <span class="font-sans text-sm">{{ subject.commentRoom.length }} komentar</span>
                </div>
            </div>
        </div>
        <div class="mb-8">
            <h4 class="font-heading text-base font-medium leading-tight text-slate-800 dark:text-slate-100 mb-2">
                <span>Ujian minggu ke {{ subject.week }}</span>
            </h4>
            <div class="flex gap-6">
                <div class="text-slate-400 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon h-5 w-5" width="1em" height="1em" viewBox="0 0 256 256">
                        <g fill="currentColor">
                            <path d="M216 48v40H40V48a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Z" opacity=".2"></path>
                            <path d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Zm-38.34-85.66a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L116 164.69l42.34-42.35a8 8 0 0 1 11.32 0Z"></path>
                        </g>
                    </svg>
                    <span class="font-sans text-sm">{{ formatDateWithMonth(subject.examinationDate) }} — 10:00 - 12:00</span>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button type="button" class="py-2 px-3 rounded-lg bg-purple-500 dark:bg-purple-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-purple-500 active:enabled:bg-purple-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-purple-500 dark:active:enabled:bg-purple-500 w-full">
                <span>Detail Pelajaran</span>
            </button>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ClassSubject } from '@/types/subject.interface';
import { formatDateWithMonth } from '@/utils/helperFunction';


defineProps<{subject: ClassSubject}>()
</script>