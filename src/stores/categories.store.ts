import { ref } from 'vue';

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import { API_ROUTES, client } from '@/api';
import type { Category } from '@/types/category';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    try {
      const { data, status } = await client().get<Category[]>(API_ROUTES.categories);

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
      const { data } = await client().post<Category>(API_ROUTES.categories, {
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

  async function updateCategory(id: number, name: string, alias: string) {
    try {
      await client().put<Category>(API_ROUTES.update_category(id), {
        name,
        alias,
      });

      await fetchCategories();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка обновления категории:', err);
      }

      throw err;
    }
  }

  async function deleteCategory(id: number) {
    try {
      await client().delete<Category>(API_ROUTES.update_category(id));
      await fetchCategories();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка обновления категории:', err);
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

  return {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByAlias,
  };
});
