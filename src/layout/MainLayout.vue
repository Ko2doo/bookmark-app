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
  }

  .bookmark {
    width: 100%;

    @media (min-width: rem(1200)) {
      @include size(2, 3);
    }
  }
</style>
