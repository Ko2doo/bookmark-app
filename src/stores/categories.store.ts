import { ref } from 'vue';

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import { API_ROUTES, http } from '@/api';
import type { Category } from '@/types/category';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    try {
      const { data, status } = await http.get<Category[]>(API_ROUTES.categories);

      if (status !== 200) {
        categories.value = [];
        throw new Error(`Не удалось получить категории (статус ${status})`);
      }

      categories.value = data;
    } catch (err) {
      categories.value = [];

      if (err instanceof Error) {
        console.error('Ошибка получения категорий:', err);
      }

      throw err;
    }
  }

  async function createCategory() {
    try {
      const { data } = await http.post<Category>(API_ROUTES.categories, {
        name: 'Новая категория',
        alias: uuidv4(),
      });

      categories.value.push(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка получения категорий:', err);
      }

      throw err;
    }
  }

  type CategoryAlias = string | string[] | undefined;

  function getCategoryByAlias(alias: CategoryAlias): Category | undefined {
    if (typeof alias == 'string') {
      return categories.value.find((cat) => cat.alias == alias);
    }

    return;
  }

  return { categories, fetchCategories, createCategory, getCategoryByAlias };
});
