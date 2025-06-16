
import React from 'react';
import './BookDetailModal.css'; // Можемо використати ті ж стилі, що й для книжкової модалки

function EquipmentDetailModal({ item, onClose }) {
  if (!item || item.type !== 'equipment') {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{item.title}</h2>
        {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', marginBottom: '15px' }} />}
        <p><strong>Тип:</strong> {item.equipmentType}</p>
        <p><strong>Характеристики:</strong> {item.specs || "Не вказано"}</p>
        <p><strong>Опис:</strong> {item.description || "Опис відсутній."}</p>
        <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
          <strong>Статус:</strong> {item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}
        </p>
        <button onClick={onClose} className="modal-close-button">Закрити</button>
      </div>
    </div>
  );
}

export default EquipmentDetailModal;