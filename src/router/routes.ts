import { RouteRecordRaw } from "vue-router";

// Layout Section Import
import WebLayout from '@/layouts/WebLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// View Web Section Import
import HomePage from '@/views/web/HomePage.vue';
import PrivacyPolicyPage from '@/views/web/PrivacyPolicyPage.vue';
import DocumentationPage from '@/views/web/DocumentationPage.vue';

// View App Section Import
import PersonalDashboard from '@/views/app/PersonalDashboard.vue';
import ClassRoomPage from '@/views/app/ClassRoomPage.vue';
import ClassRoomDetailPage from '@/views/app/ClassRoomDetailPage.vue';
import ClassRoomCreatePage from '@/views/app/ClassRoomCreatePage.vue';
import ClassRoomAdvancedPage from '@/views/app/ClassRoomAdvancedPage.vue';
import BacaankuPage from '@/views/app/BacaankuPage.vue';
import FavoritePage from '@/views/app/FavoritePage.vue';
import SurahPilihan from '@/views/app/SurahPilihan.vue';
import SurahPage from '@/views/app/SurahPage.vue';
import PagesPage from '@/views/app/PagesPage.vue';
import ManzilPage from '@/views/app/ManzilPage.vue';
import RukukPage from '@/views/app/RukukPage.vue';
import SajdaPage from '@/views/app/SajdaPage.vue';
import JuzPage from '@/views/app/JuzPage.vue';
import AlquranPage from '@/views/app/AlquranPage.vue';
import TafsirPage from '@/views/app/TafsirPage.vue';
import SettingPage from '@/views/app/SettingPage.vue';
import NotificationPage from '@/views/app/NotificationPage.vue';
import SearchPage from '@/views/app/SearchPage.vue';

// // View Chat Section Import
import ChatPage from '@/views/chat/ChatPage.vue';

// View Auth Section Import
import LoginPage from '@/views/auth/LoginPage.vue';
import RegisterPage from '@/views/auth/RegisterPage.vue';
import ResetPasswordPage from '@/views/auth/ResetPasswordPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'WebLayout',
        component: WebLayout,
        children: [
            {
                path: "/:pathMatch(.*)*",
                name: "NotFound",
                component: () => import("../views/web/404.vue"),
                meta: {
                    title: 'Not Found Page',
                    description: 'The page you are looking for is not available or not found.'
                }
            },
            {
                path: '/',
                name: 'HomePage',
                component: HomePage,
                meta: {
                    title: 'Home Page',
                    description: 'Welcome to the Al-Quran Digital app.'
                }
            },
            {
                path: 'privacy-policy',
                name: 'PrivacyPolicyPage',
                component: PrivacyPolicyPage,
                meta: {
                    title: 'About',
                    description: 'About Page'
                }
            },
            {
                path: 'doc',
                name: 'DocumentationPage',
                component: DocumentationPage,
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
        component: AuthLayout,
        children: [
            {
                path: 'unauthorized',
                name: 'UnAuthorize',
                component: () => import("../views/web/401.vue"),
                meta: {
                    title: 'UnAuthorize Page',
                    description: `Oops, sorry it looks like you are not authorized to access this page.`,
                    requiresAuth: false
                }
            },
            {
                path: '__/auth/action',
                name: 'ResetPasswordActionPage',
                component: () => import("../views/auth/ResetPasswordActionPage.vue"),
                meta: {
                    title: 'Reset Password Action Page',
                    description: "If you've forgotten your password, this is the place to fix it.",
                    requiresAuth: false
                }
            },
            {
                path: 'login',
                name: 'LoginPage',
                component: LoginPage,
                meta: {
                    title: 'Login Page',
                    description: 'Login Page',
                    requiresAuth: false
                }
            },
            {
                path: 'register',
                name: 'RegisterPage',
                component: RegisterPage,
                meta: {
                    title: 'Register Page',
                    description: 'Register Page',
                    requiresAuth: false
                }
            },
            {
                path: 'reset-password',
                name: 'ResetPasswordPage',
                component: ResetPasswordPage,
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
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'AppDashboard',
                component: PersonalDashboard,
                meta: {
                    title: 'App Dashboard Page',
                    description: 'App Dashboard Page',
                    requiresAuth: false
                }
            },
            {
                path: 'settings',
                name: 'SettingPage',
                component: SettingPage,
                meta: {
                    title: 'Setting Page Page',
                    description: 'SettingPage',
                    requiresAuth: true
                }
            },
            {
                path: 'alquran',
                name: 'AlquranPageDetail',
                component: AlquranPage,
                meta: {
                    title: 'Alquran Page Detail',
                    description: 'Alquran Page Detail Page',
                    requiresAuth: false
                }
            },
            {
                path: 'tafsir',
                name: 'TafsirPageDetail',
                component: TafsirPage,
                meta: {
                    title: 'Tafsir Page Detail',
                    description: 'Tafsir Page Detail Page',
                    requiresAuth: false
                }
            },
            {
                path: 'class-room',
                name: 'ClassRoomPage',
                component: ClassRoomPage,
                meta: {
                    title: 'Class Room Dashboard',
                    description: 'Class Room Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/detail/:room_id',
                name: 'ClassRoomDetailPage',
                component: ClassRoomDetailPage,
                meta: {
                    title: 'Class Room Detail Dashboard',
                    description: 'Class Room Detail Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/advanced/:room_id',
                name: 'ClassRoomAdvancedPage',
                component: ClassRoomAdvancedPage,
                meta: {
                    title: 'Class Room Advanced',
                    description: 'Class Room Advanced Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/create',
                name: 'ClassRoomCreatePage',
                component: ClassRoomCreatePage,
                meta: {
                    title: 'Class Room Create Dashboard',
                    description: 'Class Room Create Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: false
                }
            },
            {
                path: 'class-room/chat/:roomId',
                name: 'ClassRoomChatPage',
                component: ChatPage,
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
                component: BacaankuPage,
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
                component: FavoritePage,
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
                component: SurahPilihan,
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
                component: SurahPage,
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
                component: ManzilPage,
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
                component: SearchPage,
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
                component: PagesPage,
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
                component: RukukPage,
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
                component: SajdaPage,
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
                component: JuzPage,
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
                component: NotificationPage,
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