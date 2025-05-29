// src/App.jsx

import { useState, useEffect } from 'react'; // Додали useEffect
import booksData from './data/booksData';
import BookList from './components/BookList';
import BookDetailModal from './components/BookDetailModal';
import FilterBar from './components/FilterBar'; // Імпортуємо FilterBar
import './App.css';

function App() {
  // `allBooks` - це наш повний, незмінний список книг з booksData
  const [allBooks] = useState(booksData); 
  // `displayedBooks` - це книги, які будуть відображені (після фільтрації)
  const [displayedBooks, setDisplayedBooks] = useState(allBooks);
  
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Стан для поточних активних фільтрів
  const [activeFilters, setActiveFilters] = useState({
    genre: '', // Порожній рядок означає "Всі жанри"
    author: '' // Порожній рядок означає "Всі автори"
  });

  // Функція для обробки змін фільтрів з FilterBar
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  // Використовуємо useEffect для застосування фільтрів, коли змінюється 
  // allBooks (не зміниться в нашому випадку, але це хороша практика) або activeFilters
  useEffect(() => {
    let filtered = [...allBooks]; // Починаємо з повного списку

    // Фільтруємо за жанром, якщо він обраний
    if (activeFilters.genre) {
      filtered = filtered.filter(book => book.genre === activeFilters.genre);
    }

    // Фільтруємо за автором, якщо він обраний
    if (activeFilters.author) {
      filtered = filtered.filter(book => book.author === activeFilters.author);
    }

    setDisplayedBooks(filtered); // Оновлюємо список відображуваних книг
  }, [allBooks, activeFilters]); // Залежності useEffect

  const handleShowDetails = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Електронний каталог бібліотеки</h1>
      </header>

      <main>
        {/* 
          Передаємо повний список книг для генерації опцій фільтрів 
          та функцію для обробки змін фільтрів.
        */}
        <FilterBar allBooks={allBooks} onFilterChange={handleFilterChange} />
        
        {/* Тепер BookList отримує `displayedBooks` (відфільтрований список) */}
        <BookList books={displayedBooks} onShowDetails={handleShowDetails} />
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Фаховий передвищий коледж «ОПТІМА». Розробив Харченко Я.Я.</p>
      </footer>

      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;