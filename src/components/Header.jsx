// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Підключаємо стилі

// Компонент приймає пропси 'title' та 'tagline'
function Header({ title, tagline }) {
  return (
    <header className="app-header">
      <h1>{title || "Мій Чудовий Каталог"}</h1> {/* Використовуємо title з пропсів або значення за замовчуванням */}
      {tagline && <p>{tagline}</p>} {/* Показуємо tagline, якщо він переданий */}
    </header>
  );
}

export default Header;