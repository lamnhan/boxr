import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/home.page.vue'),
  },
  {
    path: '/edit/:iid',
    name: 'editor',
    component: () => import('./pages/editor.page.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
