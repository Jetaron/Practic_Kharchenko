// src/components/ItemList.jsx
import React from 'react';
import ItemCard from './ItemCard.jsx';
import './ItemList.css';

function ItemList({ 
  items, 
  onShowDetails, 
  onToggleBookRental, 
  onToggleAvailability, 
  onToggleRegistration, 
  currentUser // <--- НОВИЙ ПРОП
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
          onToggleBookRental={item.type === 'book' ? onToggleBookRental : undefined}
          onToggleAvailability={item.type === 'equipment' ? onToggleAvailability : undefined}
          onToggleRegistration={item.type === 'event' ? onToggleRegistration : undefined}
          currentUser={currentUser} // <--- ПЕРЕДАЄМО currentUser
        />
      ))}
    </div>
  );
}

export default ItemList;