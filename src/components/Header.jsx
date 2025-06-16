// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Підключаємо стилі

function Header({ title, tagline }) {
  return (
    <header className="app-header">
      <h1>{title || "Мій Чудовий Каталог"}</h1>
      {tagline && <p>{tagline}</p>}
    </header>
  );
}

export default Header;