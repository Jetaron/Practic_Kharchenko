import React from 'react';
import './Header.css';

// Тепер Header приймає activeTab та onTabChange для навігації
function Header({ title, tagline, activeTab, onTabChange }) {
  const tabs = [
    { key: 'books', label: '📚 Книги' },
    { key: 'equipment', label: '💻 Техніка' },
    { key: 'events', label: '🎉 Події' },
  ];

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{title || "Моя Універсальна Бібліотека"}</h1>
        {tagline && <p className="header-tagline">{tagline}</p>}
      </div>
      <nav className="header-tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`header-tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;