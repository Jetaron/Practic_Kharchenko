// src/components/FilterBar.jsx
import React, { useState, useEffect } from 'react';
import './FilterBar.css'; // Створимо для стилів

// Компонент приймає:
// - allBooks: повний список книг (для генерації опцій фільтрів)
// - onFilterChange: функція, що викликається при зміні фільтрів
function FilterBar({ allBooks, onFilterChange }) {
  const [selectedGenre, setSelectedGenre] = useState(''); // 'selectedGenre' зберігає поточний обраний жанр
  const [selectedAuthor, setSelectedAuthor] = useState(''); // 'selectedAuthor' зберігає поточного обраного автора

  // Отримуємо унікальні жанри та авторів з усіх книг
  // Використовуємо Set для автоматичного видалення дублікатів
  const genres = [...new Set(allBooks.map(book => book.genre))].sort();
  const authors = [...new Set(allBooks.map(book => book.author))].sort();

  // Обробник зміни жанру
  const handleGenreChange = (event) => {
    const newGenre = event.target.value;
    setSelectedGenre(newGenre);
    // Викликаємо onFilterChange з новим жанром та поточним автором
    onFilterChange({ genre: newGenre, author: selectedAuthor });
  };

  // Обробник зміни автора
  const handleAuthorChange = (event) => {
    const newAuthor = event.target.value;
    setSelectedAuthor(newAuthor);
    // Викликаємо onFilterChange з поточним жанром та новим автором
    onFilterChange({ genre: selectedGenre, author: newAuthor });
  };
  
  // Функція для скидання всіх фільтрів
  const handleResetFilters = () => {
    setSelectedGenre('');
    setSelectedAuthor('');
    onFilterChange({ genre: '', author: '' }); // Повідомляємо App про скидання
  };


  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="genre-select">Фільтр за жанром:</label>
        <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Всі жанри</option> {/* Опція для скидання фільтру по жанру */}
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="author-select">Фільтр за автором:</label>
        <select id="author-select" value={selectedAuthor} onChange={handleAuthorChange}>
          <option value="">Всі автори</option> {/* Опція для скидання фільтру по автору */}
          {authors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>
      
      {/* Кнопка для скидання фільтрів */}
      {(selectedGenre || selectedAuthor) && ( // Показуємо кнопку тільки якщо хоча б один фільтр активний
        <button onClick={handleResetFilters} className="reset-filters-button">
          Скинути фільтри
        </button>
      )}
    </div>
  );
}

export default FilterBar;