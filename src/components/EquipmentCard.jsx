// Компонент карточки оборудования (представление в виде набора карточек).
function EquipmentCard({ item, onEdit, onDelete }) {
  return (
    <article className="equipment-card">
      <header className="equipment-card__header">
        <span className="equipment-card__id">#{item.id}</span>
        <span className="equipment-card__category">{item.category}</span>
      </header>

      <h3 className="equipment-card__title">{item.name}</h3>

      <p className="equipment-card__price">
        {item.pricePerDay} ₽ <span>/ сутки</span>
      </p>

      <div className="equipment-card__actions">
        <button type="button" className="btn-edit" onClick={() => onEdit(item)}>
          Изменить
        </button>
        <button type="button" className="btn-delete" onClick={() => onDelete(item.id)}>
          Удалить
        </button>
      </div>
    </article>
  );
}

export default EquipmentCard;
