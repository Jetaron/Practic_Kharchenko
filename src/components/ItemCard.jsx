// src/components/ItemCard.jsx
import React from 'react';
import './ItemCard.css'; // Підключимо стилі для картки

function ItemCard({ item, onShowDetails }) {
  // Визначаємо, яку картинку використовувати залежно від типу елемента
  const imageUrl = item.type === 'book' ? item.coverUrl : item.imageUrl;

  return (
    // Додаємо обробник кліку на всю картку, щоб викликати onShowDetails
    <div className="item-card" onClick={() => onShowDetails(item)}>
      {/* Відображаємо картинку, якщо є URL */}
      {imageUrl && <img src={imageUrl} alt={item.title} className="item-image" />}
      
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

        {/* Умовне відображення полів залежно від типу елемента */}
        {item.type === 'book' && (
          <>
            <p className="item-author"><strong>Автор:</strong> {item.author}</p>
            <p className="item-genre"><strong>Жанр:</strong> {item.genre}</p>
          </>
        )}

        {item.type === 'equipment' && (
          <>
            <p className="item-equipment-type"><strong>Тип:</strong> {item.equipmentType}</p>
            <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
              <strong>Статус:</strong> {item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemCard;