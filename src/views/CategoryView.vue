<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { useRoute } from 'vue-router';

  import BookmarkAdd from '@/components/BookmarkAdd.vue';
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
  const scrollContainer = ref<HTMLElement | null>(null);
  const category = ref<Category>();

  async function sortBookmarks(sort: string) {
    bookmarkStore.activeSort = sort;

    if (category.value) {
      await bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
    }
  }

  function handleWheel(event: WheelEvent) {
    if (event.deltaY === 0) return;

    const container = scrollContainer.value;
    if (!container) return;

    const isScrollingForward = event.deltaY > 0;

    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
    const canScrollLeft = container.scrollLeft > 1;

    if ((isScrollingForward && canScrollRight) || (!isScrollingForward && canScrollLeft)) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
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

  <section ref="scrollContainer" class="main-bookmarks" @wheel="handleWheel">
    <BookmarkAdd v-if="category" class="bookmark-add" :category_id="category.id" />

    <BookmarkCard
      v-for="item in bookmarkStore.bookmarks"
      :key="item.id"
      v-bind="item"
      class="bookmark"
    />

    <BookmarkAdd
      v-if="category && bookmarkStore.bookmarks.length > 3"
      class="bookmark-add"
      :category_id="category.id"
    />
  </section>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .main-bookmarks {
    width: 100%;

    display: flex;
    flex-wrap: nowrap;

    scroll-behavior: auto;
    scrollbar-width: none;

    overflow-x: scroll;

    padding-top: clamp(rem(34), 4vw, #{rem(68)});

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .bookmark,
  .bookmark-add {
    @include size(2, 2);

    & {
      flex-shrink: 0;
      width: 80%;

      margin-bottom: var(--cards-offset);
    }

    @media (min-width: rem(560)) {
      @include size(1, 2);

      & {
        margin-bottom: 0;
      }
    }

    @media (min-width: rem(920)) {
      @include size(2, 3);
    }

    @media (min-width: rem(1200)) {
      @include size(2, 3.3333);
    }
  }
</style>
