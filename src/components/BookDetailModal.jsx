import React from 'react';
import './BookDetailModal.css'; // Стилі для модального вікна (створимо їх далі)

function BookDetailModal({ book, onClose }) {
  // Якщо немає вибраної книги, не рендеримо нічого (або можна повернути null)
  if (!book) {
    return null;
  }

  // Зупиняємо спливання події кліку, щоб клік всередині модалки не закривав її,
  // якщо ми реалізуємо закриття по кліку на оверлей.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Клік на оверлей закриває модалку */}
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-button" onClick={onClose}>
          × {/* Символ "хрестик" для закриття */}
        </button>
        <h2>{book.title}</h2>
        <div className="modal-body">
          <img
            src={book.coverImageUrl || 'https://via.placeholder.com/150x220.png?text=No+Cover'}
            alt={`Обкладинка ${book.title}`}
            className="modal-book-cover"
          />
          <div className="modal-book-info">
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Жанр:</strong> {book.genre}</p>
            <p><strong>Рік видання:</strong> {book.year}</p>
            <p><strong>Опис:</strong></p>
            <p className="modal-book-description">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailModal;