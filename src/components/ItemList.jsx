// src/components/ItemList.jsx
import React from 'react'; // Не забувай імпортувати React, якщо використовуєш JSX
import ItemCard from './ItemCard'; // Імпортуємо наш універсальний ItemCard
import './ItemList.css';         // Підключимо стилі (або твій BookList.css, якщо він підходить)

// Компонент тепер називається ItemList і приймає проп 'items'
function ItemList({ items, onShowDetails }) { 
  // ДІАГНОСТИКА: Що отримує ItemList як пропс 'items'?
  console.log("ItemList: Пропс 'items' отримано (кількість):", items ? items.length : 'undefined', items);

  if (!items || items.length === 0) {
    // Оновимо повідомлення
    console.warn("ItemList: Пропс 'items' порожній або undefined. Відображення повідомлення про відсутність елементів.");
    return (
      <div className="item-list-message-container"> {/* Використовуємо клас зі стилів, які я давав */}
        <p>За вашим запитом нічого не знайдено, або дані ще завантажуються...</p>
      </div>
    );
  }

  return (
    // Використовуємо клас зі стилів, які я давав, для сітки
    <div className="item-list-grid-container"> 
      {items.map((item) => ( // Тепер змінна називається 'item'
        <ItemCard
          key={item.id}       // Ключ дуже важливий
          item={item}         // Передаємо весь об'єкт 'item' в ItemCard
          onShowDetails={onShowDetails} // Передаємо функцію для показу деталей
        />
      ))}
    </div>
  );
}

export default ItemList;