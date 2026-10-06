<!-- eslint-disable vue/prop-name-casing -->
<script lang="ts" setup>
  import { ref } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import IconLink from '@/libs/icons/IconLink.vue';
  import IconRemove from '@/libs/icons/IconRemove.vue';
  import { useBookmarkStore } from '@/stores/bookmark.store';
  import { useNotificationsStore } from '@/stores/notifications.store';
  import type { Bookmark } from '@/types/bookmark';

  import PopupConfirm from './PopupConfirm.vue';

  const { id, category_id, url, image, title } = defineProps<Bookmark>();

  const bookmarkStore = useBookmarkStore();
  const notification = useNotificationsStore();

  const isOpened = ref<boolean>(false);

  function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        notification.push('Ссылка скопирована в буфер обмена');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          notification.push(`Ошибка при копировании в буфер обмена: ${err.message}`);
        }
      });
  }

  async function deleteBookmark() {
    isOpened.value = !isOpened.value;

    try {
      await bookmarkStore.deleteBookmark(id, category_id);
    } catch (error) {
      if (error instanceof Error) {
        notification.push(error.message);
      }
    }
  }
</script>

<template>
  <article class="bookmark-card">
    <a :href="url" target="_blank" rel="noopener noreferrer" class="bookmark-link">
      <div class="bookmark-content">
        <img :src="image" :alt="title" class="preview" />

        <h6 class="title">{{ title }}</h6>
      </div>
    </a>

    <div class="bookmark-footer">
      <ButtonDefault :name-attr="'remove'" :title="'Удалить'" @click="isOpened = !isOpened">
        <IconRemove size="24px" />
      </ButtonDefault>

      <ButtonDefault :name-attr="'share'" :title="'Поделиться'" @click="copyToClipboard(url)">
        <IconLink size="24px" />
      </ButtonDefault>
    </div>

    <PopupConfirm
      text="Вы действительно хотите удалить закладку?"
      :is-opened="isOpened"
      @ok="deleteBookmark"
      @cancel="isOpened = !isOpened"
    />
  </article>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .bookmark-card {
    display: flex;
    flex-direction: column;

    gap: rem(24);
    padding: var(--paddings-size-l);

    border-radius: var(--border-radius-xl);
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  .bookmark-link {
    color: var(--secondary-color);
  }

  .bookmark-content {
    display: flex;
    flex-direction: column;

    gap: rem(24);
  }

  .preview {
    flex: 0 0 auto;
    width: 100%;
    height: rem(162);

    object-fit: cover;
    object-position: center;

    border-radius: var(--border-radius-l);
  }

  .title {
    font-size: var(--fsize-m);
    font-weight: var(--fweight-medium);
    line-height: normal;

    display: block;

    text-align: left;
  }

  .bookmark-footer {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;

    margin-top: auto;
  }
</style>
