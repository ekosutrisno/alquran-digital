import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'WebLayout',
        component: () => import("@/layouts/WebLayout.vue"),
        children: [
            {
                path: "/:pathMatch(.*)*",
                name: "NotFound",
                component: () => import("@/views/web/404.vue"),
                meta: {
                    title: 'Not Found Page',
                    description: 'The page you are looking for is not available or not found.'
                }
            },
            {
                path: '/',
                name: 'HomePage',
                component: () => import("@/views/web/HomePage.vue"),
                meta: {
                    title: 'Home Page',
                    description: 'Welcome to the Al-Quran Digital app.'
                }
            },
            {
                path: 'privacy-policy',
                name: 'PrivacyPolicyPage',
                component: () => import("@/views/web/PrivacyPolicyPage.vue"),
                meta: {
                    title: 'About',
                    description: 'About Page'
                }
            },
            {
                path: 'doc',
                name: 'DocumentationPage',
                component: () => import("@/views/web/DocumentationPage.vue"),
                meta: {
                    title: 'DocumentationPage',
                    description: 'DocumentationPage Page'
                }
            }
        ]
    },
    {
        path: '/auth',
        name: 'AuthLayout',
        component: () => import("@/layouts/AuthLayout.vue"),
        children: [
            {
                path: 'unauthorized',
                name: 'UnAuthorize',
                component: () => import("@/views/web/401.vue"),
                meta: {
                    title: 'UnAuthorize Page',
                    description: `Oops, sorry it looks like you are not authorized to access this page.`,
                    requiresAuth: false
                }
            },
            {
                path: '__/auth/action',
                name: 'ResetPasswordActionPage',
                component: () => import("@/views/auth/ResetPasswordActionPage.vue"),
                meta: {
                    title: 'Reset Password Action Page',
                    description: "If you've forgotten your password, this is the place to fix it.",
                    requiresAuth: false
                }
            },
            {
                path: 'login',
                name: 'LoginPage',
                component: () => import("@/views/auth/LoginPage.vue"),
                meta: {
                    title: 'Login Page',
                    description: 'Login Page',
                    requiresAuth: false
                }
            },
            {
                path: 'register',
                name: 'RegisterPage',
                component: () => import("@/views/auth/RegisterPage.vue"),
                meta: {
                    title: 'Register Page',
                    description: 'Register Page',
                    requiresAuth: false
                }
            },
            {
                path: 'reset-password',
                name: 'ResetPasswordPage',
                component: () => import("@/views/auth/ResetPasswordPage.vue"),
                meta: {
                    title: 'Reset Password Page',
                    description: 'Reset Password Page',
                    requiresAuth: false
                }
            }
        ]
    },
    {
        path: '/app/dashboard',
        name: 'AppLayout',
        component: () => import("@/layouts/AppLayout.vue"),
        children: [
            {
                path: '',
                name: 'AppDashboard',
                component: () => import("@/views/app/PersonalDashboard.vue"),
                meta: {
                    title: 'App Dashboard Page',
                    description: 'App Dashboard Page',
                    requiresAuth: false
                }
            },
            {
                path: 'settings',
                name: 'SettingPage',
                component: () => import("@/views/app/SettingPage.vue"),
                meta: {
                    title: 'Setting Page Page',
                    description: 'SettingPage',
                    requiresAuth: true
                }
            },
            {
                path: 'alquran',
                name: 'AlquranPageDetail',
                component: () => import("@/views/app/AlquranPage.vue"),
                meta: {
                    title: 'Alquran Page Detail',
                    description: 'Alquran Page Detail Page',
                    requiresAuth: false
                }
            },
            {
                path: 'tafsir',
                name: 'TafsirPageDetail',
                component: () => import("@/views/app/TafsirPage.vue"),
                meta: {
                    title: 'Tafsir Page Detail',
                    description: 'Tafsir Page Detail Page',
                    requiresAuth: false
                }
            },
            {
                path: 'class-room',
                name: 'ClassRoomPage',
                component: () => import("@/views/app/ClassRoomPage.vue"),
                meta: {
                    title: 'Class Room Dashboard',
                    description: 'Class Room Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/:room_id/detail',
                name: 'ClassRoomDetailPage',
                component: () => import("@/views/app/ClassRoomDetailPage.vue"),
                meta: {
                    title: 'Class Room Detail Dashboard',
                    description: 'Class Room Detail Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/:room_id/advanced',
                name: 'ClassRoomAdvancedPage',
                component: () => import("@/views/app/ClassRoomAdvancedPage.vue"),
                meta: {
                    title: 'Class Room Advanced',
                    description: 'Class Room Advanced Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/new',
                name: 'ClassRoomCreatePage',
                component: () => import("@/views/app/ClassRoomCreatePage.vue"),
                meta: {
                    title: 'Class Room Create Dashboard',
                    description: 'Class Room Create Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/:roomId/chat',
                name: 'ClassRoomChatPage',
                component: () => import("@/views/chat/ChatPage.vue"),
                meta: {
                    title: 'Class Room Chat Dashboard',
                    description: 'Class Room Chat Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'bacaanku',
                name: 'BacaankuPage',
                component: () => import("@/views/app/BacaankuPage.vue"),
                meta: {
                    title: 'Bacaanku',
                    description: 'Bacaanku Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'favorite',
                name: 'FavoritePage',
                component: () => import("@/views/app/FavoritePage.vue"),
                meta: {
                    title: 'Favorite',
                    description: 'Favorite Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'surah-pilihan',
                name: 'SurahPilihan',
                component: () => import("@/views/app/SurahPilihan.vue"),
                meta: {
                    title: 'Surah Pilihan',
                    description: 'Surah Pilihan Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'surah',
                name: 'SurahPage',
                component: () => import("@/views/app/SurahPage.vue"),
                meta: {
                    title: 'Surah',
                    description: 'Surah Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'manzil',
                name: 'ManzilPage',
                component: () => import("@/views/app/ManzilPage.vue"),
                meta: {
                    title: 'Manzil',
                    description: 'Manzil Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'search',
                name: 'SearchPage',
                component: () => import("@/views/app/SearchPage.vue"),
                meta: {
                    title: 'Search',
                    description: 'Search Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'pages',
                name: 'PagesPage',
                component: () => import("@/views/app/PagesPage.vue"),
                meta: {
                    title: 'Pages',
                    description: 'Pages Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'rukuk',
                name: 'RukukPage',
                component: () => import("@/views/app/RukukPage.vue"),
                meta: {
                    title: 'Rukuk',
                    description: 'Rukuk Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'sajda',
                name: 'SajdaPage',
                component: () => import("@/views/app/SajdaPage.vue"),
                meta: {
                    title: 'Sajda',
                    description: 'Sajda Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'juz',
                name: 'JuzPage',
                component: () => import("@/views/app/JuzPage.vue"),
                meta: {
                    title: 'Juz',
                    description: 'Juz Page',
                    requiresAuth: false,
                    requiresAdmin: false
                }
            },
            {
                path: 'notification',
                name: 'NotificationPage',
                component: () => import("@/views/app/NotificationPage.vue"),
                meta: {
                    title: 'NotificationPage',
                    description: 'Notification Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
        ]
    }
]

export default routes;