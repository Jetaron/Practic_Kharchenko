// src/components/BookDetailModal.jsx

import React from 'react';
import './BookDetailModal.css'; // Створимо цей файл для стилів модального вікна

function BookDetailModal({ book, onClose }) {
  if (!book) {
    return null; 
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-cover-container">
            <img 
              src={book.coverImageUrl || 'https://via.placeholder.com/200x300.png?text=No+Cover'} 
              alt={`Обкладинка ${book.title}`} 
              className="modal-book-cover"
            />
          </div>
          <div className="modal-info-container">
            <h2>{book.title}</h2>
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Жанр:</strong> {book.genre}</p>
            <p><strong>Рік видання:</strong> {book.year}</p>
            <p><strong>Опис:</strong></p>
            <p className="book-description">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailModal;