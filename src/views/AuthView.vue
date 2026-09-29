<script lang="ts" setup>
  import { ref } from 'vue';

  import ButtonDefault from '@/libs/components/ButtonDefault.vue';
  import InputDefault from '@/libs/components/InputDefault.vue';
  import { useAuthStore } from '@/stores/auth.store';
  import { useNotificationsStore } from '@/stores/notifications.store';

  // Reactivities
  type AuthForm = { email?: string; password?: string };
  const authForm = ref<AuthForm>({});
  const formError = ref<string | null>(null);

  // Stores
  const authStore = useAuthStore();
  const notifications = useNotificationsStore();

  async function onSubmit(event: Event) {
    event.preventDefault();
    formError.value = null;

    try {
      if (!authForm.value.email || !authForm.value.password) return;

      await authStore.login({
        email: authForm.value.email,
        password: authForm.value.password,
      });
    } catch (error) {
      if (error instanceof Error) {
        notifications.push(error.message);
      }
    }
  }
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Bookmarkly app</h1>

    <form class="auth-form" aria-label="Авторизация" @submit="onSubmit">
      <p v-if="formError" class="error">
        <code>{{ formError }}</code>
      </p>

      <InputDefault
        v-model="authForm.email"
        id="user-email"
        type="email"
        name="email"
        aria-label="Email"
        placeholder="Email"
        autocomplete="email"
        autocapitalize="off"
        spellcheck="false"
        required
      />
      <InputDefault
        v-model="authForm.password"
        id="user-pass"
        type="password"
        name="password"
        aria-label="Password"
        placeholder="Password"
        autocomplete="current-password"
        enterkeyhint="go"
        required
      />

      <ButtonDefault
        class="button-auth"
        :only-icon="false"
        :name-attr="'authorisation'"
        :title="'Авторизация'"
        type="submit"
      >
        <span>Вход</span>
      </ButtonDefault>

      {{ authStore.token }}
    </form>
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

  .auth-form {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: clamp(#{rem(20)}, 4vw, #{rem(40)});
  }

  .error {
    font-size: var(--fsize-l);
    font-weight: var(--fweight-bold);
    line-height: normal;

    display: block;

    color: var(--error-color);
  }
</style>
