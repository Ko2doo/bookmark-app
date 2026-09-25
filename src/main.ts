import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './routes.ts';
import './style.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
