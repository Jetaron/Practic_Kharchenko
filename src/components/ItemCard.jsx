// src/components/ItemCard.jsx
import React from 'react';
import './ItemCard.css'; // Переконайся, що цей CSS файл існує і має всі стилі

// Компонент для відображення зірочок рейтингу
const StarRating = ({ rating }) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return <div className="star-rating-unavailable">(немає рейтингу)</div>;
  }
  const totalStars = 5;
  let starsDisplay = [];
  for (let i = 1; i <= totalStars; i++) {
    starsDisplay.push(
      <span key={i} className={`star ${i <= Math.round(rating) ? 'filled' : 'empty'}`}>
        {i <= Math.round(rating) ? '★' : '☆'}
      </span>
    );
  }
  return <div className="star-rating">{starsDisplay}</div>;
};

function ItemCard({ 
  item, 
  onShowDetails, 
  onToggleBookRental,      
  onToggleAvailability,    
  onToggleRegistration,
  currentUser // Поточний залогінений користувач
}) {

  let displayImageUrl = '';
  if (item.type === 'book') {
    displayImageUrl = item.coverUrl || item.coverImageUrl || '';
  } else if (item.type === 'equipment' || item.type === 'event') {
    displayImageUrl = item.imageUrl || '';
  }

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (onShowDetails) onShowDetails(item);
  };

  const handleBookRentalAction = (e) => { e.stopPropagation(); if (onToggleBookRental) onToggleBookRental(item.id); };
  const handleEquipmentAction = (e) => { e.stopPropagation(); if (onToggleAvailability) onToggleAvailability(item.id); };
  const handleEventAction = (e) => { e.stopPropagation(); if (onToggleRegistration) onToggleRegistration(item.id); };

  // Визначаємо, чи може поточний користувач взаємодіяти з елементом
  const canInteract = !!currentUser; // true, якщо користувач залогінений

  // Логіка для кнопки книги
  let bookButtonText = 'Взяти в оренду';
  let bookButtonClass = 'button-available';
  let bookButtonDisabled = !canInteract; // Неактивна, якщо не залогінений

  if (item.type === 'book') {
    if (item.isRentedByUser === currentUser?.id) { // Використовуємо optional chaining для currentUser
      bookButtonText = 'Повернути книгу';
      bookButtonClass = 'button-rented';
    } else if (item.isRentedByUser !== null && item.isRentedByUser !== currentUser?.id) {
      bookButtonText = 'Орендовано іншим';
      bookButtonClass = 'button-occupied';
      bookButtonDisabled = true; // Неактивна, якщо орендовано іншим
    }
  }

  // Логіка для кнопки техніки
  let equipmentButtonText = 'Забронювати';
  let equipmentButtonClass = 'button-available';
  let equipmentButtonDisabled = !canInteract;

  if (item.type === 'equipment') {
    if (item.rentedByUserId === currentUser?.id) {
      equipmentButtonText = 'Повернути';
      equipmentButtonClass = 'button-rented';
    } else if (item.rentedByUserId !== null && item.rentedByUserId !== currentUser?.id) {
      equipmentButtonText = 'Заброньовано іншим';
      equipmentButtonClass = 'button-occupied';
      equipmentButtonDisabled = true;
    }
  }

  // Логіка для кнопки події
  let eventButtonText = 'Записатися';
  let eventButtonClass = 'button-not-registered';
  let eventButtonDisabled = !canInteract;

  if (item.type === 'event' && currentUser) { // Перевіряємо currentUser тут теж
    if (item.registeredUserIds && item.registeredUserIds.includes(currentUser.id)) {
      eventButtonText = 'Ви записані (Скасувати)';
      eventButtonClass = 'button-registered';
    }
  }


  return (
    <div className="item-card" onClick={handleCardClick}>
      {displayImageUrl && <img src={displayImageUrl} alt={item.title} className="item-image" />}
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

        {item.type === 'book' && (
          <>
            {item.author && <p className="item-author"><strong>Автор:</strong> {item.author}</p>}
            {item.genre && <p className="item-genre"><strong>Жанр:</strong> {item.genre}</p>}
            <div className="item-rating-container">
              <strong>Рейтинг:</strong> <StarRating rating={item.rating} />
            </div>
            <button
              className={`availability-button ${bookButtonClass}`}
              onClick={handleBookRentalAction}
              disabled={bookButtonDisabled}
            >
              {bookButtonText}
            </button>
          </>
        )}

        {item.type === 'equipment' && (
          <>
            {item.equipmentType && <p className="item-equipment-type"><strong>Тип:</strong> {item.equipmentType}</p>}
            <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
              <strong>Статус:</strong> {
                item.availabilityStatus === 'available' ? 'В наявності' : 
                (item.rentedByUserId === currentUser?.id ? 'Заброньовано вами' : 'В оренді іншим')
              }
            </p>
            <button 
              className={`availability-button ${equipmentButtonClass}`}
              onClick={handleEquipmentAction}
              disabled={equipmentButtonDisabled}
            >
              {equipmentButtonText}
            </button>
          </>
        )}

        {item.type === 'event' && (
          <>
            {item.date && <p className="item-event-date"><strong>Дата:</strong> {item.date} {item.time && `(${item.time})`}</p>}
            {item.location && <p className="item-event-location"><strong>Місце:</strong> {item.location}</p>}
            <button
              className={`registration-button ${eventButtonClass}`}
              onClick={handleEventAction}
              disabled={eventButtonDisabled && !(item.registeredUserIds && item.registeredUserIds.includes(currentUser?.id))} // Дозволяємо скасувати запис, навіть якщо не залогінений (хоча це не логічно, але для простоти)
                                                                                                                            // Краще: disabled={eventButtonDisabled} або більш складна логіка
            >
              {eventButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemCard;