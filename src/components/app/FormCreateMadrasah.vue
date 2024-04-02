<template>
    <form @submit.prevent="$emit('send')" class="mt-4 md:mt-0 w-full max-w-lg space-y-4">
        <div>
            <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nama Sekolah</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" required autocomplete="off" v-model="createMadrasahReq.name" name="name" id="name"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Ketikkan nama sekolah" />
            </div>
            <p class="text-xs mt-2 dark:text-slate-400">Nama sekolah minimal 3 karakter dan harus menggunakan alphabet atau angka</p>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="email" required autocomplete="off" v-model="createMadrasahReq.email" name="email" id="email"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Ketikkan email sekolah" />
            </div>
        </div>
        
        <div>
            <label for="description"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi singkat sekolah</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <textarea required rows="3" autocomplete="off" v-model="createMadrasahReq.description" name="description" id="description"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Deskripsikan secara singkat sekolahmu" />
            </div>
        </div>
        <div class="space-x-4 float-right">
            <button type="button" @click="$router.push({query: {step: 1}})" class="mt-6 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                <span>Sebelumnya</span>
            </button>
            <button type="submit" class="mt-6 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                <span>Buat Sekolah</span>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useMadrasah } from '@/services';
import { storeToRefs } from 'pinia';

defineEmits(['send']);

const { createMadrasahReq } = storeToRefs(useMadrasah());
</script>