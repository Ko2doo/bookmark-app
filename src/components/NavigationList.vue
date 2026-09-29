<script lang="ts" setup>
  import { onMounted } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import IconAdd from '@/libs/icons/IconAdd.vue';
  import { useCategoryStore } from '@/stores/categories.store';
  import { useNotificationsStore } from '@/stores/notifications.store';

  const store = useCategoryStore();
  const notification = useNotificationsStore();

  onMounted(async () => {
    try {
      await store.fetchCategories();
    } catch (error) {
      if (error instanceof Error) {
        notification.push(error.message);
      }
    }
  });
</script>

<template>
  <nav class="navigation" v-if="store.categories.length">
    <ul class="navigation-list">
      <li class="navigation-list-item" v-for="cat in store.categories" :key="cat.id">
        <RouterLink
          exact-active-class="active-link"
          :to="`/main/${cat.alias}`"
          class="navigation-link"
          >{{ cat.name }}</RouterLink
        >
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

  .navigation {
    margin-top: clamp(#{rem(20)}, 4vw, #{rem(40)});
  }

  .navigation-list {
    display: flex;
    flex-direction: column;

    gap: clamp(#{rem(18)}, 4vw, #{rem(34)});
  }

  .navigation-link {
    font-size: var(--fsize-s);
    font-weight: var(--fweight-regular);
    line-height: normal;

    display: block;
    color: var(--primary-color);

    transition:
      0.2s color,
      ease-in-out;

    &.active-link {
      color: var(--primary-hover-color);
      font-weight: var(--fweight-medium);
    }
  }
</style>
