<script lang="ts" setup>
  import { onMounted } from 'vue';

  import { useProfileStore } from '@/stores/profile.store';

  const store = useProfileStore();

  onMounted(async () => {
    await store.fetchProfile();
  });
</script>

<template>
  <div class="profile" v-if="store.profile">
    <img src="@assets/user-avatar.png" alt="User avatar" class="user-ava" />
    <h1 class="username">
      Привет, <strong>{{ store.profile.name }}</strong>
    </h1>
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .profile {
    display: flex;
    flex-direction: column;

    gap: rem(24);
  }

  .user-ava {
    flex: 0 0 auto;
    width: 80px;
    height: 80px;

    object-fit: cover;
    object-position: center;

    overflow: hidden;
    border-radius: 50%;
  }

  .username {
    display: block;

    font-size: var(--fsize-l);
    font-weight: var(--fweight-regular);
    line-height: normal;

    color: var(--primary-color);
  }
</style>
