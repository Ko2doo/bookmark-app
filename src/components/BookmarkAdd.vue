<!-- eslint-disable vue/prop-name-casing -->
<script lang="ts" setup>
  import { ref } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import InputDefault from '@/libs/components/InputDefault.vue';
  import IconAdd from '@/libs/icons/IconAdd.vue';
  import IconClose from '@/libs/icons/IconClose.vue';
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

  function closeFormAction() {
    isEdited.value = false;
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
        is-focused
        class="form-input"
        placeholder="Введите ссылку"
        id="write-new-bookmark"
        name="write-new-bookmark"
        type="text"
        required
      />

      <ButtonDefault
        class="btn-action"
        type="submit"
        :name-attr="'confirm-form-action'"
        :title="'Нажмите чтобы подтвердить'"
      >
        <IconConfirm :size="'var(--icon-size)'" />
      </ButtonDefault>

      <ButtonDefault
        class="btn-action"
        :name-attr="'decline-form-action'"
        :title="'Нажмите чтобы отменить действие'"
        @click="closeFormAction"
      >
        <IconClose :size="'var(--icon-size)'" />
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
    --icon-size: #{rem(24)};

    width: 100%;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;

    gap: rem(20) rem(8);

    @media (min-width: rem(1200)) {
      --icon-size: #{rem(18)};

      justify-content: space-between;
      gap: 0;
    }

    .btn-action {
      --default-size: #{rem(48)};

      @media (min-width: rem(1200)) {
        --default-size: #{rem(32)};
      }
    }
  }

  .form-input {
    min-width: rem(140);
    width: 100%;

    font-size: var(--fsize-l);

    @media (min-width: rem(1200)) {
      font-size: var(--fsize-m);
      width: 70%;
    }
  }
</style>
