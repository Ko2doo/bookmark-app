<script lang="ts" setup>
  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import IconLink from '@/libs/icons/IconLink.vue';
  import IconRemove from '@/libs/icons/IconRemove.vue';

  type BookmarkCardProps = {
    preview: string;
    description: string;
  };

  const { preview, description } = defineProps<BookmarkCardProps>();
</script>

<template>
  <article class="bookmark-card">
    <figure class="figure">
      <img :src="preview" :alt="description" class="preview" />

      <figcaption class="figcaption">
        <p>{{ description }}</p>
      </figcaption>
    </figure>

    <div class="interactive-zone">
      <ButtonDefault :name-attr="'remove'" :title="'Удалить'">
        <IconRemove size="24px" />
      </ButtonDefault>

      <ButtonDefault :name-attr="'share'" :title="'Поделиться'">
        <IconLink size="24px" />
      </ButtonDefault>
    </div>
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

  .figure {
    display: flex;
    flex-direction: column;

    gap: rem(24);
  }

  .preview {
    flex: 0 0 auto;
    width: 100%;
    height: 162px;

    object-fit: cover;
    object-position: center;

    overflow: hidden;
    border-radius: var(--border-radius-l);
  }

  .figcaption {
    font-size: var(--fsize-m);
    font-weight: var(--fweight-medium);
    line-height: normal;

    display: block;

    text-align: left;
  }

  .interactive-zone {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
  }
</style>
