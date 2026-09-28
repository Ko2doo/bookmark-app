<script lang="ts" setup>
  import BookmarkCard from '@/components/BookmarkCard.vue';
</script>

<template>
  <div class="main-bookmarks">
    <BookmarkCard class="bookmark" />
    <BookmarkCard class="bookmark" />
    <BookmarkCard class="bookmark" />
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .main-bookmarks {
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    padding: rem(22) 0;

    @media (min-width: rem(1200)) {
      padding: 0;
    }
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
