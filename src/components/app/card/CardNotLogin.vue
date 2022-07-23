<template>
    <div class="mx-auto w-full max-w-xs">
        <router-link to="/auth/login">
            <div class="transition-shadow relative h-20 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-sky-400/90 via-sky-500 to-sky-400/90"></div>
                <div class="h-16 absolute z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                    <span class="font-semibold text-white">Fitur Non Aktif</span> 
                    <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-10 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <div class="bg-gray-900 absolute inset-0 z-0 bg-opacity-30"></div>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts"></script>