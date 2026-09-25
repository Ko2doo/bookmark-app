<script lang="ts" setup>
  import { onMounted } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import IconAdd from '@/libs/icons/IconAdd.vue';
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
        <RouterLink :to="`/main/${cat.alias}`" class="navigation-link">{{ cat.name }}</RouterLink>
      </li>
      <li class="navigation-list-item">
        <ButtonDefault
          :name-attr="'add-new-category'"
          :title="'Добавить новую категорию'"
          @click="store.createCategory"
        >
          <IconAdd size="22px" />
        </ButtonDefault>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;
</style>
