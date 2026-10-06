<script lang="ts" setup>
  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import IconClose from '@/libs/icons/IconClose.vue';
  import { useNotificationsStore } from '@/stores/notifications.store';

  const store = useNotificationsStore();
</script>

<template>
  <div class="notifications" v-show="store.items.length">
    <TransitionGroup name="notify">
      <article v-for="n in store.items" :key="n.id" class="notification">
        <ButtonDefault
          :name-attr="'close-notify'"
          :title="'Закрыть окно'"
          class="btn-close"
          @click="store.remove(n.id)"
        >
          <IconClose :size="'var(--icon-size)'" />
        </ButtonDefault>

        <p>{{ n.message }}</p>
      </article>
    </TransitionGroup>
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

    gap: rem(10);
    padding: 0 rem(16);

    overflow-y: auto;
    overflow-x: hidden;

    background-color: transparent;
    color: var(--secondary-color);

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

    padding: rem(14);

    font-size: var(--fsize-l);
    font-weight: var(--fweight-medium);
    line-height: normal;

    background-color: var(--primary-color);
    border-radius: var(--border-radius-l);
  }

  .btn-close {
    --icon-size: #{rem(16)};
    --default-size: #{rem(28)};

    flex: 0 1 auto;
    margin-left: auto;
    margin-bottom: rem(12);
  }

  .notify-enter-active {
    animation: slide-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @keyframes slide-right {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notify-leave-active {
    animation: slide-out 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(50px);
      opacity: 0;
    }
  }
</style>
