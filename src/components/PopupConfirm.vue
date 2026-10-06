<script lang="ts" setup>
  import { onUnmounted, watch } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';

  type PopupConfirmProps = { isOpened: boolean; text: string };
  const { isOpened, text } = defineProps<PopupConfirmProps>();

  type EmitButtonTypes = { (e: 'ok'): void; (e: 'cancel'): void };
  const emit = defineEmits<EmitButtonTypes>();

  const POPUP_OPEN_CLASS = 'popup-opened';

  watch(
    () => isOpened,
    (newValue) => {
      document.body.classList.toggle(POPUP_OPEN_CLASS, newValue);
    },
    { immediate: true },
  );

  onUnmounted(() => {
    document.body.classList.remove(POPUP_OPEN_CLASS);
  });
</script>

<template>
  <Transition name="fade">
    <Teleport to="body">
      <article class="popup" v-if="isOpened">
        <div class="popup-content">
          <div class="popup-message">
            <p>{{ text }}</p>
          </div>

          <div class="popup-actions">
            <ButtonDefault
              :name-attr="'confirm'"
              :title="'Подтвердить действие'"
              :only-icon="false"
              @click="emit('ok')"
            >
              <span>Да</span>
            </ButtonDefault>

            <ButtonDefault
              :name-attr="'decline'"
              :title="'Отменить действие'"
              :only-icon="false"
              @click="emit('cancel')"
            >
              <span>Нет</span>
            </ButtonDefault>
          </div>
        </div>
      </article>
    </Teleport>
  </Transition>
</template>

<style lang="scss" scoped>
  @use '@styles/tools/tools' as *;
  @use '@styles/tools/mixins' as *;

  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    z-index: 10;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    background-color: var(--primary-notify-color);
  }

  .popup-content {
    min-width: rem(320);
    padding: rem(22) rem(16);

    background-color: var(--root-bg-color);
    border-radius: var(--border-radius-l);
  }

  .popup-message {
    font-size: var(--fsize-m);
    font-weight: var(--fweight-medium);
    line-height: normal;

    color: var(--primary-color);
  }

  .popup-actions {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;

    margin-top: rem(22);
    gap: rem(14);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
