// src/components/FilterBar.jsx
import React from 'react';
import './FilterBar.css'; // Переконайся, що стилі підключені та існують

function FilterBar({ 
  searchTerm, 
  onSearchChange, 
  selectedType, 
  onTypeChange, 
  genres, // Масив унікальних жанрів
  selectedGenre, 
  onGenreChange 
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group search-group"> {/* Обгортка для поля пошуку */}
        <label htmlFor="search-input" className="sr-only">Пошук:</label> {/* sr-only для прихованої мітки */}
        <input
          id="search-input"
          type="text"
          placeholder="Пошук за назвою або автором..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input-filterbar"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="type-select">Тип елемента:</label>
        <select 
          id="type-select" 
          value={selectedType} 
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="all">Всі типи</option>
          <option value="book">Книги</option>
          <option value="equipment">Техніка</option>
          {/* Пізніше можна додати 'event' сюди */}
        </select>
      </div>
      
 <select 
          id="type-select" 
          value={selectedType} 
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="all">Всі типи</option>
          <option value="book">Книги</option>
          <option value="equipment">Техніка</option>
          <option value="event">Події</option> {/* <-- ДОДАНО */}
        </select>

      {/* Фільтр за жанром показується, якщо є жанри і обрано "Всі типи" або "Книги" */}
      {genres && genres.length > 0 && (selectedType === 'all' || selectedType === 'book') && (
        <div className="filter-group">
          <label htmlFor="genre-select">Жанр (для книг):</label>
          <select 
            id="genre-select" 
            value={selectedGenre} 
            onChange={(e) => onGenreChange(e.target.value)}
            // Можна деактивувати, якщо обрано не "Книги" і не "Всі типи"
            // disabled={selectedType !== 'all' && selectedType !== 'book'} 
          >
            <option value="all">Всі жанри</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterBar;