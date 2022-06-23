<template>
    <router-link to="#">
        <div class="w-full p-4 space-y-4 text-slate-800 dark:text-slate-50 hover:ring-sky-500 dark:hover:ring-sky-500 transition flex flex-col justify-between bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 card-shadow-sm min-h-[150px] rounded dark:ring-slate-700/50">
            <!-- Header -->
            <div class="flex flex-col items-start justify-between">
                <p class="font-semibold">Room &bull; <span class="text-xs font-normal">since 25 February 2019</span></p>
                <p class="text-sm">Rabu-Kamis 09:00 - 14:00</p>
            </div> 
            <div>
                <p class="text-5xl font-medium">12 IPA {{ id }}</p>
                <p class="text-sm mt-2 truncate max-w-xs text-slate-500/75 dark:text-slate-300 font-light">Merupakan kelas unggulan di MAN 1 Model Bandar Lampung dan telah terakreditasi A</p>
            </div>   
            <!-- Member preview Footer-->
            <div class="flex items-center justify-between">
                <p>MAN 1 Model Bandar Lampung</p>
                <div class="flex -space-x-1 overflow-hidden">
                    <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-700" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-700" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-700" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                    <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-700" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
defineProps<{id: number}>()
</script>

<style scoped>

</style>