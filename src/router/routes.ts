import { RouteRecordRaw } from "vue-router";

// Layout Section Import
import WebLayout from '@/layouts/WebLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';

// View Section Import
import HomePage from '@/views/web/HomePage.vue';
import HomeDashboard from '@/views/web/HomeDashboard.vue';
import PersonalDashboard from '@/views/app/PersonalDashboard.vue';
import MadrasahDashboard from '@/views/app/MadrasahDashboard.vue';

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
        path: '/app/dashboard',
        name: 'AppLayout',
        component: AppLayout,
        children:[
            {
                path: 'personal',
                name: 'PersonalDashboard',
                component: PersonalDashboard,
                meta: {
                    title: 'Personal Dashboard',
                    description: 'Persona lDashboard Page',
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
                    requiresAuth: true
                }
            },
        ]
    }
]

export default routes;