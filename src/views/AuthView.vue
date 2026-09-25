<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';

  const router = useRouter();

  const redirectToMain = () => {
    return router.push({
      name: 'main',
    });
  };
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Bookmarkly app</h1>
    <ButtonDefault
      class="button-auth"
      :only-icon="false"
      :name-attr="'authorisation'"
      :title="'Авторизация'"
      @click="redirectToMain()"
    >
      <span>Вход</span>
    </ButtonDefault>
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .wrapper {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: rem(52);

    height: 100dvh;
  }

  .title {
    font-size: var(--fsize-xxl);
    font-weight: var(--fweight-bold);
    line-height: normal;

    display: block;

    color: var(--primary-color);
  }

  .button-auth {
    --btn-padding: #{rem(12)} #{rem(40)};

    @media (min-width: rem(520)) {
      --btn-padding: #{rem(12)} #{rem(70)};
    }
  }
</style>
