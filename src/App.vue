<script setup lang="ts">
  import NotificationWindow from '@components/NotificationWindow.vue';
</script>

<template>
  <RouterView />
  <NotificationWindow />
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;
</style>
