<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { onBeforeRouteUpdate, useRoute } from 'vue-router';

  import { useCategoryStore } from '@/stores/categories.store';
  import type { Category } from '@/types/category';

  const route = useRoute();
  const state = useCategoryStore();
  const category = ref<Category>();

  watch(
    () => state.categories,

    () => (category.value = state.getCategoryByAlias(route.params.alias)),
    { immediate: true },
  );

  onBeforeRouteUpdate((to) => {
    category.value = state.getCategoryByAlias(to.params.alias);
  });
</script>

<template>Category {{ category?.name }}</template>
