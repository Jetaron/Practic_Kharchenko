// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; // Твої основні стилі
import Header from './components/Header.jsx';
import ItemList from './components/ItemList.jsx';
import FilterBar from './components/FilterBar.jsx';
import BookDetailModal from './components/BookDetailModal.jsx'; // Модальне вікно для деталей книги

// Імпортуємо наші дані
import { books as booksDataFromJs } from './data/booksData.js';
import { equipment as equipmentDataFromJs } from './data/equipmentData.js';
import { events as eventsDataFromJs } from './data/eventsData.js';

// Об'єднуємо всі дані в один масив і додаємо поле 'type' до кожного елемента
// Це робимо один раз при ініціалізації
const initialMasterList = [
  ...booksDataFromJs.map(item => ({ ...item, type: 'book' })),
  ...equipmentDataFromJs.map(item => ({ ...item, type: 'equipment' })),
  ...eventsDataFromJs.map(item => ({ ...item, type: 'event' })),
];

function App() {
  // Стан для основного списку всіх елементів (книги, техніка, події)
  // Зміни в цьому стані (наприклад, статус бронювання) будуть викликати перерендер
  const [masterList, setMasterList] = useState(initialMasterList);
  
  // Стан для елементів, які будуть відображатися після фільтрації та пошуку
  const [itemsToDisplay, setItemsToDisplay] = useState(masterList);
  
  // Стани для фільтрів
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'book', 'equipment', 'event'
  const [selectedGenre, setSelectedGenre] = useState('all'); // Тільки для книг

  // Стан для відображення модального вікна з деталями книги
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  // Отримуємо унікальні жанри для фільтра (тільки з даних про книги)
  // useMemo кешує результат, щоб не перераховувати на кожному рендері, якщо masterList не змінився
  const genres = useMemo(() => {
    console.log("Calculating genres..."); // Для відстеження, коли цей хук спрацьовує
    const bookGenres = masterList
      .filter(item => item.type === 'book' && item.genre) 
      .map(book => String(book.genre)); // Переконуємося, що жанр - це рядок
    return [...new Set(bookGenres)].sort();
  }, [masterList]); // Перераховуємо жанри, якщо masterList змінився (хоча в нас він змінюється тільки по статусах)

  // Ефект для фільтрації та пошуку елементів при зміні фільтрів або основного списку
  useEffect(() => {
    console.log("Filtering effect triggered. Search:", searchTerm, "Type:", selectedType, "Genre:", selectedGenre);
    let filteredItems = masterList;

    // 1. Фільтрація за обраним типом
    if (selectedType !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === selectedType);
    }

    // 2. Фільтрація за жанром (застосовується, якщо обрано "Книги" або "Всі типи", і обрано конкретний жанр)
    if (selectedGenre !== 'all' && (selectedType === 'book' || selectedType === 'all')) {
      filteredItems = filteredItems.filter(item => 
        // Фільтруємо за жанром тільки елементи типу "book"
        item.type === 'book' ? item.genre === selectedGenre : true
      );
    }

    // 3. Фільтрація за пошуковим запитом
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(lowercasedSearchTerm);
        // Для книг додатково шукаємо по автору
        if (item.type === 'book' && item.author) {
          const authorMatch = item.author.toLowerCase().includes(lowercasedSearchTerm);
          return titleMatch || authorMatch;
        }
        // Для техніки та подій шукаємо тільки за назвою
        return titleMatch; 
      });
    }

    setItemsToDisplay(filteredItems);
  }, [searchTerm, selectedType, selectedGenre, masterList]); // Залежимо від masterList, щоб оновлювати при зміні статусу бронювання


  // Функція для зміни статусу доступності техніки
  const handleToggleAvailability = (itemId) => {
    setMasterList(prevMasterList => 
      prevMasterList.map(item => 
        item.id === itemId && item.type === 'equipment'
          ? { ...item, availabilityStatus: item.availabilityStatus === 'available' ? 'rented' : 'available' }
          : item
      )
    );
  };

  // Функція для зміни статусу реєстрації на подію
  const handleToggleRegistration = (eventId) => {
    setMasterList(prevMasterList =>
      prevMasterList.map(item =>
        item.id === eventId && item.type === 'event'
          ? { ...item, isRegistered: !item.isRegistered }
          : item
      )
    );
  };

  // Функція для показу деталей елемента (поки що тільки для книг у модалці)
  const handleShowDetails = (item) => {
    if (item.type === 'book') {
      setSelectedItemForModal(item);
    } else if (item.type === 'equipment') {
      alert(`Техніка: ${item.title}\nТип: ${item.equipmentType}\nСтатус: ${item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}\nХарактеристики: ${item.specs || 'Не вказано'}`);
    } else if (item.type === 'event') {
      alert(`Подія: ${item.title}\nДата: ${item.date} (${item.time})\nМісце: ${item.location}\nОрганізатор: ${item.organizer}\nВи записані: ${item.isRegistered ? 'Так' : 'Ні'}`);
    }
  };

  // Функція для закриття модального вікна
  const handleCloseModal = () => {
    setSelectedItemForModal(null);
  };

  return (
    <div className="App">
      <Header title="Моя Універсальна Бібліотека" tagline="Книги, техніка, події та багато іншого!" />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm} // Передаємо функцію для оновлення searchTerm
        selectedType={selectedType}
        onTypeChange={setSelectedType} // Передаємо функцію для оновлення selectedType
        genres={genres} // Передаємо список унікальних жанрів
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre} // Передаємо функцію для оновлення selectedGenre
      />

      <ItemList 
        items={itemsToDisplay} 
        onShowDetails={handleShowDetails} 
        onToggleAvailability={handleToggleAvailability}
        onToggleRegistration={handleToggleRegistration}
      />

      {/* Модальне вікно для деталей книги */}
      {selectedItemForModal && selectedItemForModal.type === 'book' && (
        <BookDetailModal item={selectedItemForModal} onClose={handleCloseModal} />
      )}
      
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Всі права захищено.</p>
        <p>THEMOSTIMPORTANTFILE.txt заряджений на успіх та стабільність!</p>
      </footer>
    </div>
  );
}

export default App;