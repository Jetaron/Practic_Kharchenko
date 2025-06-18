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
  }, []);

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
  }, [searchTerm, selectedGenre]);

  const handleShowDetails = (book) => setSelectedBookForModal(book);
  const handleCloseModal = () => setSelectedBookForModal(null);

  const filterOptionsForBooks = {
    searchPlaceholder: "Пошук книг за назвою або автором...",
    genres: genres,
    selectedGenre: selectedGenre,
    onGenreChange: setSelectedGenre,
  };

  return (
    <div className="tab-content books-tab">
      {/* <h2>Каталог Книг</h2>  <-- Можна прибрати, якщо заголовок вже є в Header або десь ще */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForBooks}
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