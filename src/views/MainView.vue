<script lang="ts" setup>
  import NavigationList from '@/components/NavigationList.vue';
  import ProfileAvatar from '@/components/ProfileAvatar.vue';
</script>

<template>
  <div class="app-wrapper">
    <aside class="navigation-menu">
      <ProfileAvatar />
      <NavigationList />
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
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
      @include make-size(3);
    }
  }

  .main-content {
    width: 100%;

    @media (min-width: rem(1200)) {
      @include make-size(9);
    }
  }
</style>
