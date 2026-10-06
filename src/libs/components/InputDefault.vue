<script lang="ts" setup>
  import { onMounted, useTemplateRef } from 'vue';

  const data = defineModel<string>();
  const { isFocused = false } = defineProps<{ isFocused?: boolean }>();

  const input = useTemplateRef<HTMLInputElement>('input');

  onMounted(() => {
    if (isFocused && input.value) input.value.focus();
  });
</script>

<template>
  <input class="default-input" v-model="data" ref="input" />
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
