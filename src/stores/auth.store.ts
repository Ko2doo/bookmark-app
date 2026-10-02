import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, AUTH_TOKEN_STORE_KEY, client } from '@/api.ts';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/helpers/localStorageHelper';
import type { LoginCredentials, LoginResponse } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  // token state
  const token = ref<string | undefined>(undefined);
  const initialTokenValue = getLocalStorage<string>(AUTH_TOKEN_STORE_KEY);

  if (initialTokenValue) {
    token.value = initialTokenValue;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    setLocalStorage(AUTH_TOKEN_STORE_KEY, newToken);
  }

  function clearToken() {
    token.value = undefined;
    removeLocalStorage(AUTH_TOKEN_STORE_KEY);
  }

  const getToken = computed(() => token.value);

  // Login
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      const { data, status } = await client().post<LoginResponse>(
        API_ROUTES.auth.login,
        credentials,
      );

      if (status === 401) {
        token.value = undefined;
        throw new Error('Неверный email или пароль');
      }

      if (status !== 200) {
        token.value = undefined;
        throw new Error(`Неожиданный статус ответа: ${status}`);
      }

      setToken(data.token);
    } catch (err) {
      token.value = undefined;

      if (err instanceof Error) {
        console.error('Ошибка авторизации:', err);
      }

      throw err;
    }
  }

  // Return public api`s
  return { login, getToken, setToken, clearToken };
});
