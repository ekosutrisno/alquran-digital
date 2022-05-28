<template>
    <div :class="[state.wideMenu ? '' : 'max-w-7xl']" class="grid lg:grid-cols-2 lg:p-6 w-full h-full mx-auto">
        <div v-for="menu in state.menus" :key="menu.id" class="p-4">
            <MenuDashboardCard
                :menu="menu"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuDashboardCard from '@/components/MenuDashboardCard.vue';
import { useUtil } from '@/services';
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

const utilService = useUtil();

const state = reactive({
    menus:[
        {
            id: 1,
            headerDescription:"Personal",
            title: "Mengelola Bacaan dan Hapalan Al-Quran Personalmu",
            footerDescription:"Tipe Personal digunakan untuk orang perorangan pribadi yang ingin mengetahui perkembangan proses bacaannya.",
            features: [
                "Mendengarkan via audio",
                "Menandai bacaan terakhir",
                "Menyimpan ayat-ayat favorit",
                "History/Aktivitas bacaan"
            ],
            linkToAction:"personal",
            plan: "Personal, Free",
            imageUrl:{
                main: "https://images.unsplash.com/photo-1596193433486-02333accdc13?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cXVyYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500",
                feature1: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cXVyYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500",
                feature2: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cXVyYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500"
            }
        },
        {
            id: 2,
            headerDescription:"Madrasah",
            title: "Mengelola Bacaan dan Hapalan Al-Quran Peserta Didik",
            footerDescription:"Tipe Madrasah digunakan untuk memanagement kelas hafalan para peserta didik, agar lebih mudah diketahui perkembangannya secara digital.",
            features: [
                "All Personal User feature",
                "+ Pengelolaan Kelas",
                "+ Lapor Bacaan"
            ],
            linkToAction:"madrasah",
            plan: "Organization, Freemium",
            imageUrl:{
                main: "https://images.unsplash.com/photo-1589995635011-078e0bb91d11?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHF1cmFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
                feature1: "https://images.unsplash.com/photo-1559355324-a5879d536e84?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHF1cmFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
                feature2: "https://images.unsplash.com/photo-1618554844984-d4ed47c7e0c0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHF1cmFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500"
            }
        }
    ],
    wideMenu: computed(()=>utilService.wideMenu)

})
</script>