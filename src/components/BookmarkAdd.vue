<!-- eslint-disable vue/prop-name-casing -->
<script lang="ts" setup>
  import { ref } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import InputDefault from '@/libs/components/InputDefault.vue';
  import IconAdd from '@/libs/icons/IconAdd.vue';
  import IconConfirm from '@/libs/icons/IconConfirm.vue';
  import { useBookmarkStore } from '@/stores/bookmark.store';
  import { useNotificationsStore } from '@/stores/notifications.store';

  const { category_id } = defineProps<{ category_id: number }>();

  const bookmarkStore = useBookmarkStore();
  const notification = useNotificationsStore();

  const isEdited = ref<boolean>(false);
  const bookmarkNewUrl = ref<string | undefined>(undefined);

  function toggleBookmarkEditor() {
    isEdited.value = !isEdited.value;
  }

  async function onFormAction(event: Event) {
    event.preventDefault();

    if (!bookmarkNewUrl.value) return;

    try {
      await bookmarkStore.addBookmark(bookmarkNewUrl.value, category_id);
      isEdited.value = false;
      bookmarkNewUrl.value = undefined;
    } catch (error) {
      if (error instanceof Error) {
        notification.push(error.message);
      }
    }
  }
</script>

<template>
  <article class="add-bookmark">
    <ButtonDefault
      v-if="!isEdited"
      :title="'Добавить новую вкладку'"
      :name-attr="'add-new-bookmark'"
      @click="toggleBookmarkEditor"
    >
      <IconAdd :size="'24px'" />
    </ButtonDefault>

    <form v-else class="form-action" @submit="onFormAction">
      <InputDefault
        v-model="bookmarkNewUrl"
        class="form-input"
        placeholder="Введите ссылку"
        id="write-new-bookmark"
        name="write-new-bookmark"
        type="text"
        required
      />

      <ButtonDefault
        type="submit"
        :name-attr="'confirm-form-action'"
        :title="'Нажмите чтобы подтвердить'"
      >
        <IconConfirm :size="'24px'" />
      </ButtonDefault>
    </form>
  </article>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .add-bookmark {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding: var(--paddings-size-l);

    background-color: transparent;
    border-radius: var(--border-radius-xl);
    border: rem(2) dotted var(--primary-color);
  }

  .form-action {
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;

    gap: rem(20);

    @media (min-width: rem(1200)) {
      justify-content: space-between;
      gap: 0;
    }
  }

  .form-input {
    min-width: rem(140);
    width: 100%;

    font-size: var(--fsize-l);

    @media (min-width: rem(1200)) {
      width: 75%;
    }
  }
</style>
