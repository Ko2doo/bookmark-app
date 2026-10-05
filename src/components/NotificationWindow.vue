<script lang="ts" setup>
  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import { useNotificationsStore } from '@/stores/notifications.store';

  const store = useNotificationsStore();
</script>

<template>
  <div class="notifications" v-if="store.items.length">
    <article v-for="n in store.items" :key="n.id" class="notification">
      {{ n.message }}

      <ButtonDefault
        :only-icon="false"
        :name-attr="'close-notify'"
        :title="'Закрыть окно'"
        class="btn-close"
        @click="store.remove(n.id)"
      >
        <span>Закрыть</span>
      </ButtonDefault>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .notifications {
    position: absolute;
    top: rem(22);

    width: 90%;
    max-height: rem(220);
    height: auto;

    display: flex;
    flex-direction: column;

    justify-self: center;

    gap: rem(20);
    padding: rem(12) rem(22);

    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    background-color: var(--primary-notify-color);
    color: var(--secondary-color);

    border: rem(4) solid var(--primary-color);
    border-radius: var(--border-radius-l);

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: rem(420)) {
      width: 80%;
    }

    @media (min-width: rem(640)) {
      width: rem(430);
      justify-self: flex-end;
      right: rem(22);
    }
  }

  .notification {
    display: flex;
    flex-direction: column;

    font-size: var(--fsize-l);
    font-weight: var(--fweight-medium);
    line-height: normal;

    &:has(+ .notification) {
      border-bottom: rem(2) solid var(--primary-color);

      &:not(:last-child) {
        padding-bottom: rem(20);
      }
    }
  }

  .btn-close {
    --btn-padding: #{rem(6)} #{rem(18)};

    font-size: var(--fsize-m);

    flex: 0 1 auto;
    margin-left: auto;
    margin-top: rem(10);
  }
</style>
