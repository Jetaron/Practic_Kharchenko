// src/components/EventDetailModal.jsx
import React from 'react';
import './BookDetailModal.css'; // Використовуємо ті ж стилі, що й для книжкової та технічної модалки

function EventDetailModal({ item, onClose }) {
  // Перевіряємо, чи є 'item' і чи це 'event'
  if (!item || item.type !== 'event') {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}> {/* Фон, клік на який закриває модалку */}
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Сам контент модалки */}
        
        {/* Кнопка-хрестик для закриття модального вікна */}
        <button 
          onClick={onClose} 
          className="modal-close-button-x"
          aria-label="Закрити вікно" // Важливо для доступності
        >
          × {/* HTML-символ для '×' */}
        </button>
        
        {/* Заголовок модального вікна - назва події */}
        <h2>{item.title || "Деталі події"}</h2>

        {/* Зображення події, якщо є */}
        {item.imageUrl && (
          <img 
            src={item.imageUrl} 
            alt={item.title || "Зображення події"} 
            className="modal-image-event" // Можна додати окремий клас для стилізації картинок подій
                                          // або використовувати загальний .modal-content img з BookDetailModal.css
          />
        )}

        {/* Інформація про подію */}
        {item.date && <p><strong>Дата:</strong> {item.date} {item.time && `(${item.time})`}</p>}
        {item.location && <p><strong>Місце:</strong> {item.location}</p>}
        {item.organizer && <p><strong>Організатор:</strong> {item.organizer}</p>}
        {item.description && <p><strong>Опис:</strong> {item.description}</p>}
        
        <p>
          <strong>Статус реєстрації:</strong> 
          <span className={item.isRegistered ? 'status-registered-modal' : 'status-not-registered-modal'}>
            {item.isRegistered ? ' Ви записані' : ' Ви не записані'}
          </span>
          {!item.isRegistered && " (можна записатися на картці події)"}
        </p>
        
        {/* Стару кнопку "Закрити" тут не використовуємо */}
      </div>
    </div>
  );
}

export default EventDetailModal;