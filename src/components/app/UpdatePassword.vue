<template>
<div>
    <div class="pb-2">
        <p class="text-xl dark:text-white inline-flex items-center space-x-2">
            <LockIcon class="text-slate-500 w-6 h-6"/>
             <span>Update password</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-600 dark:text-slate-300">Mengubah kata sandi Anda akan memperbarui kata sandi Anda untuk login dan tindakan apa pun yang memerlukan kata sandi.</p>
        </div>
    </div>
    <div v-if="!state.onChange">
        <button type="button" @click="toggleEdit" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-md text-sm">
            Update password
        </button>
    </div>
    <div v-else class="with-transition mt-4 md:mt-0 w-full max-w-lg space-y-4">
        <div>
            <label for="new-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">New password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    v-model="state.auth.password" type="password" name="new-password" id="new-password"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="New password"
                />
            </div>
        </div>
        <div>
            <label for="confirm-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm new password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    v-model="state.auth.confirmPassword" type="password" name="confirm-password" id="confirm-password"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Confirm new password"
                />
            </div>
        </div>
        <p v-if="!isMatch && !isBlank" class="text-xs text-red-600">The value did not match</p>
        <div class="float-right relative">
            <button type="button" @click="toggleEdit" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/10 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-md mr-4 text-sm">
                Cancel
            </button>
            <button type="button" @click="toggleModalPassword(true)" :disabled="!isMatch || isBlank" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                <span class="mr-2">Update</span>
            </button>
        </div>
    </div>
    <PromptCredentialConfirm
        @close-modal="toggleModalPassword"
        :open="state.openModalPassword"
        @action="onUpdatePassword"
    />
</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuth } from '@/services/useAuth';
import { isMatchPassword } from '@/utils/helperFunction';
import PromptCredentialConfirm from './modal/PromptCredentialConfirm.vue';
import LockIcon from '../svg/LockIcon.vue';

const authService = useAuth()

const state = reactive({
    auth:{
        password: '',
        confirmPassword: ''
    },
    openModalPassword: false,
    onChange: false
})

const onUpdatePassword = async (password: string)=> {
    if(isMatch.value)
        authService.updateCurrentUserPasswod(state.auth.password, password)
        .then(() => {
                  toggleModalPassword(false);
                  state.auth.password = '';
                  state.auth.confirmPassword = '';
               });;
}

const toggleModalPassword = (flag: boolean)=>{
   state.openModalPassword = flag;
}

const toggleEdit = ()=>{
    state.onChange = !state.onChange;
    state.auth.password = '';
    state.auth.confirmPassword = '';
}

const isMatch = computed(()=> isMatchPassword(state.auth.password, state.auth.confirmPassword))
const isBlank = computed(()=> state.auth.password.trim().length == 0)

</script>