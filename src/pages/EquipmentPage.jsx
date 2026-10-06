import { useEffect, useState } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import EquipmentForm from '../components/EquipmentForm';
import EquipmentTable from '../components/EquipmentTable';
import {
  createEquipment,
  deleteEquipment,
  getCategories,
  getEquipment,
  updateEquipment,
} from '../services/equipmentService';

const emptyForm = {
  name: '',
  serialNumber: '',
  categoryId: '',
  pricePerDay: '',
  description: '',
};

// Страница просмотра оборудования: два представления (таблица и карточки).
// Данные загружаются с бэкенда; изменять данные может только администратор.
function EquipmentPage({ user, onLogout }) {
  const [equipment, setEquipment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [view, setView] = useState('table');
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let isActive = true;

    Promise.all([getEquipment(), getCategories()])
      .then(([equipmentData, categoriesData]) => {
        if (isActive) {
          setEquipment(equipmentData);
          setCategories(categoriesData);
        }
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }
        // Токен истёк или недействителен — возвращаем на страницу входа.
        if (error.status === 401) {
          onLogout();
          return;
        }
        setLoadError(error.message);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [onLogout]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.isAdmin) {
      alert('Добавлять и изменять оборудование может только администратор.');
      return;
    }

    const item = {
      name: form.name.trim(),
      serialNumber: form.serialNumber.trim(),
      description: form.description.trim(),
      categoryId: form.categoryId,
      pricePerDay: Number(form.pricePerDay),
    };

    if (
      !item.name ||
      !item.serialNumber ||
      !item.categoryId ||
      !Number.isFinite(item.pricePerDay) ||
      item.pricePerDay <= 0
    ) {
      alert(
        'Заполните название, серийный номер, выберите категорию и укажите корректную цену за сутки (число больше 0).'
      );
      return;
    }

    setIsSaving(true);
    try {
      if (editId !== null) {
        const updated = await updateEquipment(editId, item);
        setEquipment((prev) => prev.map((current) => (current.id === editId ? updated : current)));
        setEditId(null);
      } else {
        const created = await createEquipment(item);
        setEquipment((prev) => [...prev, created]);
      }
      setForm(emptyForm);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      serialNumber: item.serialNumber,
      categoryId: String(item.categoryId),
      pricePerDay: String(item.pricePerDay),
      description: item.description,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!user.isAdmin) {
      alert('Удалять оборудование может только администратор.');
      return;
    }

    try {
      await deleteEquipment(id);
      setEquipment((prev) => prev.filter((item) => item.id !== id));

      if (editId === id) {
        setForm(emptyForm);
        setEditId(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  return (
    <div className="equipment-page">
      <header className="app-header">
        <div>
          <h1>Прокат оборудования</h1>
          <p className="app-user">
            Вы вошли как <strong>{user.name}</strong>
            {user.role ? ` (${user.role})` : ''}
          </p>
        </div>

        <button type="button" className="btn-logout" onClick={onLogout}>
          Выйти
        </button>
      </header>

      <EquipmentForm
        form={form}
        editId={editId}
        categories={categories}
        isSaving={isSaving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      <div className="view-switcher">
        <span>Вид отображения:</span>
        <button
          type="button"
          className={view === 'table' ? 'view-btn view-btn--active' : 'view-btn'}
          onClick={() => setView('table')}
        >
          Таблица
        </button>
        <button
          type="button"
          className={view === 'cards' ? 'view-btn view-btn--active' : 'view-btn'}
          onClick={() => setView('cards')}
        >
          Карточки
        </button>
      </div>

      {isLoading ? (
        <p className="loading">Загрузка данных…</p>
      ) : loadError ? (
        <p className="login-error" role="alert">
          {loadError}
        </p>
      ) : equipment.length === 0 ? (
        <p className="empty-state">Список пуст — добавьте оборудование через форму выше.</p>
      ) : view === 'table' ? (
        <EquipmentTable equipment={equipment} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <div className="equipment-cards">
          {equipment.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EquipmentPage;
