<script lang="ts" setup>
  type ButtonProps = {
    onlyIcon?: boolean;
    nameAttr: string | undefined;
    title: string;
  };

  const { onlyIcon = true } = defineProps<ButtonProps>();
</script>

<template>
  <button class="button" :data-onlyicon="onlyIcon" :name="nameAttr" :title="title">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .button {
    --default-size: #{rem(48)};
    --default-bg-color: var(--primary-color);
    --default-txt-color: var(--secondary-color);

    --btn-padding: #{rem(12)} #{rem(22)};

    font-size: var(--fsize-l);
    font-weight: var(--fweight-regular);
    line-height: normal;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    padding: var(--btn-padding);

    border: none;
    border-radius: rem(40);
    background: var(--default-bg-color);
    color: var(--default-txt-color);

    @include media-hover(hover) {
      & {
        cursor: pointer;
      }
    }

    // @include media-hover(none) {}

    &[data-onlyicon='true'] {
      --btn-padding: 0;

      width: var(--default-size);
      height: var(--default-size);

      border: rem(2) solid var(--default-txt-color);
      border-radius: var(--border-radius-full);
    }
  }
</style>
