import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';

import routes from './routes';
import { decrypt } from '@/utils/cryp';

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(_to, _from, _savedPosition) {return { top: 0 }}
})

router.beforeEach((to: RouteLocationNormalized) => {
    document.title = `Al-Qur'an Digital - ${to.meta.title}`;

    const isLogedInUserUID = decrypt(String(localStorage.getItem("_uid")));

    if (to.meta.requiresAuth && to.meta.requiresAdmin) return '/auth/unauthorized';
    else if (to.meta.requiresAuth && !isLogedInUserUID) return '/auth/login'
})


export default router;