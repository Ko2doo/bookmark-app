import { ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, client } from '@/api.ts';
import type { Profile } from '@/types/profile';

export const useProfileStore = defineStore('profile', () => {
  // Profile state
  const profile = ref<Profile | null>(null);

  // Get data
  async function fetchProfile(): Promise<void> {
    try {
      const { data, status } = await client().get<Profile>(API_ROUTES.auth.profile);

      if (status !== 200) {
        profile.value = null;
        throw new Error(`Не удалось получить профиль (статус ${status})`);
      }

      profile.value = data;
    } catch (err) {
      profile.value = null;

      if (err instanceof Error) {
        console.error('Ошибка получения данных:', err);
      }

      throw err;
    }
  }

  // Return public api`s
  return { profile, fetchProfile };
});
