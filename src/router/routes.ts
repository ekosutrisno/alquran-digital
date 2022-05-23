import { RouteRecordRaw } from "vue-router";

// Layout Section Import
import WebLayout from '@/layouts/WebLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// View Web Section Import
import HomePage from '@/views/web/HomePage.vue';
import HomeDashboard from '@/views/web/HomeDashboard.vue';

// View App Section Import
import PersonalDashboard from '@/views/app/PersonalDashboard.vue';
import MadrasahDashboard from '@/views/app/MadrasahDashboard.vue';

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
                    description: 'The page you are looking for is not available or not found.',
                    requiresAuth: false
                }
            },
            {
                path: '/',
                name: 'HomePage',
                component: HomePage,
                meta: {
                    title: 'Home Page',
                    description: 'Welcome to the Al-Quran Digital app.',
                    requiresAuth: false
                }
            },
            {
                path: 'home-dashboard',
                name: 'HomeDashboard',
                component: HomeDashboard,
                meta: {
                    title: 'Home Dashboard',
                    description: 'Home Dashboard Page',
                    requiresAuth: false
                }
            },
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
            },
        ]
    },
    {
        path: '/app/dashboard',
        name: 'AppLayout',
        component: AppLayout,
        children: [
            {
                path: 'personal',
                name: 'PersonalDashboard',
                component: PersonalDashboard,
                meta: {
                    title: 'Personal Dashboard',
                    description: 'Persona Dashboard Page',
                    requiresAuth: true
                }
            },
            {
                path: 'madrasah',
                name: 'MadrasahDashboard',
                component: MadrasahDashboard,
                meta: {
                    title: 'Madrasah Dashboard',
                    description: 'Madrasah Dashboard Page',
                    requiresAuth: true,
                    requiresAdmin: true
                }
            },
        ]
    }
]

export default routes;