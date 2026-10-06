import { ref } from 'vue';

import { defineStore } from 'pinia';

import { API_ROUTES, client } from '@/api';
import type { Bookmark } from '@/types/bookmark';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Bookmark[]>([]);
  const activeSort = ref<string>('date');

  async function fetchBookmarks(categoryId: number, sort: string) {
    try {
      const { data, status } = await client().get<Bookmark[]>(
        API_ROUTES.bookmarks.get(categoryId),
        {
          params: {
            sort,
          },
        },
      );

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

  async function addBookmark(url: string, category_id: number) {
    try {
      const { data } = await client().post<Bookmark>(API_ROUTES.bookmarks.create, {
        url,
        category_id,
      });

      bookmarks.value.push(data);
      await fetchBookmarks(category_id, activeSort.value);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка создания закладки:', err);
      }

      throw err;
    }
  }

  async function deleteBookmark(id: number, categoryId: number) {
    try {
      await client().delete<Bookmark[]>(API_ROUTES.bookmarks.delete(id));
      await fetchBookmarks(categoryId, activeSort.value);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Ошибка удаления заклади:', err);
      }

      throw err;
    }
  }

  return { bookmarks, fetchBookmarks, addBookmark, deleteBookmark, activeSort };
});
