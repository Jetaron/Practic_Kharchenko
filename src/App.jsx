// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/header.jsx';
import ItemList from './components/ItemList.jsx';
import FilterBar from './components/FilterBar.jsx';
//import BookDetailModal from './components/BookDetailModal';
import { books as booksDataFromJs } from './data/booksData.js';
import { equipment as equipmentDataFromJs } from './data/equipmentData.js';
import { events as eventsDataFromJs } from './data/eventsData.js'; // <-- ІМПОРТ ДАНИХ ПРО ПОДІЇ

// Об'єднуємо всі дані та додаємо поле 'type'
const initialMasterList = [
  ...booksDataFromJs.map(item => ({ ...item, type: 'book' })),
  ...equipmentDataFromJs.map(item => ({ ...item, type: 'equipment' })),
  ...eventsDataFromJs.map(item => ({ ...item, type: 'event' })), // <-- ДОДАЄМО ПОДІЇ
];

function App() {
  const [masterList, setMasterList] = useState(initialMasterList); // Основний список усіх елементів
  
  const [itemsToDisplay, setItemsToDisplay] = useState(masterList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'book', 'equipment', 'event'
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  const genres = useMemo(() => {
    // ... (код для genres залишається без змін, бо жанри тільки у книг)
    const bookGenres = masterList
      .filter(item => item.type === 'book' && item.genre)
      .map(book => book.genre);
    return [...new Set(bookGenres.map(g => String(g)))].sort();
  }, [masterList]);

  // Функція для зміни статусу доступності техніки
  const handleToggleAvailability = (itemId) => { // Тепер не потрібен itemType, бо ми знаємо ID
    setMasterList(prevMasterList => 
      prevMasterList.map(item => 
        item.id === itemId && item.type === 'equipment'
          ? { ...item, availabilityStatus: item.availabilityStatus === 'available' ? 'rented' : 'available' }
          : item
      )
    );
  };

  // НОВА ФУНКЦІЯ для зміни статусу реєстрації на подію
  const handleToggleRegistration = (eventId) => {
    setMasterList(prevMasterList =>
      prevMasterList.map(item =>
        item.id === eventId && item.type === 'event'
          ? { ...item, isRegistered: !item.isRegistered } // Змінюємо на протилежне
          : item
      )
    );
  };

  useEffect(() => {
    let filteredItems = masterList;

    // 1. Фільтрація за типом
    if (selectedType !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === selectedType);
    }

    // 2. Фільтрація за жанром (тільки для книг)
    if (selectedGenre !== 'all' && (selectedType === 'book' || selectedType === 'all')) {
      filteredItems = filteredItems.filter(item => 
        item.type === 'book' ? item.genre === selectedGenre : true
      );
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
        // Для техніки та подій шукаємо тільки за назвою (можна розширити)
        return titleMatch; 
      });
    }

    setItemsToDisplay(filteredItems);
  }, [searchTerm, selectedType, selectedGenre, masterList]);


  const handleShowDetails = (item) => {
    if (item.type === 'book') {
      setSelectedItemForModal(item);
    } else if (item.type === 'equipment') {
      alert(`Техніка: ${item.title}\nТип: ${item.equipmentType}\nСтатус: ${item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}`);
    } else if (item.type === 'event') {
      alert(`Подія: ${item.title}\nДата: ${item.date} (${item.time})\nМісце: ${item.location}\nОрганізатор: ${item.organizer}\nВи записані: ${item.isRegistered ? 'Так' : 'Ні'}`);
      // Тут можна буде зробити окрему модалку для подій
    }
  };

  const handleCloseModal = () => {
    setSelectedItemForModal(null);
  };

  return (
    <div className="App">
      <Header title="Моя Універсальна Бібліотека" tagline="Книги, техніка, події та багато іншого!" />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        genres={genres} 
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {/* Передаємо нову функцію onToggleRegistration в ItemList */}
      <ItemList 
        items={itemsToDisplay} 
        onShowDetails={handleShowDetails} 
        onToggleAvailability={handleToggleAvailability}
        onToggleRegistration={handleToggleRegistration} // <-- НОВА ФУНКЦІЯ
      />

      {selectedItemForModal && selectedItemForModal.type === 'book' && (
        <BookDetailModal item={selectedItemForModal} onClose={handleCloseModal} />
      )}
      
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Заходь ще!</p>
        <p>THEMOSTIMPORTANTFILE.txt благословляє цей реліз!</p>
      </footer>
    </div>
  );
}

export default App;