// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import ItemList from './components/ItemList';
import FilterBar from './components/FilterBar';
import BookDetailModal from './components/BookDetailModal';
import { books as booksDataFromJs } from './data/booksData'; // Імпортуємо книги
import { equipment as equipmentDataFromJs } from './data/equipmentData'; // Імпортуємо техніку

// Додаємо поле 'type' до кожного елемента і об'єднуємо
const allLibraryItems = [
  ...booksDataFromJs.map(book => ({ ...book, type: 'book' })),
  ...equipmentDataFromJs.map(item => ({ ...item, type: 'equipment' })),
];

function App() {
  const [itemsToDisplay, setItemsToDisplay] = useState(allLibraryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'book', 'equipment'
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  const genres = useMemo(() => {
    const bookGenres = booksDataFromJs // Використовуємо тільки дані книг для жанрів
      .filter(book => book.genre)
      .map(book => book.genre);
    return [...new Set(bookGenres.flat())].sort();
  }, []); // Залежність від booksDataFromJs, якщо вона може змінюватися (але в нас статична)

  useEffect(() => {
    let filteredItems = allLibraryItems;

    // 1. Фільтрація за типом
    if (selectedType !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === selectedType);
    }

    // 2. Фільтрація за жанром (тільки для книг, якщо тип "book" або "all")
    if ((selectedType === 'book' || selectedType === 'all') && selectedGenre !== 'all') {
      filteredItems = filteredItems.filter(item => {
        if (item.type === 'book') {
          return item.genre === selectedGenre;
        }
        // Якщо обрано "all types" і жанр, то техніка не відфільтровується за жанром
        return selectedType === 'all' ? true : false; 
      });
    }

    // 3. Фільтрація за пошуковим запитом
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(lowercasedSearchTerm);
        if (item.type === 'book' && item.author) {
          const authorMatch = item.author.toLowerCase().includes(lowercasedSearchTerm);
          return titleMatch || authorMatch;
        }
        return titleMatch; // Для техніки шукаємо тільки за назвою
      });
    }

    setItemsToDisplay(filteredItems);
  }, [searchTerm, selectedType, selectedGenre]);


  const handleShowDetails = (item) => {
    if (item.type === 'book') {
      setSelectedItemForModal(item);
    } else {
      console.log("Деталі для техніки (поки без модалки):", item);
      // Тут можна буде відкривати іншу модалку для техніки
    }
  };

  const handleCloseModal = () => {
    setSelectedItemForModal(null);
  };

  return (
    <div className="App">
      <Header title="Моя Універсальна Бібліотека" tagline="Книги та техніка для кожного!" />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <ItemList items={itemsToDisplay} onShowDetails={handleShowDetails} />

      {selectedItemForModal && selectedItemForModal.type === 'book' && ( // Перевірка типу для модалки
        <BookDetailModal item={selectedItemForModal} onClose={handleCloseModal} />
      )}
      
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Всі права захищено.</p>
        <p>THEMOSTIMPORTANTFILE.txt все ще на місці! І тепер з окремими даними!</p>
      </footer>
    </div>
  );
}

export default App;