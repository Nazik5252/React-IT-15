// Форма добавления и редактирования оборудования.
function EquipmentForm({ form, editId, categories, isSaving, onChange, onSubmit, onCancel }) {
  const isEditing = editId !== null;

  return (
    <form className="equipment-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Название</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={onChange('name')}
          placeholder="Например: Перфоратор Makita"
        />
      </div>

      <div className="form-field">
        <label htmlFor="serialNumber">Серийный номер</label>
        <input
          id="serialNumber"
          type="text"
          value={form.serialNumber}
          onChange={onChange('serialNumber')}
          placeholder="SN-001-BOSCH"
        />
      </div>

      <div className="form-field">
        <label htmlFor="categoryId">Категория</label>
        <select id="categoryId" value={form.categoryId} onChange={onChange('categoryId')}>
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="pricePerDay">Цена за сутки</label>
        <input
          id="pricePerDay"
          type="number"
          min="0"
          value={form.pricePerDay}
          onChange={onChange('pricePerDay')}
          placeholder="Например: 350"
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Описание</label>
        <input
          id="description"
          type="text"
          value={form.description}
          onChange={onChange('description')}
          placeholder="Необязательно"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isEditing ? 'Сохранить изменения' : 'Добавить оборудование'}
        </button>

        {isEditing && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default EquipmentForm;
