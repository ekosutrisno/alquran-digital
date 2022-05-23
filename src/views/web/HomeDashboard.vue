<template>
    <div class="grid lg:grid-cols-2 lg:p-6 w-full h-full mx-auto my-auto">
        <div v-for="menu in state.menus" :key="menu.id" class="p-4">
            <MenuDashboardCard
                :menu="menu"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuDashboardCard from '@/components/MenuDashboardCard.vue';
import { reactive } from 'vue';

const state = reactive({
    menus:[
        {
            id: 1,
            headerDescription:"Personal User",
            footerDescription:"Tipe personal user digunakan untuk orang perorangan pribadi yang ingin mengetahui perkembangan proses bacaannya.",
            features: [
                "Mendengarkan via audio",
                "Menandai bacaan terakhir",
                "Menyimpan ayat-ayat favorit",
                "History/Aktivitas bacaan"
            ],
            linkToAction:"personal"
        },
        {
            id: 2,
            headerDescription:"Madrasah",
            footerDescription:"Tipe Madrasah digunakan untuk memanagement kelas hafalan para peserta didik, agar lebih mudah diketahui perkembangannya secara digital",
            features: [
                "All Personal User feature",
                "+ Pengelolaan Kelas",
                "+ Lapor Bacaan"
            ],
            linkToAction:"madrasah"
        }
    ]
})
</script>