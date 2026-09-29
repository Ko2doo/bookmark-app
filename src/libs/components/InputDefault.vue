<script lang="ts" setup>
  const data = defineModel<string>();
</script>

<template>
  <input class="default-input" v-model="data" />
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .default-input {
    padding: rem(4) rem(2);

    font-size: var(--fsize-xl);
    font-weight: var(--fweight-regular);
    line-height: normal;

    display: block;

    color: var(--primary-color);
    background-color: transparent;

    border: unset;
    border-bottom: rem(1) solid var(--primary-color);

    &::placeholder {
      color: var(--primary-ghost-color);
    }

    &:focus-visible {
      outline: rem(2) solid var(--outline-primary-color);
    }
  }
</style>
