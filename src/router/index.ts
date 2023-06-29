import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';

import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(_to, _from, _savedPosition) {return { top: 0 }}
})

router.beforeEach((to: RouteLocationNormalized) => {
    document.title = `Al-Quran Digital - ${to.meta.title}`;

    const isLogedInUserUID = localStorage.getItem('_uid');

    if (to.meta.requiresAuth && to.meta.requiresAdmin) return '/auth/unauthorized';
    else if (to.meta.requiresAuth && !isLogedInUserUID) return '/auth/login'
})


export default router;