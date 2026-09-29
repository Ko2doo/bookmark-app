<script lang="ts" setup>
  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import { useNotificationsStore } from '@/stores/notifications.store';

  const store = useNotificationsStore();
</script>

<template>
  <div class="notifications" v-if="store.items.length">
    <code v-for="n in store.items" :key="n.id" class="notification">
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
    </code>
  </div>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .notifications {
    position: absolute;
    top: rem(22);
    right: rem(22);

    width: calc(100% / 3);
    max-height: rem(260);
    height: auto;

    display: flex;
    flex-direction: column;

    gap: rem(22);
    padding: rem(12) rem(22);

    overflow-y: auto;

    background-color: var(--primary-ghost-color);
    color: var(--secondary-color);

    border: rem(4) solid var(--primary-color);
    border-radius: var(--border-radius-l);
  }

  .notification {
    display: flex;
    flex-wrap: wrap;
    align-self: flex-start;

    font-size: var(--fsize-m);
    font-weight: var(--fweight-medium);
    line-height: normal;

    &:has(+ .notification) {
      border-bottom: rem(2) solid var(--primary-color);

      &:not(:last-child) {
        margin-bottom: rem(20);
      }
    }
  }

  .btn-close {
    flex: 1 1 1;
    margin-left: auto;
    margin-top: rem(22);
  }
</style>
