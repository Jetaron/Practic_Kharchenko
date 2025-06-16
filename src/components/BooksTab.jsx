// src/components/BooksTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import BookDetailModal from './BookDetailModal.jsx';
import { books as allBooksData } from '../data/booksData.js';

function BooksTab() {
  const [displayedBooks, setDisplayedBooks] = useState(allBooksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedBookForModal, setSelectedBookForModal] = useState(null);

  const genres = useMemo(() => {
    const bookGenres = allBooksData
      .filter(book => book.genre)
      .map(book => String(book.genre));
    return [...new Set(bookGenres)].sort();
  }, []); // allBooksData тут статичні

  useEffect(() => {
    let filteredBooksResult = allBooksData;

    if (selectedGenre !== 'all') {
      filteredBooksResult = filteredBooksResult.filter(book => book.genre === selectedGenre);
    }

    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredBooksResult = filteredBooksResult.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(lowercasedSearchTerm);
        const authorMatch = book.author ? book.author.toLowerCase().includes(lowercasedSearchTerm) : false;
        return titleMatch || authorMatch;
      });
    }
    setDisplayedBooks(filteredBooksResult);
  }, [searchTerm, selectedGenre]); // allBooksData тут не потрібен як залежність

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
    onGenreChange: setSelectedGenre,
    // Тут ми не передаємо showTypeFilter, types, selectedType, onTypeChange,
    // бо вони не потрібні для вкладки "Книги". FilterBar має це обробити.
  };

  // ДІАГНОСТИЧНИЙ ЛОГ: що саме BooksTab передає в FilterBar
  console.log('[BooksTab] Передаємо в FilterBar filterOptions:', filterOptionsForBooks);

  return (
    <div className="tab-content books-tab">
      <h2>Каталог Книг</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForBooks} // Передаємо правильно названий проп
      />
      <ItemList
        items={displayedBooks.map(book => ({ ...book, type: 'book' }))}
        onShowDetails={handleShowDetails}
      />
      {selectedBookForModal && (
        <BookDetailModal item={selectedBookForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default BooksTab;