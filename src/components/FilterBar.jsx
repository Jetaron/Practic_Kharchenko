
import React from 'react';
import './FilterBar.css'; // Переконайся, що цей файл існує та підключений

function FilterBar({
  searchTerm,
  onSearchChange,
  filterOptions // Очікуємо об'єкт з налаштуваннями
}) {
  // ДІАГНОСТИЧНИЙ ЛОГ: що саме отримує FilterBar як filterOptions
  console.log('[FilterBar] Отримано проп filterOptions:', filterOptions);

  // Якщо filterOptions не передано, або це не об'єкт, показуємо заглушку або нічого, щоб уникнути помилок
  if (!filterOptions || typeof filterOptions !== 'object') {
    console.error('[FilterBar] ПРОП filterOptions НЕ ВИЗНАЧЕНО або не є об\'єктом! Повертаємо null.');
    // Можна повернути якусь заглушку, якщо хочеш:
    // return <div className="filter-bar-error">Помилка завантаження опцій фільтрації.</div>;
    return null; // Або просто нічого не рендеримо
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

      {/* Фільтр за типом (показуємо, якщо є опції для нього) */}
      {filterOptions.showTypeFilter === true && Array.isArray(filterOptions.types) && (
        <div className="filter-group">
          <label htmlFor="type-select">Тип:</label>
          <select
            id="type-select"
            value={filterOptions.selectedType || 'all'} // Значення за замовчуванням, якщо не передано
            onChange={(e) => filterOptions.onTypeChange && filterOptions.onTypeChange(e.target.value)}
          >
            <option value="all">Всі типи</option>
            {filterOptions.types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Фільтр за жанром (показуємо, якщо є опції для нього) */}
      {Array.isArray(filterOptions.genres) && filterOptions.genres.length > 0 && (
        <div className="filter-group">
          <label htmlFor="genre-select">Жанр:</label>
          <select
            id="genre-select"
            value={filterOptions.selectedGenre || 'all'} // Значення за замовчуванням
            onChange={(e) => filterOptions.onGenreChange && filterOptions.onGenreChange(e.target.value)}
          >
            <option value="all">Всі жанри</option>
            {filterOptions.genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      )}

      {/* Фільтр за доступністю (показуємо, якщо є опції для нього) */}
      {Array.isArray(filterOptions.availabilityOptions) && (
        <div className="filter-group">
          <label htmlFor="availability-select">Доступність:</label>
          <select
            id="availability-select"
            value={filterOptions.selectedAvailability || 'all'} // Значення за замовчуванням
            onChange={(e) => filterOptions.onAvailabilityChange && filterOptions.onAvailabilityChange(e.target.value)}
          >
            <option value="all">Всі</option>
            {filterOptions.availabilityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
      {/* Тут можна додати інші фільтри, якщо вони будуть в filterOptions */}
    </div>
  );
}

export default FilterBar;