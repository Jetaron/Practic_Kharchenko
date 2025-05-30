// src/App.jsx

import { useState, useEffect } from 'react';
import booksData from './data/booksData';
import BookList from './components/BookList';
import FilterBar from './components/FilterBar';
import BookDetailModal from './components/BookDetailModal'; // Імпортуємо наш новий компонент
import './App.css';

function App() {
  const [allBooks] = useState(booksData);
  const [displayedBooks, setDisplayedBooks] = useState(booksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Стан для вибраної книги (об'єкт книги)
  const [selectedBookForDetails, setSelectedBookForDetails] = useState(null);

  const availableGenres = [...new Set(allBooks.map(book => book.genre))].sort();

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleShowBookDetails = (bookObject) => {
    console.log("App.jsx: Показати деталі для книги:", bookObject.title);
    setSelectedBookForDetails(bookObject);
  };

  const handleCloseBookDetails = () => {
    console.log("App.jsx: Закрити деталі книги");
    setSelectedBookForDetails(null);
  };

  useEffect(() => {
    console.log("App.jsx: useEffect (фільтрація) спрацював. Залежності:", { searchTerm, selectedGenre });
    let booksResult = allBooks;
    if (searchTerm.trim()) {
      const lowercasedTerm = searchTerm.toLowerCase().trim();
      booksResult = booksResult.filter(book =>
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm)
      );
    }
    if (selectedGenre) {
      booksResult = booksResult.filter(book => book.genre === selectedGenre);
    }
    setDisplayedBooks(booksResult);
  }, [searchTerm, selectedGenre, allBooks]);

  useEffect(() => {
    if (selectedBookForDetails) {
      console.log("App.jsx: useEffect (скрол) - модалка відкрита, додаємо клас");
      document.body.classList.add('modal-open');
    } else {
      console.log("App.jsx: useEffect (скрол) - модалка закрита, видаляємо клас");
      document.body.classList.remove('modal-open');
    }
    return () => {
      // Ця функція очищення викликається, коли компонент розмонтовується,
      // або перед наступним викликом ефекту (якщо selectedBookForDetails зміниться).
      // Гарантує, що клас буде видалено, якщо App розмонтується з відкритою модалкою.
      console.log("App.jsx: useEffect (скрол) - очищення");
      document.body.classList.remove('modal-open');
    };
  }, [selectedBookForDetails]);


  return (
    <div className="app-container">
      <header>
        <h1>Електронний каталог бібліотеки</h1>
      </header>
      <main>
        <FilterBar
          currentSearchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          currentGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          availableGenres={availableGenres}
        />
        <BookList
          books={displayedBooks}
          onShowDetails={handleShowBookDetails}
        />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Фаховий передвищий коледж «ОПТІМА»</p>
      </footer>

      {selectedBookForDetails && (
        <BookDetailModal
          book={selectedBookForDetails}
          onClose={handleCloseBookDetails}
        />
      )}
    </div>
  );
}

export default App;