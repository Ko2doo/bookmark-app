# Bookmarkly

A bookmark manager built with **Vue 3, Pinia and Vue Router**. This is the final project of a Vue 3 course: the client talks to a REST API (a Go binary provided by the course), persists the auth token, and surfaces errors through a custom notification system.

> The repository is called `bookmark-app`; in the UI the app is branded **Bookmarkly**.

🇷🇺 [Читать на русском](./README.md)

## Features

- Email and password sign-in; the token is kept in `localStorage`, so you stay signed in
- Route protection: unauthenticated users are redirected to the sign-in page
- Categories: create, rename, delete
- Bookmarks: add by URL, delete, copy the link to the clipboard
- Bookmark title and preview image are provided by the API
- Sort bookmarks by date or by title
- Horizontal bookmark strip: the vertical mouse wheel scrolls it sideways
- Custom notification system for errors and events (`NotificationWindow.vue`)
- 404 page

## Tech stack

| Area         | Technologies                                                                      |
| ------------ | --------------------------------------------------------------------------------- |
| Framework    | Vue 3 (Composition API, `<script setup>`)                                         |
| State        | Pinia (setup stores)                                                              |
| Routing      | Vue Router (lazy-loaded views, `beforeEach` guard)                                |
| HTTP         | Axios (shared instance, Bearer-token interceptor)                                 |
| Language     | TypeScript, type-checked with `vue-tsc`                                           |
| Build        | Vite                                                                              |
| Styles       | SCSS, PostCSS (autoprefixer, `postcss-sort-media-queries`), CSS custom properties |
| Code quality | ESLint, Prettier (with import sorting), EditorConfig                              |

## Requirements

- Node.js **>= 24.12** (the `nvm` version is pinned in `.nvmrc`)
- Linux amd64 to run the bundled backend (`bookmark-api-linux-amd64`)

## Getting started

### 1. Start the API

The course backend ships in the repo root together with its `bookmarks.db` database. It listens on port `3000`, which is what the client is configured for (`http://localhost:3000/api/`).

```bash
chmod +x ./bookmark-api-linux-amd64
./bookmark-api-linux-amd64
```

The endpoints and sample requests are in the Insomnia collection at `insomnia/BookmarkAPI.json` (import it into Insomnia or Postman). It also contains a test user you can sign in with.

### 2. Start the client

```bash
nvm use          # optional, picks up the version from .nvmrc
npm install
npm run dev
```

Open the URL printed by Vite (`http://localhost:5173` by default).

## Scripts

| Command              | What it does                                             |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                                 |
| `npm run build`      | type-check (`vue-tsc`) and production build into `dist/` |
| `npm run preview`    | preview the production build locally                     |
| `npm run type-check` | type-check only                                          |
| `npm run lint`       | ESLint with auto-fix                                     |
| `npm run format`     | Prettier over `src/`                                     |

## Project structure

```text
src/
├── api.ts                  # Axios instance, interceptors, API_ROUTES map
├── routes.ts               # routes and auth guard
├── main.ts                 # entry point (Pinia + Router)
├── App.vue                 # RouterView + NotificationWindow
├── stores/                 # Pinia: auth, profile, categories, bookmark, notifications
├── views/                  # pages: Auth, Main, Index, Category, NotFound
├── components/             # BookmarkCard, BookmarkAdd, BookmarkSort,
│                           # CategoryEditor, NavigationList, ProfileAvatar,
│                           # NotificationWindow
├── libs/
│   ├── components/         # base UI components: ButtonDefault, InputDefault
│   └── icons/              # SVG icons as Vue components
├── helpers/                # localStorage wrappers
├── types/                  # API data and props types
└── assets/                 # Montserrat fonts, SCSS (ui/, tools/), avatar
```

## How it works

**API layer.** Every request goes through a single Axios instance (`src/api.ts`). An interceptor attaches `Authorization: Bearer <token>` from the `auth` store. Endpoint paths live in an `API_ROUTES` object instead of being scattered as string literals. The instance uses `validateStatus: () => true`, so the stores check response statuses explicitly.

**Stores (Pinia).** Each domain has its own store: `auth` (login, token), `profile`, `categories` (CRUD and lookup by alias), `bookmarks` (fetch, add, delete, active sort), and `notifications`. Stores throw errors; components decide how to present them.

**Routing.** `/` (sign-in), `/main` (layout with a sidebar) and nested `/main/:alias` for categories. Views are lazy-loaded. A global `beforeEach` guard redirects to `/` when there is no token. Categories are addressed by `alias` rather than numeric `id`.

**Notifications.** `notifications.store.ts` holds a queue of messages and `NotificationWindow.vue` renders it on top of the app. Any component catches an error thrown by a store and calls `notification.push(error.message)`. The notification area scrolls when several messages stack up, and each one can be dismissed with its close button.

**Styling.** Design tokens (colors, font sizes, radii, spacing) are CSS custom properties, with sizes scaling via `clamp()`. Shared SCSS tools (`rem()`, mixins) are pulled into components with `@use`. The `@`, `@assets`, `@styles` and `@components` aliases are set up in `vite.config.ts`.

## API endpoints used by the client

| Method | Path                                             | Purpose                               |
| ------ | ------------------------------------------------ | ------------------------------------- |
| POST   | `/api/auth/login`                                | sign in, returns a token              |
| GET    | `/api/auth/profile`                              | profile data for the greeting         |
| GET    | `/api/categories`                                | list categories                       |
| POST   | `/api/categories`                                | create a category                     |
| PUT    | `/api/categories/:id`                            | rename a category                     |
| DELETE | `/api/categories/:id`                            | delete a category                     |
| GET    | `/api/categories/:id/bookmarks?sort=date\|title` | bookmarks of a category               |
| POST   | `/api/bookmarks`                                 | add a bookmark (`url`, `category_id`) |
| DELETE | `/api/bookmarks/:id`                             | delete a bookmark                     |

## About

Built as part of a Vue 3 course, which covered working with the API, Pinia and Vue Router. The file structure, code and markup differ from the instructor's version. The error notification system (`NotificationWindow.vue` and `notifications.store.ts`) and part of the styles are my own work.
