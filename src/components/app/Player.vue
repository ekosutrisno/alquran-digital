<template>
    <div class="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <div class="flex items-center gap-6 bg-white/90 dark:bg-slate-900/90 py-4 px-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6">
            <div class="hidden md:block">
                <button type="button" class="amplitude-play group relative flex flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-14 w-14 focus:ring-2 focus:ring-offset-2" aria-label="Play">
                    <div class="absolute -inset-3 md:hidden"></div>
                    <svg aria-hidden="true" viewBox="0 0 36 36" class="fill-white group-active:fill-white/80 h-7 w-7">
                        <path
                            d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z">
                        </path>
                    </svg>
                </button>
            </div>
            <div class="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
                <a class="truncate text-center dark:text-white text-sm font-bold leading-6 md:text-left" :title="`5: Bill Lumbergh`" href="/5">{{ `(${currentSurah?.surat_name}) - ${currentPlay?.sura_id}:${currentPlay?.aya_number} - Juz ${currentPlay?.juz_id} | ${currentPlay?.transliteration.en}` }}</a>
                <div class="flex justify-between gap-6">
                    <div class="flex items-center md:hidden">
                        <button type="button" class="group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none" aria-label="Mute">
                            <div class="absolute -inset-4 md:hidden"></div>
                            <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700">
                                <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z"></path>
                                <path d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17" fill="none"></path>
                                <path d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5" fill="none"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-none items-center gap-4">
                        <button type="button" @click="fastForward(-forwardBackward)" class="group relative rounded-full focus:outline-none" aria-label="Rewind 10 seconds">
                            <div class="absolute -inset-4 -right-2 md:hidden"></div>
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700">
                                <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188"></path>
                                <path d="M5 15V19"></path>
                                <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z"></path>
                            </svg>
                        </button>
                        <div class="md:hidden">
                            <button type="button" class="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-10 w-10 focus:ring-2 focus:ring-offset-2" aria-label="Play">
                                <div class="absolute -inset-3 md:hidden"></div>
                                    <svg aria-hidden="true" viewBox="0 0 36 36" class="fill-white group-active:fill-white/80 h-5 w-5">
                                        <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"></path>
                                    </svg>
                            </button>
                        </div>
                        <button type="button" @click="fastForward(forwardBackward)" class="group relative rounded-full focus:outline-none" aria-label="Fast-forward 10 seconds">
                            <div class="absolute -inset-4 -left-2 md:hidden"></div>
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700">
                                <path d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M13 15V19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                    <div role="group" class="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative">
                        <label class="sr-only">Current time</label>
                        <div class="relative w-full bg-slate-100 md:rounded-full" style="position: relative; touch-action: none;">
                            <div class="h-2 md:rounded-r-md md:rounded-l-xl bg-slate-700" style="width: calc(3.125% - 0.25rem);"></div>
                            <div class="absolute top-1/2 -translate-x-1/2" style="left: 3.125%;">
                                <div class="h-4 rounded-full w-1 bg-slate-700" style="position: absolute; transform: translate(-50%, -50%); touch-action: none; left: 3.125%;">
                                    <div style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;">
                                        <input tabindex="0" id="progress-bar" type="range" min="0" max="64" step=".1" aria-orientation="horizontal" aria-valuetext="0 hours, 0 minutes, 2 seconds" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden items-center gap-2 md:flex">
                            <div for="progress-bar" aria-live="off" class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block text-slate-500">
                                <span class="amplitude-current-minutes" amplitude-main-current-minutes="true">00</span>:<span class="amplitude-current-seconds" amplitude-main-current-seconds="true">00</span>
                            </div>
                            <span class="text-sm leading-6 text-slate-300" aria-hidden="true">/</span>
                            <div class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-slate-500 md:block">
                                <span class="amplitude-duration-minutes" amplitude-main-duration-minutes="true">00</span>:<span class="amplitude-duration-seconds" amplitude-main-duration-seconds="true">00</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <!-- Playback Rate -->
                        <div class="flex items-center">
                        <span class="amplitude-playback-speed"></span>
                            <button type="button" @click="playbackSpeedUpdate" class="relative flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" aria-label="Playback rate">
                                <div class="absolute -inset-4 md:hidden"></div>
                                <div class="bg-slate-500 text-white font-semibold rounded h-5 w-5 flex items-center justify-center">
                                    <p class="text-[10px]">{{ playbackDisplay(String(playbackSpeed)) }}</p>
                                </div>
                            </button>
                        </div>
                        <!-- Mute Button -->
                        <div class="hidden items-center md:flex">
                            <button type="button" class="amplitude-mute group relative rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none" aria-label="Mute">
                                <div class="absolute -inset-4 md:hidden"></div><svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700">
                                    <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z"></path>
                                    <path d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17" fill="none"></path>
                                    <path d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5" fill="none"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Audio Tags -->
        <!-- <audio class="focus:outline-none mb-4 sm:mr-4 sm:mb-0 float-right nv-transition mt-2 h-8 w-full max-w-md bg-transparent" preload="auto" :src="currentPlay?.audio">
            <source v-for="(aud, idx) in currentPlay?.audio_secondary" :key="idx" :src="aud" type="audio/mp3" />
        </audio> -->
    </div>

</template>

<script setup lang="ts">
import { useAyah, useSurah } from '@/services';
import { SurahData } from '@/types/alquran.interface';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import Amplitude from 'amplitudejs';

const { currentPlay } =  storeToRefs(useAyah());
const surahService  = useSurah();
const { getSurah } =  surahService;
const { surahs, surah } =  storeToRefs(surahService);
const currentSurah =  ref<SurahData>({} as SurahData);

const surahFromCache =  computed(()=> surahs.value.filter(surah=> surah.id == currentPlay.value?.sura_id).at(0));
const forwardBackward = ref<number>(10);
const playbackSpeed = ref<number>(1)

onMounted(()=>{
    if(surahFromCache.value){
        currentSurah.value = surahFromCache.value;
    }else{
        getSurah(currentPlay.value?.sura_id!, true)
            .then(()=> currentSurah.value = surah.value!)
    }

    initAmplitudo();
})

function initAmplitudo() {
    Amplitude.init({
        songs: [
            {
                name: currentPlay.value?.transliteration,
                artist: "Al-Quran Digital",
                album: currentSurah.value.surat_name,
                url: currentPlay.value?.audio,
                cover_art_url: ""
            }
        ],
        playback_speed: playbackSpeed.value
    })
}

function playbackSpeedUpdate() {
    if(playbackSpeed.value == 2)
        playbackSpeed.value = 1;
    else
        playbackSpeed.value += 0.5;
    
    initAmplitudo();
}

function playbackDisplay(playback: string) {
    return playback.length == 1 ? `${playback.charAt(0)}x` : playback
}

function fastForward(second: number) {
    let currentSongSecond = Amplitude.getSongPlayedSeconds();
    let currentSongIndex = Amplitude.getActiveIndex();
    Amplitude.skipTo(currentSongSecond + second, currentSongIndex, null);
}
</script>