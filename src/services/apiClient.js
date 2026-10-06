// Базовый адрес API. По умолчанию запросы идут через прокси Vite (см. vite.config.js).
const API_URL = import.meta.env.VITE_API_URL ?? '';

// JWT-токен текущего пользователя.
let token = null;

export function setToken(value) {
  token = value;
}

// Универсальный запрос к бэкенду. Бросает Error с полями status и message.
export async function request(path, { method = 'GET', body } = {}) {
  const headers = {};

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const error = new Error('Не удалось подключиться к серверу. Проверьте, что бэкенд запущен.');
    error.status = 0;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  // Если бэкенд не запущен, прокси Vite отвечает пустым 5xx без тела в формате бэкенда.
  if (!response.ok && !data && response.status >= 500) {
    const error = new Error(
      'Сервер недоступен. Проверьте, что бэкенд (equipment-rental) и база данных запущены на порту 8080.'
    );
    error.status = 0;
    throw error;
  }

  if (!response.ok) {
    let message = data?.message || `Ошибка запроса (${response.status})`;

    // Ошибки валидации приходят в виде { errors: { поле: сообщение } }.
    if (data?.errors) {
      message = `${message}: ${Object.values(data.errors).join('; ')}`;
    }

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}
