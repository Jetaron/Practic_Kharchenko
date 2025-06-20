// src/components/BooksTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import BookDetailModal from './BookDetailModal.jsx';

function BooksTab({ allItems, onToggleBookRental, currentUser }) { 
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedBookForModal, setSelectedBookForModal] = useState(null);

  const booksOnly = useMemo(() => 
    allItems.filter(item => item.type === 'book'), 
  [allItems]);

  const genres = useMemo(() => {
    const bookGenres = booksOnly
      .filter(book => book.genre)
      .map(book => String(book.genre));
    return [...new Set(bookGenres)].sort();
  }, [booksOnly]);

  useEffect(() => {
    let filteredResult = booksOnly;
    if (selectedGenre !== 'all') {
      filteredResult = filteredResult.filter(book => book.genre === selectedGenre);
    }
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredResult = filteredResult.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(lowercasedSearchTerm);
        const authorMatch = book.author ? book.author.toLowerCase().includes(lowercasedSearchTerm) : false;
        return titleMatch || authorMatch;
      });
    }
    setDisplayedItems(filteredResult);
  }, [searchTerm, selectedGenre, booksOnly]);

  const handleShowDetails = (book) => setSelectedBookForModal(book);
  const handleCloseModal = () => setSelectedBookForModal(null);

  // Опції фільтрів для книг
  const filterOptionsForBooks = {
    searchPlaceholder: "Пошук книг за назвою або автором...",
    genres: genres, // Масив жанрів
    selectedGenre: selectedGenre, // Поточний обраний жанр
    onGenreChange: setSelectedGenre, // Функція для зміни жанру
    // Тут немає filterOptions.onTypeChange, бо ця вкладка тільки для книг
  };

  return (
    <div className="tab-content books-tab">
      <h2>Каталог Книг</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} // Функція для зміни пошукового запиту
        filterOptions={filterOptionsForBooks} // Передаємо об'єкт з опціями
      />
      <ItemList
        items={displayedItems} 
        onShowDetails={handleShowDetails}
        onToggleBookRental={onToggleBookRental} 
      />
      {selectedBookForModal && (
        <BookDetailModal item={selectedBookForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default BooksTab;