import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //   Era插件管理
        {
            path: '/era/extension',
            name: 'era_extension',
            component: () => import('../views/era/EraExtensionView.vue'),
        },
        {
            path: '/era/handler',
            name: 'era_handler',
            component: () => import('../views/era/EraHandlerView.vue'),
        }
    ],
})

export default router
