import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';

import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to: RouteLocationNormalized) => {
    document.title = `Al-Quran Digital - ${to.meta.title}`;
})


export default router;