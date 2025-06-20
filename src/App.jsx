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

const prepareInitialMasterList = () => [
  ...booksDataFromJs.map(item => ({ ...item, type: 'book', isRentedByUser: item.isRentedByUser || false })), 
  ...equipmentDataFromJs.map(item => ({ ...item, type: 'equipment', availabilityStatus: item.availabilityStatus || 'available' })),
  ...eventsDataFromJs.map(item => ({ ...item, type: 'event', isRegistered: item.isRegistered || false })), 
];

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [currentUser, setCurrentUser] = useState(null); 
  const [masterList, setMasterList] = useState(() => {
    try {
      const savedList = localStorage.getItem('libraryMasterList');
      return savedList ? JSON.parse(savedList) : prepareInitialMasterList();
    } catch (error) {
      console.error("Помилка завантаження masterList з localStorage:", error);
      return prepareInitialMasterList();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('libraryMasterList', JSON.stringify(masterList));
    } catch (error) {
      console.error("Помилка збереження masterList в localStorage:", error);
    }
  }, [masterList]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('libraryCurrentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Помилка завантаження currentUser з localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('libraryCurrentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('libraryCurrentUser');
      }
    } catch (error) {
      console.error("Помилка збереження currentUser в localStorage:", error);
    }
  }, [currentUser]);

  const handleTabChange = (tabKey) => {
    // ДІАГНОСТИЧНИЙ ЛОГ
    console.log('[App.jsx] handleTabChange викликано. Нова вкладка:', tabKey);
    setActiveTab(tabKey);
  };

  const handleAuthSuccess = (username) => {
    const newUser = { username: username || `User${Date.now().toString().slice(-4)}` };
    setCurrentUser(newUser);
    setActiveTab('profile'); 
    console.log(`[App.jsx] ${newUser.username} увійшов/зареєструвався.`);
  };

  const handleLogout = () => {
    console.log(`[App.jsx] ${currentUser?.username || 'Гість'} вийшов з системи.`);
    setCurrentUser(null);
    setActiveTab('books');
  };

  const navigateToAuth = () => {
    console.log('[App.jsx] Перехід на сторінку аутентифікації.');
    setActiveTab('auth');
  };

  const handleToggleBookRental = (bookId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList => prevList.map(item => item.id === bookId && item.type === 'book' ? { ...item, isRentedByUser: !item.isRentedByUser } : item));
  };

  const handleToggleEquipmentAvailability = (equipmentId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList => prevList.map(item => item.id === equipmentId && item.type === 'equipment' ? { ...item, availabilityStatus: item.availabilityStatus === 'available' ? 'rented' : 'available' } : item));
  };

  const handleToggleEventRegistration = (eventId) => {
    if (!currentUser) { alert("Будь ласка, увійдіть."); navigateToAuth(); return; }
    setMasterList(prevList => prevList.map(item => item.id === eventId && item.type === 'event' ? { ...item, isRegistered: !item.isRegistered } : item));
  };

  const renderActiveTabContent = () => {
    console.log('[App.jsx] renderActiveTabContent. Поточна вкладка:', activeTab); // ДІАГНОСТИКА
    if (activeTab === 'auth') {
      return <AuthPage onLogin={handleAuthSuccess} onRegister={handleAuthSuccess} onGoBack={() => setActiveTab('books')} />;
    }
    if (activeTab === 'profile') {
      if (!currentUser) return <AuthPage onLogin={handleAuthSuccess} onRegister={handleAuthSuccess} onGoBack={() => setActiveTab('books')} />;
      return <UserProfileTab currentUser={currentUser} rentedBooks={masterList.filter(item => item.type === 'book' && item.isRentedByUser)} rentedEquipment={masterList.filter(item => item.type === 'equipment' && item.availabilityStatus === 'rented')} registeredEvents={masterList.filter(item => item.type === 'event' && item.isRegistered)} onToggleBookRental={handleToggleBookRental} onToggleEquipmentAvailability={handleToggleEquipmentAvailability} onToggleEventRegistration={handleToggleEventRegistration} />;
    }
    switch (activeTab) {
      case 'books': return <BooksTab allItems={masterList} onToggleBookRental={handleToggleBookRental} currentUser={currentUser} />;
      case 'equipment': return <EquipmentTab allItems={masterList} onToggleEquipmentAvailability={handleToggleEquipmentAvailability} currentUser={currentUser} />;
      case 'events': return <EventsTab allItems={masterList} onToggleEventRegistration={handleToggleEventRegistration} currentUser={currentUser} />;
      default: return <BooksTab allItems={masterList} onToggleBookRental={handleToggleBookRental} currentUser={currentUser} />;
    }
  };

  return (
    <div className="App">
      <Header 
        title="Моя Універсальна Бібліотека" 
        tagline="Книги, техніка, події та багато іншого!"
        activeTab={activeTab}
        onTabChange={handleTabChange} // <--- Передаємо onTabChange
        currentUser={currentUser}
        onAuthClick={navigateToAuth}
        onLogout={handleLogout}
      />
      <main className="main-content-area">
        {renderActiveTabContent()}
      </main>
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Заходь ще!</p>
        <p>THEMOSTIMPORTANTFILE.txt все ще тут!</p>
      </footer>
    </div>
  );
}
export default App;