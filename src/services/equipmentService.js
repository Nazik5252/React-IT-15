import { request } from './apiClient';

// Преобразование ответа бэкенда (dailyRate, categoryName) в формат, который использует интерфейс.
function fromApi(item) {
  return {
    id: item.id,
    name: item.name,
    serialNumber: item.serialNumber,
    description: item.description ?? '',
    pricePerDay: Number(item.dailyRate),
    status: item.status,
    categoryId: item.categoryId,
    category: item.categoryName,
  };
}

// Преобразование данных формы в тело запроса бэкенда.
function toApi(item) {
  return {
    name: item.name,
    serialNumber: item.serialNumber,
    description: item.description,
    dailyRate: item.pricePerDay,
    categoryId: Number(item.categoryId),
  };
}

export async function getEquipment() {
  const data = await request('/api/equipment');
  return data.map(fromApi);
}

export async function createEquipment(item) {
  const data = await request('/api/equipment', { method: 'POST', body: toApi(item) });
  return fromApi(data);
}

export async function updateEquipment(id, item) {
  const data = await request(`/api/equipment/${id}`, { method: 'PUT', body: toApi(item) });
  return fromApi(data);
}

export function deleteEquipment(id) {
  return request(`/api/equipment/${id}`, { method: 'DELETE' });
}

export function getCategories() {
  return request('/api/categories');
}
