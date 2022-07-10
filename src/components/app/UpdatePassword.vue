<template>
<div class="mt-4 md:mt-0 w-full max-w-lg space-y-4">
        <div>
            <label for="new-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    v-model="state.auth.password" type="password" name="new-password" id="new-password" 
                    class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="New password" 
                />
            </div>
        </div>
        <div>
            <label for="confirm-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    v-model="state.auth.confirmPassword" type="password" name="confirm-password" id="confirm-password" 
                    class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Confirm new password" 
                />
            </div>
       </div>
       <p v-if="!isMatch && !isBlank" class="text-xs text-red-600">The value did not match</p>
        <button type="button" @click="toggleModalPassword(true)" :disabled="!isMatch || isBlank" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <span class="mr-2">Update</span>
        </button>
</div>
<PromptCredentialPassword 
    @close-modal="toggleModalPassword" 
    :open="state.openModalPassword"
    @action="onUpdatePassword"
/>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuth } from '@/services';
import PromptCredentialPassword from './modal/PromptCredentialPassword.vue';
import { isMatchPassword } from '@/utils/helperFunction';

const authService = useAuth()

const state = reactive({
    auth:{
        password: '',
        confirmPassword: ''
    },
    openModalPassword: false,
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

const isMatch = computed(()=> isMatchPassword(state.auth.password, state.auth.confirmPassword))
const isBlank = computed(()=> state.auth.password.trim().length == 0)

</script>