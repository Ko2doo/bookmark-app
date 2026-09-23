import { ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, http } from '@/api';
import type { Category } from '@/types/category';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories(): Promise<void> {
    try {
      const { data, status } = await http.get<Category[]>(API_ROUTES.categories);

      if (status !== 200) {
        categories.value = [];
        return;
      }

      categories.value = data;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка получения категорий:', err);
        alert(`Ошибка получения категорий: ${err.message}`);
      }
    }
  }

  return { categories, fetchCategories };
});
