
import React from 'react';
import './ItemCard.css';

function ItemCard({ item, onShowDetails, onToggleAvailability, onToggleRegistration }) { 
         const imageUrl = item.type === 'book' 
                    ? item.coverUrl 
                    : (item.type === 'equipment' || item.type === 'event' ? item.imageUrl : ''); 

  const handleCardClick = () => {
    if (onShowDetails) {
      onShowDetails(item);
    }
  };

  const handleAvailabilityToggle = (e) => {
    e.stopPropagation();
    if (onToggleAvailability && item.type === 'equipment') { // Тільки для техніки
      onToggleAvailability(item.id); // Тепер передаємо тільки id, тип вже відомий
    }
  };

  const handleRegistrationToggle = (e) => {
    e.stopPropagation();
    if (onToggleRegistration && item.type === 'event') { // Тільки для подій
      onToggleRegistration(item.id); // Передаємо id події
    }
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      {imageUrl && <img src={imageUrl} alt={item.title} className="item-image" />}
      
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

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
            <button 
              className={`availability-button ${item.availabilityStatus === 'available' ? 'button-available' : 'button-rented'}`}
              onClick={handleAvailabilityToggle}
            >
              {item.availabilityStatus === 'available' ? 'Забронювати' : 'Повернути'}
            </button>
          </>
        )}

        {item.type === 'event' && ( // НОВИЙ БЛОК для подій
          <>
            <p className="item-event-date"><strong>Дата:</strong> {item.date} ({item.time})</p>
            <p className="item-event-location"><strong>Місце:</strong> {item.location}</p>
            <p className="item-event-organizer"><strong>Організатор:</strong> {item.organizer}</p>
            <button
              className={`registration-button ${item.isRegistered ? 'button-registered' : 'button-not-registered'}`}
              onClick={handleRegistrationToggle}
            >
              {item.isRegistered ? 'Ви записані' : 'Записатися'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemCard;