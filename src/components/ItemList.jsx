
import React from 'react';
import ItemCard from './ItemCard';
import './ItemList.css';

// Тепер приймаємо ще й onToggleAvailability
function ItemList({ items, onShowDetails, onToggleAvailability }) { 
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
          onToggleAvailability={onToggleAvailability} // Передаємо далі
        />
      ))}
    </div>
  );
}

export default ItemList;