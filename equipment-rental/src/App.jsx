<<<<<<< HEAD
import { useState } from 'react';
import './App.css';

const initialEquipment = [
=======
import './App.css';

const equipment = [
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
  { id: 1, name: 'Перфоратор Makita HR2470', category: 'Электроинструмент', pricePerDay: 350 },
  { id: 2, name: 'Бетономешалка 160л', category: 'Строительное', pricePerDay: 800 },
  { id: 3, name: 'Лобзик Bosch PST 700', category: 'Электроинструмент', pricePerDay: 250 },
  { id: 4, name: 'Генератор Honda EU20i', category: 'Энергетика', pricePerDay: 1500 },
  { id: 5, name: 'Отбойный молоток Makita HM1213C', category: 'Электроинструмент', pricePerDay: 900 },
  { id: 6, name: 'Строительные леса 2м', category: 'Оснастка', pricePerDay: 200 },
];
<<<<<<< HEAD

const emptyForm = { name: '', category: '', pricePerDay: '' };

function App() {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [form, setForm] = useState(emptyForm);
  // Если editId !== null — форма редактирует существующую запись, иначе добавляет новую
  const [editId, setEditId] = useState(null);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const category = form.category.trim();
    const pricePerDay = Number(form.pricePerDay);

    if (!name || !category || !Number.isFinite(pricePerDay) || pricePerDay <= 0) {
      alert('Заполните название, категорию и укажите корректную цену за сутки (число больше 0).');
      return;
    }

    if (editId !== null) {
      // Обновляем существующую запись
      setEquipment((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, name, category, pricePerDay } : item
        )
      );
      setEditId(null);
    } else {
      // Добавляем новую запись
      const newId = equipment.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      setEquipment((prev) => [...prev, { id: newId, name, category, pricePerDay }]);
    }

    setForm(emptyForm);
  };

  const handleDelete = (id) => {
setEquipment((prev) => prev.filter((el) => el.id !== id));
if (editId === id) {
setForm(emptyForm);
setEditId(null);
  }
};  

  const handleEdit = (item) => {
    setForm({ name: item.name, category: item.category, pricePerDay: String(item.pricePerDay) });
    setEditId(item.id);
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditId(null);
  };
  return (
    <div className="app">
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Название</label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Например: Перфоратор Makita"
          />
=======

function App() {
  return (
    <div className="app">
      <form className="equipment-form">
        <div className="form-field">
          <label>Название</label>
          <input type="text" />
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
        </div>

        <div className="form-field">
          <label>Категория</label>
<<<<<<< HEAD
          <input
            type="text"
            value={form.category}
            onChange={handleChange('category')}
            placeholder="Например: Электроинструмент"
          />
=======
          <input type="text" />
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
        </div>

        <div className="form-field">
          <label>Цена за сутки</label>
<<<<<<< HEAD
           <input
            type="number"
            min="0"
            value={form.pricePerDay}
            onChange={handleChange('pricePerDay')}
            placeholder="Например: 350"
          />
        </div>

        <button type="submit" className="btn-add">
          {editId !== null ? 'Сохранить изменения' : 'Добавить Оборудование'}
        </button>

        {editId !== null && (
          <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
            Отмена
          </button>
        )}
      </form>

      <h1>Оборудование</h1>

=======
          <input type="text" />
        </div>

        <button type="button" className="btn-add">
          Добавить Оборудование
        </button>
      </form>

      <h1>Оборудование</h1>

>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена за сутки</th>
<<<<<<< HEAD
            <th>Действия</th>
=======
            <th>Удаление</th>
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.pricePerDay} ₽</td>
              <td>
<<<<<<< HEAD
                 <button type="button" className="btn-delete" onClick={() => handleDelete(item.id)}>
                  Удалить 
                </button>

                <button type="button" className="btn-edit" onClick={() => handleEdit(item)}>
=======
                <button type="button" className="btn-delete">
                  Удалить
                </button>
                <button type="button" className="btn-add">
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
                  Изменить
                </button>
              </td>
            </tr>
          ))}
<<<<<<< HEAD
          {equipment.length === 0 && (
            <tr>
              <td colSpan={5}>Список пуст — добавьте оборудование через форму выше.</td>
            </tr>
          )}
=======
>>>>>>> caa8b46a77c01facd418f904fea1bc292224daea
        </tbody>
      </table>
    </div>
  );
}

export default App;