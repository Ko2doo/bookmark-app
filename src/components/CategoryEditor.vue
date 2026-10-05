<script lang="ts" setup>
  import { ref } from 'vue';

  import { useRouter } from 'vue-router';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import InputDefault from '@/libs/components/InputDefault.vue';
  import IconConfirm from '@/libs/icons/IconConfirm.vue';
  import IconEdit from '@/libs/icons/IconEdit.vue';
  import IconMoveToTrash from '@/libs/icons/IconMoveToTrash.vue';
  import { useCategoryStore } from '@/stores/categories.store';
  import { useNotificationsStore } from '@/stores/notifications.store';
  import type { Category } from '@/types/category';

  const { category } = defineProps<{ category: Category }>();

  const router = useRouter();
  const categoryStore = useCategoryStore();
  const notification = useNotificationsStore();

  // States
  const categoryNewName = ref<string>();
  const categoryIsEdited = ref<boolean>(false);

  function toggleCategoryEditor() {
    if (!categoryIsEdited.value) {
      categoryNewName.value = category.name;
    }

    categoryIsEdited.value = !categoryIsEdited.value;
  }

  async function updateCategory(event: Event) {
    event.preventDefault();

    if (!categoryNewName.value) return;

    try {
      await categoryStore.updateCategory(category.id, categoryNewName.value, category.alias);
      toggleCategoryEditor();
    } catch (error) {
      if (error instanceof Error) {
        notification.push(error.message);
      }
    }
  }

  async function deleteCategory() {
    try {
      await categoryStore.deleteCategory(category.id);
      await router.push({ name: 'main' });
    } catch (error) {
      if (error instanceof Error) {
        notification.push(error.message);
      }
    }
  }
</script>

<template>
  <header class="category-customization">
    <div class="category">
      <h2 class="category-name" v-if="!categoryIsEdited">
        {{ category.name }}
      </h2>

      <form class="form-action" v-if="categoryIsEdited" @submit="updateCategory">
        <InputDefault
          v-model="categoryNewName"
          id="write-new-category"
          name="write-new-category"
          type="text"
          :placeholder="category?.name"
        />

        <ButtonDefault :title="'Подтвердить'" :name-attr="'confirm'" type="submit">
          <IconConfirm :size="'22px'" />
        </ButtonDefault>
      </form>
    </div>

    <div class="category-manipulation">
      <ButtonDefault
        :title="'Удалить категорию'"
        :name-attr="'delete-category'"
        @click="deleteCategory"
      >
        <IconMoveToTrash :size="'18px'" />
      </ButtonDefault>

      <ButtonDefault
        :title="'Редактировать категорию'"
        :name-attr="'edit-category'"
        @click="toggleCategoryEditor"
      >
        <IconEdit :size="'18px'" />
      </ButtonDefault>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .category-customization {
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-between;
  }

  .category {
    display: flex;
    flex-wrap: wrap;

    align-items: center;

    gap: rem(10);
  }

  .form-action {
    display: flex;
    flex-wrap: wrap;

    gap: rem(10);
  }

  .category-name {
    font-size: var(--fsize-xl);
    font-weight: var(--fweight-medium);
    line-height: normal;

    display: inline-block;
    color: var(--primary-color);
  }

  .category-manipulation {
    display: flex;
    flex-wrap: wrap;

    gap: rem(10);
  }
</style>
