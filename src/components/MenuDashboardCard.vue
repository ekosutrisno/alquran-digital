<template>
<main class="bg-white dark:bg-dark-blue p-4 sm:p-6 transition ring-1 ring-gray-700/10 dark:ring-gray-700/50 sm:mx-auto w-full h-full rounded-lg">
    <div class="max-w-4xl mx-auto grid grid-cols-1">
        <div class="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
            <h1 class="mt-1 text-lg font-semibold text-white dark:sm:text-white">{{ menu.title }}</h1>
            <p class="text-sm leading-4 font-medium text-white"> {{menu.headerDescription}} </p>
        </div>
        <div class="grid gap-4 col-start-1 col-end-3 row-start-1">
            <img :src="menu.imageUrl.main" alt="" class="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy">
       </div>
        <dl class="mt-4 text-xs font-medium flex items-center row-start-2">
            <dt class="sr-only">Reviews</dt>
                <dd class="flex items-center" :class="[menu.id == 2 ? 'text-green-600 dark:text-green-400':'text-sky-600 dark:text-sky-400']">
                    <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-1 stroke-current" :class="[menu.id == 2 ? 'dark:stroke-green-500': 'dark:stroke-sky-500']">
                    <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>4.89 <span class="text-slate-400 font-normal">(128)</span></span>
                </dd>
            <dt class="sr-only">Location</dt>
            <dd class="flex items-center text-slate-800 dark:text-slate-300">
                <svg width="2" height="2" aria-hidden="true" fill="currentColor" class="mx-3 text-slate-300">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 text-slate-400 dark:text-slate-500 w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ menu.plan }}
            </dd>
        </dl>
        <div class="mt-4 col-start-1 row-start-3 self-center space-x-4">
            <router-link v-if="menu.id == 1" :to="`/app/dashboard`" type="button" class="dark:text-white text-slate-700 ring-1 text-sm leading-6 font-medium py-2 px-3 rounded-lg">Baca Al-Quran</router-link>
            <router-link :to="`/app/dashboard/${menu.linkToAction}`" type="button" :class="[menu.id == 2 ? 'bg-green-600':'bg-sky-600']" class="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">{{menu.id == 1 ? 'Sign Up' : 'Setup'}} for Free</router-link>
        </div>
        <p class="mt-4 text-sm leading-6 col-start-1 dark:text-slate-400">
            {{ menu.footerDescription }} <br><br> &bull; <span class="font-semibold">Fitur</span> <span class="rounded-sm mr-2 text-slate-900 dark:text-slate-100 py1 px-2 w-full inline-flex items-center" v-for="(feat, idx) in menu.features" :key="idx"> {{feat}} </span>
        </p>
    </div>
</main>
</template>

<script setup lang="ts">
interface Menu{
    id: number
    headerDescription?: string
    footerDescription?: string
    title?: string
    features?: string[]
    linkToAction?: string
    plan?: string
    imageUrl:{
        main?: string
        feature1?: string
        feature2?: string
    }
}

defineProps<{ menu: Menu }>()
</script>