import { ref } from 'vue';

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import { API_ROUTES, client } from '@/api';
import type { Bookmark } from '@/types/bookmark';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Bookmark[]>([]);

  async function fetchBookmarks(categoryId: number) {
    try {
      const { data, status } = await client().get<Bookmark[]>(API_ROUTES.bookmarks(categoryId));

      if (status !== 200) {
        bookmarks.value = [];
        throw new Error(`Не удалось получить закладки (статус ${status})`);
      }

      bookmarks.value = data;
    } catch (err) {
      bookmarks.value = [];

      if (err instanceof Error) {
        console.error('Ошибка получения закладок:', err);
      }

      throw err;
    }
  }

  async function createBookmark(categoryId: number) {
    try {
      const { data } = await client().post<Bookmark>(API_ROUTES.bookmarks(categoryId), {
        name: 'Нова',
        alias: uuidv4(),
      });

      bookmarks.value.push(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка получения закладок:', err);
      }

      throw err;
    }
  }

  return { bookmarks, fetchBookmarks, createBookmark };
});
