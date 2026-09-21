<script lang="ts" setup>
  const { name } = defineProps<{ name: string }>();
</script>

<template>
  <div class="profile">
    <img src="@assets/user-avatar.png" alt="User avatar" class="user-ava" />
    <h1 class="username">
      Привет, <strong>{{ name }}</strong>
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
