// src/components/Header.jsx
import React from 'react';
import './Header.css';

function Header({ 
  title, 
  tagline, 
  activeTab, 
  onTabChange, // <--- Приймаємо onTabChange
  currentUser, 
  onAuthClick, 
  onLogout 
}) {
  
  const baseTabs = [
    { key: 'books', label: '📚 Книги' },
    { key: 'equipment', label: '💻 Техніка' },
    { key: 'events', label: '🎉 Події' },
  ];

  let finalTabs = [...baseTabs]; 
  if (currentUser && currentUser.username) { 
    finalTabs.push({ key: 'profile', label: `👤 ${currentUser.username}` });
  }

  // ДІАГНОСТИЧНИЙ ЛОГ (можеш потім прибрати)
  // console.log('[Header.jsx] Рендеримо Header. activeTab:', activeTab, 'finalTabs:', finalTabs);

  return (
    <header className="app-header">
      <div className="header-main-row">
        <div className="header-branding">
          <h1>{title || "Моя Універсальна Бібліотека"}</h1>
          {tagline && <p className="header-tagline">{tagline}</p>}
        </div>
        <div className="auth-controls">
          {currentUser ? (
            <>
              <button onClick={onLogout} className="auth-button logout-button">
                Вийти
              </button>
            </>
          ) : (
            <button onClick={onAuthClick} className="auth-button login-button">
              Увійти / Реєстрація
            </button>
          )}
        </div>
      </div>
      
      {/* Навігація по вкладках (не показуємо на сторінці аутентифікації) */}
      {activeTab !== 'auth' && finalTabs.length > 0 && (
        <nav className="header-tabs-navigation">
          {finalTabs.map(tab => (
            <button
              key={tab.key}
              className={`header-tab-button ${activeTab === tab.key ? 'active' : ''} ${tab.key === 'profile' ? 'profile-tab-button' : ''}`}
              onClick={() => {
                // ДІАГНОСТИЧНИЙ ЛОГ при кліку
                console.log(`[Header.jsx] Клік на вкладку: '${tab.key}'. Викликаємо onTabChange.`);
                onTabChange(tab.key); // <--- Викликаємо onTabChange, передану з App.jsx
              }}
              title={tab.key === 'profile' && currentUser ? currentUser.username : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;