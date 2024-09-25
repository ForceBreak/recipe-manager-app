import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/Add.vue')
    },
    {
      path: '/:id',
      name: 'edit',
      component: () => import('@/views/Edit.vue')
    }
  ]
})

export default router
