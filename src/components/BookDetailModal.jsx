// src/components/BookDetailModal.jsx
import React from 'react';
import './BookDetailModal.css'; // Використовуємо ті ж стилі

function BookDetailModal({ item, onClose }) {
  if (!item || item.type !== 'book') {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Кнопка-хрестик для закриття */}
        <button onClick={onClose} className="modal-close-button-x" aria-label="Закрити">
          × {/* Це HTML-символ для хрестика '×' */}
        </button>
        
        <h2>{item.title}</h2>
        {item.coverUrl && <img src={item.coverUrl} alt={item.title} />}
        <p><strong>Автор:</strong> {item.author}</p>
        <p><strong>Жанр:</strong> {item.genre}</p>
        <p><strong>Рік:</strong> {item.year}</p>
        <p><strong>Опис:</strong> {item.description || "Опис відсутній."}</p>
        {/* Стару кнопку "Закрити" видаляємо або не використовуємо */}
      </div>
    </div>
  );
}

export default BookDetailModal;