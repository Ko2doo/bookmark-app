import { ref } from 'vue';

import { defineStore } from 'pinia';

type NotificationUI = {
  id: string;
  message: string;
};

export const useNotificationsStore = defineStore('notification', () => {
  const items = ref<NotificationUI[]>([]);

  function push(message: string) {
    const id = crypto.randomUUID();
    items.value.push({ id, message });

    // setTimeout(() => remove(id), 50000);
  }

  function remove(id: string) {
    items.value = items.value.filter((n) => n.id !== id);
  }

  return { items, push, remove };
});
