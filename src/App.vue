<script setup lang="ts">
  import ProfileAvatar from '@/components/ProfileAvatar.vue';

  import NavigationList from './components/NavigationList.vue';
</script>

<template>
  <div class="app-wrapper">
    <aside class="navigation-menu">
      <ProfileAvatar />
      <NavigationList />
    </aside>

    <main class="main-content">Контент</main>
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .app-wrapper {
    @include app-container;

    & {
      display: flex;
      flex-wrap: wrap;

      padding: clamp(rem(70), 4vw, rem(140)) 0;
    }
  }

  .navigation-menu {
    width: 100%;

    @media (min-width: rem(1200)) {
      @include make-size(4);
    }
  }

  .main-content {
    width: 100%;

    @media (min-width: rem(1200)) {
      @include make-size(8);
    }
  }
</style>
