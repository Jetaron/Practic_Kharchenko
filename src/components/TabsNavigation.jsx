
import React from 'react';
import './TabsNavigation.css'; // Створимо стилі

function TabsNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { key: 'books', label: 'Книги' },
    { key: 'equipment', label: 'Техніка' },
    { key: 'events', label: 'Події' },
  ];

  return (
    <nav className="tabs-navigation">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabsNavigation;