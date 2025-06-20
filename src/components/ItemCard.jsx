// src/components/ItemCard.jsx
import React from 'react';
import './ItemCard.css'; // Підключені стилі

// Компонент для відображення зірочок рейтингу
const StarRating = ({ rating }) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return <div className="star-rating-unavailable">Рейтинг недоступний</div>;
  }
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span key={i} className={`star ${i <= Math.round(rating) ? 'filled' : 'empty'}`}>
        {i <= Math.round(rating) ? '★' : '☆'}
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function ItemCard({ 
  item, 
  onShowDetails, 
  onToggleBookRental,      
  onToggleAvailability,    
  onToggleRegistration     
}) {

  const imageUrl = item.type === 'book' 
                    ? (item.coverUrl || item.coverImageUrl || '')
                    : (item.type === 'equipment' || item.type === 'event' ? item.imageUrl : '');

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return; 
    }
    if (onShowDetails) {
      onShowDetails(item);
    }
  };

  const handleBookRentalAction = (e) => {
    e.stopPropagation();
    if (onToggleBookRental) onToggleBookRental(item.id);
  };

  const handleEquipmentAction = (e) => {
    e.stopPropagation();
    if (onToggleAvailability) onToggleAvailability(item.id);
  };

  const handleEventAction = (e) => {
    e.stopPropagation();
    if (onToggleRegistration) onToggleRegistration(item.id);
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      {imageUrl && <img src={imageUrl} alt={item.title} className="item-image" />}
      
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

        {item.type === 'book' && (
          <>
            {item.author && <p className="item-author"><strong>Автор:</strong> {item.author}</p>}
            {item.genre && <p className="item-genre"><strong>Жанр:</strong> {item.genre}</p>}
            {/* Відображення рейтингу */}
            <div className="item-rating-container">
              <strong>Рейтинг:</strong> <StarRating rating={item.rating} />
            </div>
            {/* Кнопка оренди книги (видима, якщо передана функція onToggleBookRental) */}
            {onToggleBookRental && ( 
                 <button
                 className={`availability-button ${item.isRentedByUser ? 'button-rented' : 'button-available'}`}
                 onClick={handleBookRentalAction}
               >
                 {item.isRentedByUser ? 'Повернути книгу' : 'Взяти в оренду'}
               </button>
            )}
          </>
        )}

        {item.type === 'equipment' && (
          <>
            {item.equipmentType && <p className="item-equipment-type"><strong>Тип:</strong> {item.equipmentType}</p>}
            <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
              <strong>Статус:</strong> {item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}
            </p>
            {onToggleAvailability && (
              <button 
                className={`availability-button ${item.availabilityStatus === 'available' ? 'button-available' : 'button-rented'}`}
                onClick={handleEquipmentAction}
              >
                {item.availabilityStatus === 'available' ? 'Забронювати' : 'Повернути'}
              </button>
            )}
          </>
        )}

        {item.type === 'event' && (
          <>
            {item.date && <p className="item-event-date"><strong>Дата:</strong> {item.date} {item.time && `(${item.time})`}</p>}
            {item.location && <p className="item-event-location"><strong>Місце:</strong> {item.location}</p>}
            {onToggleRegistration && (
              <button
                className={`registration-button ${item.isRegistered ? 'button-registered' : 'button-not-registered'}`}
                onClick={handleEventAction}
              >
                {item.isRegistered ? 'Ви записані' : 'Записатися'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ItemCard;