// src/components/FilterBar.jsx

// Компонент для фільтрації та пошуку книг
function FilterBar({
  currentSearchTerm, // Поточний текст у полі пошуку
  onSearchChange,    // Функція, що викликається при зміні тексту пошуку

  currentGenre,      // Поточний вибраний жанр
  onGenreChange,     // Функція, що викликається при зміні жанру
  availableGenres    // Масив доступних жанрів для селектора
}) {

  // Обробник змін у полі пошуку
  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value); // Передаємо нове значення в App.jsx
  };

  // Обробник змін у селекторі жанрів
  const handleGenreSelectChange = (event) => {
    onGenreChange(event.target.value); // Передаємо нове значення в App.jsx
  };

  return (
    <div className="filter-bar">
      {/* Поле вводу для пошуку за назвою або автором */}
      <input
        type="text"
        placeholder="Пошук за назвою або автором..."
        value={currentSearchTerm}
        onChange={handleSearchInputChange}
        className="search-input"
      />

      {/* Селектор для фільтрації за жанром */}
      {availableGenres && availableGenres.length > 0 && ( // Показуємо селектор, тільки якщо є доступні жанри
        <select
          value={currentGenre}
          onChange={handleGenreSelectChange}
          className="genre-select"
        >
          <option value="">Всі жанри</option> {/* Опція для скидання фільтра за жанром */}
          {availableGenres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterBar;