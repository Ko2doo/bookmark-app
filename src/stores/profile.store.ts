import { ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, http } from '@/api.ts';
import type { Profile } from '@/types/profile';

export const useProfileStore = defineStore('profile', () => {
  // Profile state
  const profile = ref<Profile | null>(null);

  // Get data
  async function fetchProfile(): Promise<void> {
    try {
      const { data, status } = await http.get<Profile>(API_ROUTES.profile);

      if (status !== 200) {
        profile.value = null;
        return;
      }

      profile.value = data;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка получения данных:', err);
        alert(`Ошибка получения данных: ${err.message}`);
      }
    }
  }

  // Return public api`s
  return { profile, fetchProfile };
});
