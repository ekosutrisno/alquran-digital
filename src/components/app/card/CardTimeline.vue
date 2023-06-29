<template>
    <ol :id="`notif_group_${item.key}`" class="relative border-l border-gray-200 dark:border-gray-700">                  
        <li class="mb-10 ml-6">            
            <span class="absolute flex items-center justify-center w-6 h-6 bg-sky-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-sky-900">
                <svg aria-hidden="true" class="w-3 h-3 text-sky-800 dark:text-sky-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                <span v-if="item.key == today" class="text-left">Today</span>
                <span v-else-if="item.key == yesterdays" class="text-left">Yesterday</span>
                <span v-else class="text-left">{{ formatDateWithMonth(item.actualDate) }}</span>
                <span v-if="idx == 0" class="bg-sky-100 text-sky-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300 ml-3">Latest</span>
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Notification received {{ formatDateWithMonth(item.actualDate) }}</time>
            <div class="mt-4">
                <CardNotification v-for="notif in item.data" :notif="notif" :group="item.key" />
            </div>
        </li>
    </ol>
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