import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';

import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to: RouteLocationNormalized) => {
    document.title = `Al-Quran Digital - ${to.meta.title}`;

    if (to.meta.requiresAuth && to.meta.requiresAdmin) return '/auth/unauthorized';
    else if (to.meta.requiresAuth) return '/auth/login'
})


export default router;