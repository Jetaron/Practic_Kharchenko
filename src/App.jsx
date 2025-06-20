// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import BooksTab from './components/BooksTab.jsx';
import EquipmentTab from './components/EquipmentTab.jsx';
import EventsTab from './components/EventsTab.jsx';
import UserProfileTab from './components/UserProfileTab.jsx';
import AuthPage from './components/AuthPage.jsx';

import { books as booksDataFromJs } from './data/booksData.js';
import { equipment as equipmentDataFromJs } from './data/equipmentData.js';
import { events as eventsDataFromJs } from './data/eventsData.js';

// Функція для підготовки початкового списку всіх елементів
const prepareInitialMasterList = () => [
  ...booksDataFromJs.map(item => ({ ...item, type: 'book', isRentedByUser: null })), // Змінено на null
  ...equipmentDataFromJs.map(item => ({ ...item, type: 'equipment', rentedByUserId: null, availabilityStatus: item.availabilityStatus || 'available' })), // Додаємо rentedByUserId
  ...eventsDataFromJs.map(item => ({ ...item, type: 'event', registeredUserIds: item.registeredUserIds || [] })), // Масив ID користувачів
];

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [currentUser, setCurrentUser] = useState(null); // null або { id: '...', username: '...' }
  
  const [masterList, setMasterList] = useState(() => {
    try {
      const savedList = localStorage.getItem('libraryMasterList');
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        // Переконуємося, що всі елементи мають потрібні поля після завантаження з localStorage
        return parsedList.map(item => {
          if (item.type === 'book' && typeof item.isRentedByUser === 'undefined') item.isRentedByUser = null;
          if (item.type === 'equipment' && typeof item.rentedByUserId === 'undefined') item.rentedByUserId = null;
          if (item.type === 'event' && typeof item.registeredUserIds === 'undefined') item.registeredUserIds = [];
          return item;
        });
      }
      return prepareInitialMasterList();
    } catch (error) {
      console.error("Помилка masterList з localStorage:", error);
      return prepareInitialMasterList();
    }
  });

  useEffect(() => { /* Збереження masterList в localStorage */
    try { localStorage.setItem('libraryMasterList', JSON.stringify(masterList)); } 
    catch (error) { console.error("Помилка збереження masterList:", error); }
  }, [masterList]);

  useEffect(() => { /* Завантаження currentUser з localStorage */
    try { const savedUser = localStorage.getItem('libraryCurrentUser'); if (savedUser) setCurrentUser(JSON.parse(savedUser)); } 
    catch (error) { console.error("Помилка currentUser з localStorage:", error); }
  }, []);

  useEffect(() => { /* Збереження currentUser в localStorage */
    try { if (currentUser) localStorage.setItem('libraryCurrentUser', JSON.stringify(currentUser)); else localStorage.removeItem('libraryCurrentUser'); } 
    catch (error) { console.error("Помилка збереження currentUser:", error); }
  }, [currentUser]);

  const handleTabChange = (tabKey) => setActiveTab(tabKey);

  // Тепер ця функція викликається з AuthPage з об'єктом користувача
  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData); // userData вже має бути { id: '...', username: '...' }
    setActiveTab('profile');
    console.log(`[App.jsx] Користувач ${userData.username} успішно увійшов/зареєструвався.`);
  };

  const handleLogout = () => {
    console.log(`[App.jsx] ${currentUser?.username || 'Гість'} вийшов.`);
    setCurrentUser(null);
    // Важливо: При виході ми НЕ скидаємо masterList, бо бронювання інших користувачів мають залишитися.
    // Якщо ти хочеш, щоб бронювання поточного користувача "знімалися" при виході, це треба реалізувати окремо.
    setActiveTab('books');
  };

  const navigateToAuth = () => setActiveTab('auth');

  // Оновлені функції для зміни стану елементів з прив'язкою до currentUser.id
  const handleToggleBookRental = (bookId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList => 
      prevList.map(item => {
        if (item.id === bookId && item.type === 'book') {
          // Якщо книга вже орендована цим користувачем, він її повертає
          // Якщо книга вільна, він її бере
          // Якщо книга орендована іншим, він не може її взяти (це треба було б перевіряти, якби rentedByUserId було не тільки для поточного)
          // Для простої імітації: якщо isRentedByUser === currentUser.id -> знімаємо, якщо null -> ставимо currentUser.id
          return { ...item, isRentedByUser: item.isRentedByUser === currentUser.id ? null : currentUser.id };
        }
        return item;
      })
    );
  };

  const handleToggleEquipmentAvailability = (equipmentId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList => 
      prevList.map(item => {
        if (item.id === equipmentId && item.type === 'equipment') {
          if (item.availabilityStatus === 'available') { // Якщо вільна, бронюємо
            return { ...item, availabilityStatus: 'rented', rentedByUserId: currentUser.id };
          } else if (item.rentedByUserId === currentUser.id) { // Якщо орендована цим користувачем, повертаємо
            return { ...item, availabilityStatus: 'available', rentedByUserId: null };
          }
          // Якщо орендована іншим, нічого не робимо (або показуємо повідомлення)
          alert("Ця техніка вже заброньована іншим користувачем.");
        }
        return item;
      })
    );
  };

  const handleToggleEventRegistration = (eventId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList =>
      prevList.map(item => {
        if (item.id === eventId && item.type === 'event') {
          const userIndex = item.registeredUserIds.indexOf(currentUser.id);
          let newRegisteredUserIds = [...item.registeredUserIds];
          if (userIndex > -1) { // Якщо вже записаний, видаляємо
            newRegisteredUserIds.splice(userIndex, 1);
          } else { // Якщо не записаний, додаємо
            newRegisteredUserIds.push(currentUser.id);
          }
          return { ...item, registeredUserIds: newRegisteredUserIds, isRegistered: newRegisteredUserIds.includes(currentUser.id) /* Оновлюємо isRegistered для поточного юзера */ };
        }
        return item;
      })
    );
  };

  const renderActiveTabContent = () => { /* ... (код як був, але тепер UserProfileTab отримує дані на основі currentUser.id) ... */ 
    if (activeTab === 'auth') {
      return <AuthPage onAuthSuccess={handleAuthSuccess} onGoBack={() => setActiveTab('books')} />;
    }
    if (activeTab === 'profile') {
      if (!currentUser) return <AuthPage onAuthSuccess={handleAuthSuccess} onGoBack={() => setActiveTab('books')} />;
      return (
        <UserProfileTab 
          currentUser={currentUser}
          rentedBooks={masterList.filter(item => item.type === 'book' && item.isRentedByUser === currentUser.id)}
          rentedEquipment={masterList.filter(item => item.type === 'equipment' && item.rentedByUserId === currentUser.id)}
          registeredEvents={masterList.filter(item => item.type === 'event' && item.registeredUserIds.includes(currentUser.id))}
          onToggleBookRental={handleToggleBookRental}
          onToggleEquipmentAvailability={handleToggleEquipmentAvailability}
          onToggleEventRegistration={handleToggleEventRegistration}
        />
      );
    }
    // Передаємо currentUser у вкладки, щоб вони могли передати його в ItemCard для умовного рендерингу кнопок
    switch (activeTab) {
      case 'books': return <BooksTab allItems={masterList} onToggleBookRental={handleToggleBookRental} currentUser={currentUser} />;
      case 'equipment': return <EquipmentTab allItems={masterList} onToggleEquipmentAvailability={handleToggleEquipmentAvailability} currentUser={currentUser} />;
      case 'events': return <EventsTab allItems={masterList} onToggleEventRegistration={handleToggleEventRegistration} currentUser={currentUser} />;
      default: return <BooksTab allItems={masterList} onToggleBookRental={handleToggleBookRental} currentUser={currentUser} />;
    }
  };

  return ( /* ... (JSX для App як був, з Header, main, Footer) ... */ 
    <div className="App">
      <Header 
        title="Моя Універсальна Бібліотека" 
        tagline="Книги, техніка, події та багато іншого!"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentUser={currentUser}
        onAuthClick={navigateToAuth} 
        onLogout={handleLogout}
      />
      <main className="main-content-area">
        {renderActiveTabContent()}
      </main>
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Заходь ще!</p>
        <p>THEMOSTIMPORTANTFILE.txt все ще тут, на ньому тримається весь бекенд!</p>
      </footer>
    </div>
  );
}
export default App;