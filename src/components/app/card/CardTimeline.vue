<template>
    <div class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden">
        <time :datetime="String(item.actualDate)" class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0">
            <svg v-if="idx == 0" viewBox="0 0 12 12" class="w-3 h-3 mr-6 overflow-visible text-sky-400">
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <circle cx="6" cy="6" r="11" fill="none" stroke="currentColor" stroke-width="2"></circle>
                <path d="M 6 18 V 1000" fill="none" stroke-width="2" stroke="currentColor" class="text-sky-200"></path>
            </svg>
            <svg v-else viewBox="0 0 12 12" class="w-3 h-3 mr-6 overflow-visible text-sky-400">
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path d="M 6 -6 V -50" fill="none" stroke-width="1.5" stroke="currentColor" class="text-sky-200 dark:text-slate-700"></path>
                <path d="M 6 18 V 1000" fill="none" stroke-width="1.5" stroke="currentColor" class="text-sky-200 dark:text-slate-700"></path>
            </svg>


            <div class="dark:text-slate-300 text-sm text-slate-500">
                <span v-if="item.key == today" class="text-left">Today</span>
                <span v-else-if="item.key == yesterdays" class="text-left">Yesterday</span>
                <span v-else class="text-left">{{ formatDateWithMonth(item.actualDate) }}</span>
            </div>
        </time>
        <p class="md:col-start-3 md:col-span-6 xl:col-span-7">
            <CardNotification v-for="notif in item.data" :notif="notif"/>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { NotificationMapper } from '@/types/user.interface';
import { formatDateWithMonth, formatToString, yesterday } from '@/utils/helperFunction';
import { computed } from 'vue';
import CardNotification from './CardNotification.vue';
defineProps<{ item: NotificationMapper, idx: number }>();

const today = computed(() => formatToString(new Date()));
const yesterdays = computed(() => yesterday());
</script>