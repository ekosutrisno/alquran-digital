<template>
    <div class="wrapper md:p-2 space-y-6 max-w-screen-xl mx-auto">
        <!-- Section 0 -->
        <section class="flex flex-col gap-2 md:flex-row md:items-center justify-between">
            <div class="inline-flex space-x-3 items-center">
                <div class="flex cursor-default text-sm rounded-full">
                    <span class="sr-only">General user info</span>
                    <img class="h-16 w-16 object-cover object-top p-1 rounded-full" :src="getPhotoUrl" alt="profile-avatar" />
                </div>
                <div class="flex flex-col">
                    <h1 class="text-slate-800 inline-flex items-center space-x-2 dark:text-white text-xl font-semibold"> 
                        <span>{{ currentUser?.full_name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="currentUser?.is_active" aria-hidden="true" class="h-5 w-5 text-sky-400"  viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9.592 3.2a5.574 5.574 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.713 2.713 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a5.707 5.707 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.713 2.713 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.713 2.713 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a5.574 5.574 0 0 1-.399-.495a2.713 2.713 0 0 1-.408-.985a5.72 5.72 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.713 2.713 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a5.707 5.707 0 0 1-.632-.068a2.713 2.713 0 0 1-.985-.408a5.73 5.73 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.713 2.713 0 0 0-2.34 0c-.32.153-.626.414-1.238.935Zm6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0l5.427-5.425Z" clip-rule="evenodd"/></svg>
                    </h1>
                    <p class="text-slate-700 dark:text-slate-400 text-sm">Your personal account</p>
                </div>
            </div>
            <div class="pl-20 md:pl-0">
                <router-link to="/app/dashboard" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span class="lg:hidden">Dashboard</span>
                    <span class="hidden lg:inline">Go to your personal dashboard</span>
                </router-link>
            </div>
        </section>

        <!-- Section 1-->
        <section class="grid gap-y-4 h-auto xl:gap-4 grid-cols-1 xl:grid-cols-4">
             <div class="bg-white pl-6 md:pl-8 h-max sm:max-w-md space-y-2 dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-1">
                <button type="button" @click="setCurrentActive(1)" :class="[state.active == 1 ? 'dark:bg-slate-900/50 bg-slate-200/50': '']" class="inline-flex items-center text-slate-800 group text-left w-full relative dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <div :class="[state.active == 1 ? 'bg-sky-500': '']" class="absolute w-1 h-3/4 -left-3 top-1 rounded-full"></div>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" fill="currentColor" data-view-component="true" class="text-slate-600 w-4 h-4 mr-2">
                        <path fill-rule="evenodd" d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"></path>
                    </svg>
                    <span class="">Public profile</span>
                </button>
                <button type="button" @click="setCurrentActive(2)" :class="[state.active == 2 ? 'dark:bg-slate-900/50 bg-slate-200/50': '']" class="inline-flex items-center text-slate-800 group text-left w-full relative dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <div :class="[state.active == 2 ? 'bg-sky-500': '']" class="absolute w-1 h-3/4 -left-3 top-1 rounded-full"></div>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" fill="currentColor" data-view-component="true" class="text-slate-600 w-4 h-4 mr-2">
                        <path fill-rule="evenodd" d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.101.143-.137.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="">Account</span>
                </button>
                <button type="button" @click="setCurrentActive(3)" :class="[state.active == 3 ? 'dark:bg-slate-900/50 bg-slate-200/50': '']" class="inline-flex items-center text-slate-800 group text-left w-full relative dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <div :class="[state.active == 3 ? 'bg-sky-500': '']" class="absolute w-1 h-3/4 -left-3 top-1 rounded-full"></div>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" fill="currentColor" data-view-component="true" class="text-slate-600 w-4 h-4 mr-2">
                        <path fill-rule="evenodd" d="M11.134 1.535C9.722 2.562 8.16 4.057 6.889 5.312 5.8 6.387 5.041 7.401 4.575 8.294a3.745 3.745 0 00-3.227 1.054c-.43.431-.69 1.066-.86 1.657a11.982 11.982 0 00-.358 1.914A21.263 21.263 0 000 15.203v.054l.75-.007-.007.75h.054a14.404 14.404 0 00.654-.012 21.243 21.243 0 001.63-.118c.62-.07 1.3-.18 1.914-.357.592-.17 1.226-.43 1.657-.861a3.745 3.745 0 001.055-3.217c.908-.461 1.942-1.216 3.04-2.3 1.279-1.262 2.764-2.825 3.775-4.249.501-.706.923-1.428 1.125-2.096.2-.659.235-1.469-.368-2.07-.606-.607-1.42-.55-2.069-.34-.66.213-1.376.646-2.076 1.155zm-3.95 8.48a3.76 3.76 0 00-1.19-1.192 9.758 9.758 0 011.161-1.607l1.658 1.658a9.853 9.853 0 01-1.63 1.142zM.742 16l.007-.75-.75.008A.75.75 0 00.743 16zM12.016 2.749c-1.224.89-2.605 2.189-3.822 3.384l1.718 1.718c1.21-1.205 2.51-2.597 3.387-3.833.47-.662.78-1.227.912-1.662.134-.444.032-.551.009-.575h-.001V1.78c-.014-.014-.112-.113-.548.027-.432.14-.995.462-1.655.942zM1.62 13.089a19.56 19.56 0 00-.104 1.395 19.55 19.55 0 001.396-.104 10.528 10.528 0 001.668-.309c.526-.151.856-.325 1.011-.48a2.25 2.25 0 00-3.182-3.182c-.155.155-.329.485-.48 1.01a10.515 10.515 0 00-.309 1.67z"></path>
                    </svg>
                    <span class="">Appearance</span>
                </button>
                <button type="button" @click="setCurrentActive(4)" :class="[state.active == 4 ? 'dark:bg-slate-900/50 bg-slate-200/50': '']" class="inline-flex items-center text-slate-800 group text-left w-full relative dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <div :class="[state.active == 4 ? 'bg-sky-500': '']" class="absolute w-1 h-3/4 -left-3 top-1 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-slate-600 w-4 h-4 mr-2" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span class="">Danger zone</span>
                </button>
            </div>

            <div class="bg-white relative overflow-hidden dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-3 flex flex-col">
                <Svg3 aria-hidden="true" class="absolute right-[-6.5rem] bottom-24 rotate-90"/>
                
                <!-- Header of Details tab -->
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </span>
                        <span> {{ state.titile }} </span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Details content of menu</p>
                </div>

                <!-- Content of tabs 1 -->
                <div v-show="state.active == 1" class="with-transition w-full grid grid-cols-1 md:grid-cols-6 md:gap-4 py-6 px-2">                   
                    <!-- Public profile details -->
                    <div v-if="currentUser" class="md:col-span-4 mt-4 md:mt-0 w-full max-w-lg space-y-5">
                            <div>
                                <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.full_name" type="text" name="name" id="name" 
                                        :class="[v$.full_name.$error ? 'border-red-500' : '']"
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Full Name" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Your name may appear around Al-Quran Digital where you contribute or are mentioned. You can remove it at any time.</p>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        disabled
                                        v-model="currentUser.email" type="email" name="email" id="email" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Email" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">You can manage verified email addresses in your email settings.</p>
                            </div>
                            <div>
                                <label for="pob" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Place of birth</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.pob" type="text" name="pob" id="pob" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="pob" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Place of your birth date.</p>
                            </div>
                            <div>
                                <label for="dob" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Date of birth</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.dob" type="date" name="dob" id="dob" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="dob" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Your date of birth.</p>
                            </div>
                            <div>
                                <label for="telephone" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone number</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.telephone" type="tel" name="telephone" id="telephone" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Phone number" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Your phone should an active number.</p>
                            </div>
                            <div>
                                <label for="religion" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Religion</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.religion" type="text" name="religion" id="religion" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Religion" 
                                    />
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Recognized religions, Islam, Protestant Christianity, Catholic Christianity, Buddhism, Hinduism, and Confucianism.</p>
                            </div>
                            <div>
                                <label for="gender" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.gender" type="text" name="gender" id="gender" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Nationality" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="nationality" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nationality</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        v-model="currentUser.nationality" type="text" name="nationality" id="nationality" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Nationality" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="hobby" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Hobby</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <textarea
                                        rows="3"
                                        v-model="currentUser.hobby" type="text" name="hobby" id="hobby" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Nationality" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="about" class="block text-sm font-medium text-slate-700 dark:text-slate-300">About</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <textarea
                                        rows="3"
                                        v-model="currentUser.about" type="text" name="about" id="about" 
                                        class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="Nationality" 
                                    />
                                </div>
                            </div>
                            
                            <div v-if="v$.$errors.length" class="text-xs space-y-0.5 ring-1 ring-red-500 rounded p-2">
                                <span class="py-0.5 px-2 rounded bg-red-500 text-white">Error</span>
                                <span class="block text-red-400" v-for="item in v$.$errors" :key="item.$uid">
                                    {{ item.$property }}: {{item.$message}}
                                </span>
                            </div>

                            <button type="button" @click="updateData" class="mt-6 float-right inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                <span>Simpan</span>
                            </button>
                    </div>

                    <!-- Profile Picture -->
                    <div class="col-span-2 w-full text-slate-800 row-start-1 md:row-span-2 dark:text-slate-100">
                        <p>Profile picture</p>
                        <div class="rounded-full overflow-auto relative mt-2 ring-2 w-56 h-56 ring-slate-700/20 dark:ring-slate-700/50">
                            <img class="object-cover object-top w-full h-full rounded-full" :src="getPhotoUrl" alt="profile-picture"/>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="onUpdateAvatar">
                            <label for="file-upload" @click="onUpdateAvatar" class="absolute inset-0 rounded-full flex items-center justify-center bg-transparent group hover:bg-slate-800/20">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 md:cursor-pointer text-transparent group-hover:text-indigo-100 text-opacity-0 hover:text-opacity-100 transition-al" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </label>
                        </div>
                        <div class="mt-4">
                            <p class="text-sm">{{ currentUser?.username }} &bull; {{currentUser?.religion}} &bull; {{calculateAge(currentUser?.dob)}} years old</p>
                            <p class="font-semibold mt-2">Joined on</p>
                            <p class="text-xs">{{formatDateWithMonth(currentUser?.join_at)}} ({{formatDateFromNow(currentUser?.join_at)}})</p>
                            <p class="text-white rounded bg-sky-500 w-max py-1 px-2 text-xs mt-3">Last upated {{formatDateFromNow(currentUser?.lastModifiedDate)}}</p>
                        </div>
                        <div class="inline-flex items-center space-x-2">
                            <div  class="py-2 text-sm font-medium card-shadwo-md from-indigo-500 via-indigo-400 to-purple-400 text-white px-3 inline-flex items-center space-x-px mt-4 bg-gradient-to-tr w-max rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span> Student</span>
                            </div>
                            <div v-if="currentUser?.is_mentor" class="py-2 text-sm font-medium card-shadwo-md text-white from-yellow-500 via-yellow-400 to-orange-400 px-3 inline-flex items-center space-x-px mt-4 bg-gradient-to-tr w-max rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span> Mentor </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- Content of tabs 2 -->
                <div v-show="state.active == 2" class="with-transition w-full grid py-6 px-2 space-y-8">                   
                    <!-- Connected Account -->
                    <ConnectedAccount/>

                    <!-- Update Password-->
                    <UpdatePassword />

                    <!-- Update Email -->
                    <UpdateEmail />
                </div>

                <!-- Content of tabs 3 -->
                <div v-show="state.active == 3" class="with-transition w-full grid py-6 px-2 space-y-8">                   
                    <!-- Appearance -->
                    <Appearance />
                </div>

                <!-- Content of tabs 4 -->
                <div v-show="state.active == 4" class="with-transition w-full grid py-6 px-2 space-y-8">                   
                    <!-- Danger Zone -->
                    <DangerZone />
                </div>
            </div>
           
        </section>
    </div>
</template>

<script setup lang="ts">
import { useUser } from '@/services';
import { calculateAge, formatDateFromNow, formatDateWithMonth } from '@/utils/helperFunction';
import { computed, reactive } from 'vue';
import Svg3 from '@/components/svg/Svg3.vue';
import { storeToRefs } from 'pinia';
import { User } from '@/types/user.interface';
import { required, email} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import UpdatePassword from '@/components/app/UpdatePassword.vue';
import UpdateEmail from '@/components/app/UpdateEmail.vue';
import ConnectedAccount from '@/components/app/ConnectedAccount.vue';
import DangerZone from '@/components/app/DangerZone.vue';
import Appearance from '@/components/app/Appearance.vue';

const userService = useUser();
const { currentUser, getPhotoUrl } = storeToRefs(userService);

const rules = computed(()=> {
    return {
        full_name: { required },
        email: {required, email}
    }
})

const v$ = useVuelidate(rules.value, currentUser.value as any);

const state = reactive({
    isLogedIn: computed(()=> localStorage.getItem('_uid')),
    active: 1,
    titile: 'Public profile'
});


const setCurrentActive = (currentActive: number) => {
    state.active = currentActive;
    switch (currentActive) {
        case 1:
            state.titile = 'Public profile';
            break;
        case 2:
            state.titile = 'Account';
            break;
        case 3:
            state.titile = 'Appearance';
            break;
        case 4:
            state.titile = 'Danger zone';
            break;
    
        default:
            state.titile = 'Public profile';
            break;
    }
}

const onUpdateAvatar = (event: any) =>{
    if (event.target.files && event.target.files[0]) {
        const fileType = event.target.files[0].type.toString();
        
        if(fileType.indexOf('image') != 0){
            alert('Please Choose an Image'); return;
        }
        const newPhotoObject = event.target.files[0];
        
        if(newPhotoObject.size > 2097152){
            alert("Max photo size is 2Mb!")
        }else{
            // Realtime updated
          userService.updateFotoProfile(newPhotoObject as File, currentUser?.value?.user_id as string);
        }
      }
}

async function updateData() {
    const result = await v$.value.$validate();
    if(result)
        userService.updateCurrentUserData(currentUser.value as User, {isSilent: false});
}


</script>
