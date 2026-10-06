// Представление данных в виде таблицы.
function EquipmentTable({ equipment, onEdit, onDelete }) {
  return (
    <table className="equipment-table">
      <thead>
        <tr>
          <th>Номер</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена за сутки</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.pricePerDay} ₽</td>
            <td className="table-actions">
              <button type="button" className="btn-edit" onClick={() => onEdit(item)}>
                Изменить
              </button>
              <button type="button" className="btn-delete" onClick={() => onDelete(item.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}

        {equipment.length === 0 && (
          <tr className="table-empty">
            <td colSpan={5}>Список пуст — добавьте оборудование через форму выше.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default EquipmentTable;
