import axios, { AxiosError } from 'axios';

export const AUTH_TOKEN_STORE_KEY = 'auth-token-store';

export const API_ROUTES = {
  profile: `profile`,
  categories: `categories`,
  bookmarks: (id: number) => `categories/${id}/bookmarks`,
  auth: {
    login: `auth/login`,
  },
};

export const http = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('HTTP ошибка:', error.message);
    return Promise.reject(error);
  },
);
