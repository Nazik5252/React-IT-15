import { request, setToken } from './apiClient';

// Подсказка для страницы входа: тестовые пользователи, созданные в базе бэкенда.
export const demoAccounts = [
  { login: 'admin', password: 'password123' },
  { login: 'user1', password: 'password123' },
];

// Вход через бэкенд (POST /api/auth/login).
// Сохраняет JWT-токен и возвращает данные пользователя для state приложения.
// При неверном логине или пароле возвращает null, остальные ошибки пробрасывает дальше.
export async function authenticate(login, password) {
  let data;
  try {
    data = await request('/api/auth/login', {
      method: 'POST',
      body: { username: login.trim(), password },
    });
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      return null;
    }
    throw error;
  }

  setToken(data.token);

  const isAdmin = data.role === 'ROLE_ADMIN';

  return {
    login: data.username,
    name: data.username,
    role: isAdmin ? 'Администратор' : 'Клиент',
    isAdmin,
  };
}

// Выход: забываем токен.
export function logout() {
  setToken(null);
}
