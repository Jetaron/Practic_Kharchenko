import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import BooksTab from './components/BooksTab.jsx';
import EquipmentTab from './components/EquipmentTab.jsx';
import EventsTab from './components/EventsTab.jsx';
import EquipmentDetailModal from './components/EquipmentDetailModal.jsx'; // Імпорт модалки для техніки
import EventDetailModal from './components/EventDetailModal.jsx';     // Імпорт модалки для подій

function App() {
  const [activeTab, setActiveTab] = useState('books'); // Початкова активна вкладка: 'books', 'equipment', 'events'

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  // Функція для рендерингу вмісту активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'books':
        return <BooksTab />;
      case 'equipment':
        return <EquipmentTab />;
      case 'events':
        return <EventsTab />;
      default:
        return <BooksTab />; // За замовчуванням показуємо книги
    }
  };

  return (
    <div className="App">
      <Header 
        title="Моя Універсальна Бібліотека" 
        tagline="Книги, техніка, події та багато іншого!"
        activeTab={activeTab}
        onTabChange={handleTabChange} 
      />
      
      <main className="main-content-area"> {/* Додав клас для можливої стилізації основного контенту */}
        {renderActiveTabContent()}
      </main>
      
      <footer className="app-footer-custom">
        <p>© {new Date().getFullYear()} Твоя Бібліотека. Заходь ще!</p>
        <p>THEMOSTIMPORTANTFILE.txt все ще на місці і заряджає на креатив!</p>
      </footer>
    </div>
  );
}

export default App;