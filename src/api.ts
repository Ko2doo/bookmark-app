import axios, { AxiosError } from 'axios';

import { useAuthStore } from '@/stores/auth.store';

export const AUTH_TOKEN_STORE_KEY = 'auth-token-store';

export const API_ROUTES = {
  profile: `profile`,
  categories: `categories`,
  update_category: (id: number) => `categories/${id}`,
  bookmarks: {
    get: (id: number) => `categories/${id}/bookmarks`,
    create: `bookmarks`,
    delete: (id: number) => `bookmarks/${id}`,
  },
  auth: {
    login: `auth/login`,
    profile: `auth/profile`,
  },
};

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
  validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.getToken) {
    config.headers.Authorization = `Bearer ${authStore.getToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('HTTP ошибка:', error.message);
    return Promise.reject(error);
  },
);

export function client() {
  return instance;
}
