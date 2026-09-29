<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { useRoute } from 'vue-router';

  import { useBookmarkStore } from '@/stores/bookmark.store';
  import { useCategoryStore } from '@/stores/categories.store';
  import { useNotificationsStore } from '@/stores/notifications.store';
  import type { Category } from '@/types/category';

  const route = useRoute();
  const categoryStore = useCategoryStore();
  const bookmarkStore = useBookmarkStore();
  const notification = useNotificationsStore();
  const category = ref<Category>();

  watch(
    () => ({
      alias: route.params.alias,
      categories: categoryStore.categories,
    }),
    async (data) => {
      category.value = categoryStore.getCategoryByAlias(data.alias);

      if (!category.value) {
        notification.push('Категория не найдена');
        return;
      }

      try {
        await bookmarkStore.fetchBookmarks(category.value.id);
      } catch (error) {
        if (error instanceof Error) {
          notification.push(error.message);
        }
      }
    },
    { immediate: true },
  );
</script>

<template>
  Category {{ category?.name }}
  {{ bookmarkStore.bookmarks.length }}
</template>
