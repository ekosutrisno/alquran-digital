<template>
    <form @submit.prevent="send" class="md:col-span-4 mt-4 md:mt-0 w-full max-w-lg space-y-5">
        <div>
            <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" required autocomplete="off" v-model="data.name" name="name" id="name"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Room name" />
            </div>
            <p class="text-xs mt-2 dark:text-slate-400">Your claa room name will appear in all the class room data usage, max length the name is 20 character for better UI.</p>
        </div>
        <div>
            <label for="organization" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Organization</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input  type="text" required autocomplete="off" v-model="data.organization" name="organization" id="organization"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="organization" />
            </div>
            <p class="text-xs mt-2 dark:text-slate-400">Yours school or community name.</p>
        </div>
        <div>
            <label for="mentor"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Mentor</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" required disabled autocomplete="off" :value="currentUser?.full_name" name="mentor" id="mentor"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Mentor name" />
            </div>
            <p class="text-xs mt-2 dark:text-slate-400">The creator of the class room.</p>
        </div>
        <div>
            <label for="schedule-day"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Schedule Day (eg: Senin-Selasa)</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" required autocomplete="off" v-model="data.scheduleDay" name="schedule-day" id="schedule-day"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Schedule day" />
            </div>
        </div>
        <div>
            <label for="schedule-time"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Schedule Time (eg: 09:00-12:00)</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" required autocomplete="off" v-model="data.scheduleTime" name="schedule-time" id="schedule-time"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Schedule time" />
            </div>
        </div>
        
        <div>
            <label for="description"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <textarea required rows="3" autocomplete="off" v-model="data.description" name="description" id="description"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                    placeholder="Your class short description" />
            </div>
        </div>
        <button type="submit"
            class="mt-6 float-right inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <span>Simpan</span>
        </button>
    </form>
</template>

<script setup lang="ts">
import { useUser } from '@/services';
import { Room } from '@/types/room.interface';
import { useVModel } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const { currentUser } = storeToRefs(useUser())

const props = defineProps<{ room: Room }>()
const emit = defineEmits(['update:room', 'send'])
const data = useVModel(props, 'room', emit)

const send = () => {
    emit('send');
}
</script>