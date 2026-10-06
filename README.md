# Bookmarkly

Менеджер закладок на **Vue 3 + Pinia + Vue Router**. Финальный проект курса по Vue 3: клиентская часть общается с REST API (Go-бинарник из курса), хранит токен авторизации и показывает ошибки через собственную систему уведомлений.

<video src="./.preview/preview.webm" width="100%" controls></video>

> Название репозитория — `bookmark-app`, в интерфейсе приложение называется **Bookmarkly**.

🇬🇧 [Read in English](./README.en.md)

## Возможности

- Авторизация по email и паролю, токен хранится в `localStorage`, повторный вход не нужен
- Защита маршрутов: неавторизованного пользователя редирект ведёт на страницу входа
- Категории: создание, переименование, удаление
- Закладки: добавление по ссылке, удаление, копирование ссылки в буфер обмена
- Заголовок и превью закладки приходят от API
- Сортировка закладок по дате и по названию
- Горизонтальная лента закладок: вертикальное колесо мыши прокручивает её вбок
- Система уведомлений об ошибках и событиях (`NotificationWindow.vue`)
- Страница 404

## Стек

| Область       | Технологии                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| Фреймворк     | Vue 3 (Composition API, `<script setup>`)                                  |
| Состояние     | Pinia (setup-stores)                                                       |
| Роутинг       | Vue Router (lazy-загрузка страниц, `beforeEach`-гард)                      |
| HTTP          | Axios (общий инстанс, interceptor с Bearer-токеном)                        |
| Язык          | TypeScript, проверка типов через `vue-tsc`                                 |
| Сборка        | Vite                                                                       |
| Стили         | SCSS, PostCSS (autoprefixer, `postcss-sort-media-queries`), CSS-переменные |
| Качество кода | ESLint, Prettier (с сортировкой импортов), EditorConfig                    |

## Требования

- Node.js **>= 24.12** (версия для `nvm` указана в `.nvmrc`)
- Linux amd64 для запуска бэкенда из репозитория (`bookmark-api-linux-amd64`)

## Быстрый старт

### 1. Запустите API

Бэкенд из курса лежит в корне репозитория вместе с базой `bookmarks.db`. Он слушает порт `3000`, именно на него настроен клиент (`http://localhost:3000/api/`).

```bash
chmod +x ./bookmark-api-linux-amd64
./bookmark-api-linux-amd64
```

Описание эндпоинтов и тестовые запросы лежат в Insomnia-коллекции `insomnia/BookmarkAPI.json` (импортируйте её в Insomnia или Postman). Там же есть данные тестового пользователя для входа.

### 2. Запустите клиент

```bash
nvm use          # опционально, подхватит версию из .nvmrc
npm install
npm run dev
```

Откройте адрес, который выведет Vite (по умолчанию `http://localhost:5173`).

## Скрипты

| Команда              | Что делает                                               |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | dev-сервер Vite с HMR                                    |
| `npm run build`      | проверка типов (`vue-tsc`) и production-сборка в `dist/` |
| `npm run preview`    | локальный просмотр production-сборки                     |
| `npm run type-check` | только проверка типов                                    |
| `npm run lint`       | ESLint с автоисправлением                                |
| `npm run format`     | Prettier по `src/`                                       |

## Структура проекта

```text
src/
├── api.ts                  # Axios-инстанс, interceptors, карта API_ROUTES
├── routes.ts               # маршруты и гард авторизации
├── main.ts                 # точка входа (Pinia + Router)
├── App.vue                 # RouterView + NotificationWindow
├── stores/                 # Pinia: auth, profile, categories, bookmark, notifications
├── views/                  # страницы: Auth, Main, Index, Category, NotFound
├── components/             # BookmarkCard, BookmarkAdd, BookmarkSort,
│                           # CategoryEditor, NavigationList, ProfileAvatar,
│                           # NotificationWindow
├── libs/
│   ├── components/         # базовые UI-компоненты: ButtonDefault, InputDefault
│   └── icons/              # SVG-иконки как Vue-компоненты
├── helpers/                # обёртки над localStorage
├── types/                  # типы данных API и пропсов
└── assets/                 # шрифты Montserrat, SCSS (ui/, tools/), аватар
```

## Как это устроено

**API-слой.** Все запросы идут через один Axios-инстанс (`src/api.ts`). Interceptor подставляет заголовок `Authorization: Bearer <token>` из `auth`-стора. Адреса эндпоинтов собраны в объект `API_ROUTES`, чтобы не размазывать строки по коду. Инстанс создан с `validateStatus: () => true`, поэтому статусы ответов проверяются в сторах явно.

**Сторы (Pinia).** Каждый домен вынесен в отдельный стор: `auth` (логин, токен), `profile`, `categories` (CRUD и поиск по alias), `bookmarks` (загрузка, добавление, удаление, активная сортировка), `notifications`. Стор бросает ошибку, а компонент решает, как её показать.

**Роутинг.** Маршруты `/` (вход), `/main` (каркас с боковой навигацией) и вложенные `/main/:alias` для категорий. Страницы подгружаются лениво. Глобальный `beforeEach` отправляет на `/`, если токена нет. Категория открывается по `alias`, а не по числовому `id`.

**Уведомления.** `notifications.store.ts` хранит очередь сообщений, `NotificationWindow.vue` отображает её поверх приложения. Любой компонент ловит ошибку из стора и делает `notification.push(error.message)`. Окно с несколькими сообщениями прокручивается, каждое закрывается кнопкой.

**Стили.** Дизайн-токены (цвета, размеры шрифтов, радиусы, отступы) лежат в CSS-переменных, размеры адаптируются через `clamp()`. Общие SCSS-инструменты (`rem()`, миксины) подключаются в компонентах через `@use`. Алиасы `@`, `@assets`, `@styles`, `@components` настроены в `vite.config.ts`.

## Эндпоинты API, которые использует клиент

| Метод  | Путь                                             | Назначение                               |
| ------ | ------------------------------------------------ | ---------------------------------------- |
| POST   | `/api/auth/login`                                | вход, возвращает токен                   |
| GET    | `/api/auth/profile`                              | данные профиля для приветствия           |
| GET    | `/api/categories`                                | список категорий                         |
| POST   | `/api/categories`                                | создать категорию                        |
| PUT    | `/api/categories/:id`                            | переименовать категорию                  |
| DELETE | `/api/categories/:id`                            | удалить категорию                        |
| GET    | `/api/categories/:id/bookmarks?sort=date\|title` | закладки категории                       |
| POST   | `/api/bookmarks`                                 | добавить закладку (`url`, `category_id`) |
| DELETE | `/api/bookmarks/:id`                             | удалить закладку                         |

## О проекте

Проект выполнен в рамках курса по Vue 3. С курсом связаны работа с API, Pinia и Vue Router. От учебного варианта отличаются файловая структура, код и вёрстка. Система уведомлений об ошибках (`NotificationWindow.vue` и `notifications.store.ts`) и часть стилей написаны самостоятельно.
