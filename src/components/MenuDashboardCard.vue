<template>
<div class="bg-white px-6 pt-10 pb-8 lg:cursor-pointer transition hover:shadow-xl ring-1 ring-gray-900/5 sm:mx-auto w-full h-full rounded-lg sm:px-10">
    <div class="mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
        <div class="divide-y divide-gray-300/50">
            <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
            <p> {{ menu.headerDescription }} </p>
            <ul class="space-y-4">
                <li v-for="(feature, idx) in menu.features" :key="idx" class="flex items-center">
                    <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="11" />
                        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                    </svg>
                    <p class="ml-4"> {{feature}} </p>
                </li>
            </ul>
            <p>{{ menu.footerDescription }}</p>
            </div>
            <div class="pt-8 text-base font-semibold leading-7">
            <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
            <p>
                <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
            </p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
interface Menu{
    headerDescription?: string
    footerDescription?: string
    features?: string[]
    linkToAction?: string
}

defineProps<{ menu:Menu }>()
</script>