<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { useRoute } from 'vue-router';

  import BookmarkCard from '@/components/BookmarkCard.vue';
  import BookmarkSort from '@/components/BookmarkSort.vue';
  import CategoryEditor from '@/components/CategoryEditor.vue';
  import { useBookmarkStore } from '@/stores/bookmark.store';
  import { useCategoryStore } from '@/stores/categories.store';
  import { useNotificationsStore } from '@/stores/notifications.store';
  import type { Category } from '@/types/category';

  const route = useRoute();

  const categoryStore = useCategoryStore();
  const bookmarkStore = useBookmarkStore();
  const notification = useNotificationsStore();

  // States
  const category = ref<Category>();

  async function sortBookmarks(sort: string) {
    bookmarkStore.activeSort = sort;

    if (category.value) {
      await bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
    }
  }

  watch(
    () => ({
      alias: route.params.alias,
      categories: categoryStore.categories,
    }),
    async (data) => {
      category.value = categoryStore.getCategoryByAlias(data.alias);

      if (!category.value) {
        if (data.categories.length > 0) {
          notification.push('Категория не найдена');
        }

        return;
      }

      try {
        await bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
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
  <CategoryEditor v-if="category" :category="category" />
  <BookmarkSort :key-id="bookmarkStore.activeSort" @sort="sortBookmarks" />

  <section class="main-bookmarks">
    <BookmarkCard
      v-for="item in bookmarkStore.bookmarks"
      :key="item.id"
      v-bind="item"
      class="bookmark"
    />
  </section>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .main-bookmarks {
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    padding-top: clamp(rem(34), 4vw, #{rem(68)});
  }

  .bookmark {
    width: 100%;

    margin-bottom: var(--cards-offset);

    @media (min-width: rem(1200)) {
      @include size(2, 3);

      & {
        margin-bottom: 0;
      }
    }
  }
</style>
