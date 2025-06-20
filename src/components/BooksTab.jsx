// src/components/BooksTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx'; // Переконайся, що імпорт та розширення правильні
import FilterBar from './FilterBar.jsx'; // Переконайся, що імпорт та розширення правильні
import BookDetailModal from './BookDetailModal.jsx'; // Переконайся, що імпорт та розширення правильні
// Файл booksData.js тепер не імпортується тут напряму, дані приходять через allItems

// Компонент приймає:
// allItems - повний список всіх елементів з App.jsx (книги, техніка, події)
// onToggleBookRental - функція з App.jsx для зміни статусу оренди книги
// currentUser - об'єкт поточного користувача (або null)
function BooksTab({ allItems, onToggleBookRental, currentUser }) {
  
  // Локальні стани для цієї вкладки (фільтрація та модальне вікно)
  const [displayedItems, setDisplayedItems] = useState([]); // Книги для відображення після фільтрації
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all'); // "all" - без фільтра за жанром
  const [selectedBookForModal, setSelectedBookForModal] = useState(null);

  // Фільтруємо тільки книги з загального списку allItems
  // useMemo, щоб не перераховувати на кожному рендері, якщо allItems не змінився
  const booksOnly = useMemo(() => {
    console.log('[BooksTab] Фільтруємо книги з allItems. Кількість allItems:', allItems.length);
    const filtered = allItems.filter(item => item.type === 'book');
    console.log('[BooksTab] Кількість книг після фільтрації за типом:', filtered.length);
    return filtered;
  }, [allItems]);

  // Отримуємо унікальні жанри для випадаючого списку з відфільтрованих книг
  const genres = useMemo(() => {
    const bookGenres = booksOnly // Використовуємо вже відфільтровані книги
      .filter(book => book.genre) 
      .map(book => String(book.genre));
    const uniqueGenres = [...new Set(bookGenres)].sort();
    console.log('[BooksTab] Сформовано список унікальних жанрів:', uniqueGenres);
    return uniqueGenres;
  }, [booksOnly]); // Залежність від booksOnly

  // Ефект для застосування фільтрів (пошук, жанр) до списку книг
  useEffect(() => {
    console.log('[BooksTab] useEffect для фільтрації спрацював. SearchTerm:', searchTerm, "SelectedGenre:", selectedGenre);
    let filteredResult = booksOnly; // Починаємо з усіх книг (вже відфільтрованих за типом)

    // 1. Фільтрація за обраним жанром
    if (selectedGenre !== 'all') {
      filteredResult = filteredResult.filter(book => book.genre === selectedGenre);
    }

    // 2. Фільтрація за пошуковим запитом (по назві або автору)
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredResult = filteredResult.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(lowercasedSearchTerm);
        // Переконуємося, що поле author існує перед тим, як звертатися до нього
        const authorMatch = book.author ? book.author.toLowerCase().includes(lowercasedSearchTerm) : false;
        return titleMatch || authorMatch;
      });
    }
    console.log('[BooksTab] Кількість книг для відображення після всіх фільтрів:', filteredResult.length);
    setDisplayedItems(filteredResult);
  }, [searchTerm, selectedGenre, booksOnly]); // Залежність від booksOnly важлива

  const handleShowDetails = (book) => {
    setSelectedBookForModal(book);
  };

  const handleCloseModal = () => {
    setSelectedBookForModal(null);
  };

  // Формуємо об'єкт опцій для FilterBar, специфічний для книг
  const filterOptionsForBooks = {
    searchPlaceholder: "Пошук книг за назвою або автором...",
    genres: genres, // Передаємо список доступних жанрів
    selectedGenre: selectedGenre,
    onGenreChange: setSelectedGenre, // Функція для зміни обраного жанру
    // Для цієї вкладки не потрібні фільтри типів або доступності, тому їх не передаємо
  };

  return (
    <div className="tab-content books-tab"> {/* Загальний клас для контенту вкладки */}
      <h2>Каталог Книг</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} // Функція для оновлення пошукового запиту
        filterOptions={filterOptionsForBooks} // Передаємо налаштування фільтрів
      />
      <ItemList
        items={displayedItems} // Передаємо відфільтровані книги
        onShowDetails={handleShowDetails} // Для відкриття модального вікна
        onToggleBookRental={onToggleBookRental} // Функція для оренди/повернення книги
      />
      {selectedBookForModal && (
        <BookDetailModal item={selectedBookForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default BooksTab;