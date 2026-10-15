import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SaisonData',
    name: 'SaisonData',
    component: () => import('../views/SaisonData.vue')
  },
  {
    path: '/FahrerData',
    name: 'FahrerData',
    component: () => import('../views/FahrerData.vue')
  },
  {
    path: '/TeamData',
    name: 'TeamData',
    component: () => import('../views/TeamData.vue')
  },
  {
    path: '/Race/:jahr/:runde',
    name: 'Race',
    component: () => import('../views/Race.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
