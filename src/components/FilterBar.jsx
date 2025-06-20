// src/components/FilterBar.jsx
import React from 'react';
import './FilterBar.css'; // Переконайся, що цей файл існує та підключений

function FilterBar({
  searchTerm,
  onSearchChange, // Функція для оновлення searchTerm
  filterOptions   // Об'єкт з налаштуваннями для інших фільтрів
}) {
  // Діагностичний лог
  // console.log('[FilterBar] Отримано props: searchTerm=', searchTerm, 'filterOptions=', filterOptions);

  // Якщо filterOptions не передано, або це не об'єкт, можемо показати заглушку або нічого
  if (!filterOptions || typeof filterOptions !== 'object') {
    // console.error('[FilterBar] ПРОП filterOptions НЕ ВИЗНАЧЕНО або не є об\'єктом!');
    // Для простоти, якщо немає опцій, показуємо тільки поле пошуку (якщо є onSearchChange)
    if (onSearchChange) {
      return (
        <div className="filter-bar">
          <div className="filter-group search-group">
            <label htmlFor="search-input" className="sr-only">Пошук:</label>
            <input
              id="search-input"
              type="text"
              placeholder="Пошук..." // Загальний плейсхолдер
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input-filterbar"
            />
          </div>
        </div>
      );
    }
    return null; // Або повертаємо null, якщо і пошук не потрібен без опцій
  }

  return (
    <div className="filter-bar">
      {/* Поле пошуку */}
      <div className="filter-group search-group">
        <label htmlFor="search-input" className="sr-only">Пошук:</label>
        <input
          id="search-input"
          type="text"
          placeholder={filterOptions.searchPlaceholder || "Пошук..."}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input-filterbar"
        />
      </div>

      {/* Фільтр за типом (якщо є в опціях) */}
      {filterOptions.showTypeFilter === true && Array.isArray(filterOptions.types) && filterOptions.onTypeChange && (
        <div className="filter-group">
          <label htmlFor="type-select">Тип:</label>
          <select
            id="type-select"
            value={filterOptions.selectedType || 'all'}
            onChange={(e) => filterOptions.onTypeChange(e.target.value)}
          >
            <option value="all">Всі типи</option>
            {filterOptions.types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Фільтр за жанром (якщо є в опціях) */}
      {Array.isArray(filterOptions.genres) && filterOptions.genres.length > 0 && filterOptions.onGenreChange && (
        <div className="filter-group">
          <label htmlFor="genre-select">Жанр:</label>
          <select
            id="genre-select"
            value={filterOptions.selectedGenre || 'all'}
            onChange={(e) => filterOptions.onGenreChange(e.target.value)}
          >
            <option value="all">Всі жанри</option>
            {filterOptions.genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      )}

      {/* Фільтр за доступністю (якщо є в опціях) */}
      {Array.isArray(filterOptions.availabilityOptions) && filterOptions.onAvailabilityChange && (
        <div className="filter-group">
          <label htmlFor="availability-select">Доступність:</label>
          <select
            id="availability-select"
            value={filterOptions.selectedAvailability || 'all'}
            onChange={(e) => filterOptions.onAvailabilityChange(e.target.value)}
          >
            <option value="all">Всі</option>
            {filterOptions.availabilityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterBar;