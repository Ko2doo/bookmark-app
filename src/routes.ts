import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/layout/MainLayout.vue';
import AuthView from '@/views/AuthView.vue';
import MainView from '@/views/MainView.vue';

export const router = createRouter({
  routes: [
    {
      path: '/',
      component: AuthView,
    },
    {
      path: '/main',
      component: MainView,
      children: [
        {
          path: '',
          component: MainLayout,
          name: 'main',
        },
        {
          path: 'new',
          component: '',
        },
      ],
    },
  ],
  history: createWebHistory(),
});
