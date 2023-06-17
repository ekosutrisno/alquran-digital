<template>
    <div @click="readNotification(notif)" :class="[notif.read ? '' : 'border-r-2 md:border-l-2 border-r-sky-500 md:border-l-sky-500 bg-sky-50 dark:bg-slate-800/50 py-3', 'inline-flex cursor-pointer group items-start text-left space-x-3 w-full mb-3 text-slate-900 rounded-r-lg dark:text-white with-transition transition']">
        <NotificationType :type="notif.type" class="h-6 w-6" aria-hidden="true" />
        <div class="flex flex-col w-full">
            <div class="text-sm font-medium flex items-center justify-between">
                <div class="group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">{{ notif.title }}</div>
                <div>
                    <div v-if="!notif.read" class="w-1 h-1 rounded-full bg-red-600"></div>
                </div>
            </div>
            <span class="text-sm dark:text-slate-100 prose max-w-none whitespace-pre-wrap">{{ notif.body }}</span>
            <span class="mt-1.5 text-xs">{{ formatDateFromNow(notif.timestamp) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import NotificationType from '@/components/shared/NotificationType.vue';
import { useNotification } from '@/services';
import { UserNotification } from '@/types/user.interface';
import { formatDateFromNow } from '@/utils/helperFunction';

defineProps<{ notif: UserNotification }>();
const { readNotification } = useNotification();
</script>