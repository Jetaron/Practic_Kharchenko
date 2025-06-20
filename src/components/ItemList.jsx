// src/components/ItemList.jsx
import React from 'react';
import ItemCard from './ItemCard.jsx'; // Переконайся, що розширення правильне
import './ItemList.css';         // Підключаємо стилі

// Компонент тепер приймає ВСІ три функції onToggle...
function ItemList({ 
  items, 
  onShowDetails, 
  onToggleBookRental,       // Для книг
  onToggleAvailability,     // Для техніки
  onToggleRegistration      // Для подій
}) {
  
  if (!items || items.length === 0) {
    return (
      <div className="item-list-message-container">
        <p>За вашим запитом нічого не знайдено, або дані ще завантажуються...</p>
      </div>
    );
  }

  return (
    <div className="item-list-grid-container"> 
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onShowDetails={onShowDetails}
          // Умовно передаємо потрібну функцію onToggle... в ItemCard
          // ItemCard сам розбереться, яку кнопку показати і яку функцію викликати
          onToggleBookRental={item.type === 'book' ? onToggleBookRental : undefined}
          onToggleAvailability={item.type === 'equipment' ? onToggleAvailability : undefined}
          onToggleRegistration={item.type === 'event' ? onToggleRegistration : undefined}
        />
      ))}
    </div>
  );
}

export default ItemList;