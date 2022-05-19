import { RouteRecordRaw } from "vue-router";

// Layout Section Import
import WebLayout from '@/layouts/WebLayout.vue';

// View Section Import
import HomePage from '@/views/web/HomePage.vue';

const routes: RouteRecordRaw[] = [
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
        name: 'WebLayout',
        component: WebLayout,
        children: [
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
        ]
    }
]

export default routes;