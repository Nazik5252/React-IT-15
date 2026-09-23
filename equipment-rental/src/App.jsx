import { useState } from 'react'
import './App.css'

function App() {
  // Захардкоженный список оборудования (аренда)
  const [equipment] = useState([
    {
      id: 1,
      name: 'Перфоратор Makita HR2470',
      category: 'Электроинструмент',
      price: '450 ₽/сутки',
      tenant: 'Иванов И.И.',
    },
    {
      id: 2,
      name: 'Бетономешалка 140 л',
      category: 'Строительное',
      price: '700 ₽/сутки',
      tenant: 'Петров П.П.',
    },
    {
      id: 3,
      name: 'Дрель Bosch GSB 13 RE',
      category: 'Электроинструмент',
      price: '300 ₽/сутки',
      tenant: 'Сидоров А.А.',
    },
  ])

  return (
    <>
      <section id="center">
        <h1>Система учёта аренды оборудования</h1>

        {/* Форма добавления — только отображение, поля неактивны */}
        <form className="add-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <label>
              Название
              <input type="text" placeholder="Например: Дрель Bosch" disabled />
            </label>

            <label>
              Категория
              <input type="text" placeholder="Электроинструмент" disabled />
            </label>

            <label>
              Цена (₽/сутки)
              <input type="text" placeholder="500 ₽/сутки" disabled />
            </label>

            <label>
              Арендатор
              <input type="text" placeholder="ФИО арендатора" disabled />
            </label>
          </div>

          {/* Кнопка просто отображается */}
          <button type="button" className="add-btn" disabled>
            Добавить оборудование
          </button>
        </form>
      </section>

      <div className="ticks"></div>

      {/* Таблица оборудования — только отображение */}
      <section id="next-steps">
        <h2>Оборудование в аренде</h2>

        <table className="equipment-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Арендатор</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.tenant}</td>
                <td>
                  {/* Кнопка просто отображается */}
                  <button type="button" className="delete-btn" disabled>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App