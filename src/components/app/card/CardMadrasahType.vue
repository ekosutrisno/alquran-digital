<template>
    <div class="p-4 with-transition text-slate-800 dark:text-slate-50 transition flex flex-col justify-between bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 card-shadow-sm min-h-[150px] rounded-xl dark:ring-slate-700">
        <img class="rounded-2xl" :src="type.img" :alt="type.title">
        <div class="my-4 text-center">
            <p class="text-xl leading-normal font-medium text-gray-800 dark:text-gray-100 mb-2" tag="h3">
                <span>{{ type.title }}</span>
            </p>
            <p class="text-gray-400">
                <span>{{ type.description }}</span>
            </p>
        </div>
        <div class="mb-5 flex flex-col items-center">
            <RouterLink :to="{name: 'MadrasahCreatePage', query: {a: 'create', step: '2', type: type.type}}" :class="[class_map(type.type)]" class="w-full lg:w-56 mt-6 float-right inline-flex justify-center py-2 px-3 border border-transparent shadow-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2">
                <span class="text-white">Pilih</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MadrasahType, MadrasahTypeOption } from '@/types/madrasah.interface';

defineProps<{ type: MadrasahType }>()

function class_map(params:MadrasahTypeOption) {
    switch (params) {
        case 'SM':
            return 'focus:ring-orange-300 bg-[#ffa981] hover:bg-[#fcb797]'
        case 'SU':
            return 'focus:ring-green-300 bg-[#62cc9a] hover:bg-[#87e8b7]'
        case 'SP':
            return 'focus:ring-yellow-300 bg-[#e2be5a] hover:bg-[#f1cb64]'
        default:
            return ''
    }
}

</script>