import './App.css';

const equipment = [
  { id: 1, name: 'Перфоратор Makita HR2470', category: 'Электроинструмент', pricePerDay: 350 },
  { id: 2, name: 'Бетономешалка 160л', category: 'Строительное', pricePerDay: 800 },
  { id: 3, name: 'Лобзик Bosch PST 700', category: 'Электроинструмент', pricePerDay: 250 },
  { id: 4, name: 'Генератор Honda EU20i', category: 'Энергетика', pricePerDay: 1500 },
  { id: 5, name: 'Отбойный молоток Makita HM1213C', category: 'Электроинструмент', pricePerDay: 900 },
  { id: 6, name: 'Строительные леса 2м', category: 'Оснастка', pricePerDay: 200 },
];

function App() {
  return (
    <div className="app">
      <form className="equipment-form">
        <div className="form-field">
          <label>Название</label>
          <input type="text" />
        </div>

        <div className="form-field">
          <label>Категория</label>
          <input type="text" />
        </div>

        <div className="form-field">
          <label>Цена за сутки</label>
          <input type="text" />
        </div>

        <button type="button" className="btn-add">
          Добавить Оборудование
        </button>
      </form>

      <h1>Оборудование</h1>

      <table className="equipment-table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена за сутки</th>
            <th>Удаление</th>
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
                <button type="button" className="btn-delete">
                  Удалить
                </button>
                <button type="button" className="btn-add">
                  Изменить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;