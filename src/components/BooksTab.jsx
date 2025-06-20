// src/components/BooksTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import BookDetailModal from './BookDetailModal.jsx';

// Компонент приймає:
// allItems - повний список всіх елементів з App.jsx (книги, техніка, події)
// onToggleBookRental - функція з App.jsx для зміни статусу оренди книги
// currentUser - об'єкт поточного користувача (або null)
function BooksTab({ allItems, onToggleBookRental, currentUser }) {
  
  // Локальні стани для цієї вкладки (фільтрація та модальне вікно)
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedBookForModal, setSelectedBookForModal] = useState(null);
  // Фільтруємо тільки книги з загального списку allItems
  // useMemo, щоб не перераховувати на кожному рендері, якщо allItems не змінився
  const booksOnly = useMemo(() => allItems.filter(item => item.type === 'book'), [allItems]);
  const genres = useMemo(() => { /* ... */ return [...new Set(booksOnly.filter(b=>b.genre).map(b => String(b.genre)))].sort(); }, [booksOnly]);

  useEffect(() => {
    let filteredResult = booksOnly;
    if (selectedGenre !== 'all') { /* ... */ }
    if (searchTerm.trim() !== '') { /* ... */ }
    setDisplayedItems(filteredResult);
  }, [searchTerm, selectedGenre, booksOnly]);

  const handleShowDetails = (book) => setSelectedBookForModal(book);
  const handleCloseModal = () => setSelectedBookForModal(null);
  const filterOptionsForBooks = { /* ... */ };

  return (
    <div className="tab-content books-tab">
      <h2>Каталог Книг</h2>
      <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} filterOptions={filterOptionsForBooks} />
      <ItemList
        items={displayedItems}
        onShowDetails={handleShowDetails}
        onToggleBookRental={onToggleBookRental}
        currentUser={currentUser} // <--- ПЕРЕДАЄМО currentUser
      />
      {selectedBookForModal && <BookDetailModal item={selectedBookForModal} onClose={handleCloseModal} />}
    </div>
  );
}
export default BooksTab;