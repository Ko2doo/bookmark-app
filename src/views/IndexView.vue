<template>
  <section class="welcome">
    <h1 class="title">Добро пожаловать в Bookmarkly!</h1>
    <p class="description">
      Чтобы начать пользоваться выберите категорию закладок или создайте новую.
    </p>
  </section>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .welcome {
    height: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;

    text-align: center;

    gap: rem(24);

    color: var(--primary-color);
  }

  .title {
    font-size: var(--fsize-xl);
    font-weight: var(--fweight-medium);
    line-height: normal;

    display: block;
  }

  .description {
    font-size: var(--fsize-m);
    font-weight: var(--fweight-regular);
    line-height: normal;

    display: block;
  }
</style>
