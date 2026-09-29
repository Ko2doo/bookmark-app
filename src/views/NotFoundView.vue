<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';

  const router = useRouter();

  const redirectToMain = () => {
    return router.push({ name: 'main' });
  };
</script>

<template>
  <section class="not-found">
    <h1 class="title">404</h1>
    <ButtonDefault
      :only-icon="false"
      :name-attr="'navigate-back'"
      :title="'Вернуться на главную'"
      @click="redirectToMain()"
    >
      <span>На главную</span>
    </ButtonDefault>
  </section>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .not-found {
    height: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    text-align: center;

    gap: rem(24);

    color: var(--primary-color);
  }

  .title {
    font-size: clamp(#{rem(64)}, 4vw, #{rem(128)});
    font-weight: var(--fweight-bold);
    line-height: normal;

    display: block;
  }
</style>
