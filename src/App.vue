<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import ProfileAvatar from '@/components/ProfileAvatar.vue';
  import type { Profile } from '@/interfaces/profile.ts';

  import { API_ROUTES } from './api.ts';

  const profile = ref<Profile>();

  async function fetchProfile(): Promise<void> {
    const data = await fetch(API_ROUTES.profile);
    const res = (await data.json()) as Profile;

    profile.value = res;
  }

  onMounted(async () => {
    await fetchProfile();
  });
</script>

<template>
  <div class="app-wrapper">
    <aside class="navigation-menu">
      <ProfileAvatar v-if="profile" :name="profile.name" />
      <nav class="navigation">
        <ul class="navigation-list">
          <li class="navigation-list-item">
            <a href="#" class="navigation-link">Спорт</a>
          </li>
        </ul>
      </nav>
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
