import { ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, http } from '@/api.ts';
import type { LoginCredentials, LoginResponse } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  // token state
  const token = ref<string | null>(null);

  // Login
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      const { data, status } = await http.post<LoginResponse>(API_ROUTES.auth.login, credentials);

      if (status === 401) {
        token.value = null;
        throw new Error('Неверный email или пароль');
      }

      if (status !== 200) {
        token.value = null;
        throw new Error(`Неожиданный статус ответа: ${status}`);
      }

      token.value = data.token;
    } catch (err) {
      token.value = null;

      if (err instanceof Error) {
        console.error('Ошибка авторизации:', err);
        throw err;
      }

      throw new Error('Неизвестная ошибка авторизации');
    }
  }

  // Return public api`s
  return { token, login };
});
