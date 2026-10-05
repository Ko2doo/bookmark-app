<script lang="ts" setup>
  const { keyId } = defineProps<{ keyId: string }>();

  const SORT_OPTIONS = [
    { keyId: 'date', name: 'По дате' },
    { keyId: 'title', name: 'По названию' },
  ];

  type SortingEmitType = { (e: 'sort', keyId: string): void };
  const emit = defineEmits<SortingEmitType>();
</script>

<template>
  <section class="categories-filter">
    <button
      class="btn-filter"
      v-for="filter in SORT_OPTIONS"
      :key="filter.keyId"
      :class="keyId === filter.keyId ? 'active' : ''"
      @click="() => emit('sort', filter.keyId)"
    >
      {{ filter.name }}
    </button>
  </section>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .categories-filter {
    display: flex;
    flex-wrap: nowrap;

    align-items: center;

    margin-top: clamp(#{rem(20)}, 2.4vw, #{rem(40)});
    gap: rem(18);

    width: 100%;
    scroll-behavior: auto;
    scrollbar-width: none;

    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .btn-filter {
    display: inline-block;
    text-align: center;

    font-size: var(--fsize-m);
    font-weight: var(--fweight-regular);
    line-height: normal;

    padding: rem(2) rem(8);

    background-color: transparent;
    color: var(--primary-ghost-color);
    border: none;

    @include media-hover(hover) {
      & {
        cursor: pointer;
      }
    }

    &.active {
      font-weight: var(--fweight-bold);
      color: var(--primary-color);

      text-decoration: underline;
    }
  }
</style>
