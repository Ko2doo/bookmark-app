<script lang="ts" setup>
  import { onMounted } from 'vue';

  import { useCategoryStore } from '@/stores/categories.store';

  const store = useCategoryStore();

  onMounted(async () => {
    await store.fetchCategories();
  });
</script>

<template>
  <nav class="navigation" v-if="store.categories">
    <ul class="navigation-list">
      <li class="navigation-list-item" v-for="cat in store.categories" :key="cat.id">
        <a :href="`/${cat.alias}`" class="navigation-link">{{ cat.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;
</style>
