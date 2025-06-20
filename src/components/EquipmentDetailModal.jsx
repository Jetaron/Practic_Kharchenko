// src/components/EquipmentDetailModal.jsx
import React from 'react';
import './BookDetailModal.css'; // Використовуємо ті ж стилі, що й для книжкової модалки

function EquipmentDetailModal({ item, onClose }) {
  // Перевіряємо, чи є 'item' і чи це 'equipment'
  // Якщо ні, нічого не рендеримо (повертаємо null)
  if (!item || item.type !== 'equipment') {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}> {/* Фон, клік на який закриває модалку */}
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Сам контент модалки, клік тут не закриває */}
        
        {/* Кнопка-хрестик для закриття модального вікна */}
        <button 
          onClick={onClose} 
          className="modal-close-button-x"
          aria-label="Закрити вікно" // Важливо для доступності
        >
          × {/* HTML-символ для '×' */}
        </button>
        
        {/* Заголовок модального вікна - назва техніки */}
        <h2>{item.title || "Деталі техніки"}</h2>

        {/* Зображення техніки, якщо є */}
        {item.imageUrl && (
          <img 
            src={item.imageUrl} 
            alt={item.title || "Зображення техніки"} 
            className="modal-image-equipment" // Можна додати окремий клас для стилізації картинок техніки, якщо потрібно
                                             // або використовувати загальний .modal-content img з BookDetailModal.css
          />
        )}

        {/* Інформація про техніку */}
        <p><strong>Тип:</strong> {item.equipmentType || "Не вказано"}</p>
        <p><strong>Характеристики:</strong> {item.specs || "Не вказано"}</p>
        {item.description && <p><strong>Опис:</strong> {item.description}</p>} {/* Показуємо опис, тільки якщо він є */}
        
        <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
          <strong>Статус:</strong> {item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}
        </p>

        {/* Стару кнопку "Закрити" тут не використовуємо */}
      </div>
    </div>
  );
}

export default EquipmentDetailModal;