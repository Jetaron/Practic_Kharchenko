// src/components/ItemCard.jsx
import React from 'react';
import './ItemCard.css'; // Переконайся, що цей файл існує і містить актуальні стилі

// Компонент для відображення зірочок рейтингу
const StarRating = ({ rating }) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return null; // Не показуємо рейтинг, якщо дані некоректні
  }
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.round(rating)) { // Округлюємо рейтинг до найближчого цілого для зірочок
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
};

function ItemCard({ 
  item, 
  onShowDetails, 
  onToggleBookRental,      // Функція для оренди/повернення книги
  onToggleAvailability,    // Функція для бронювання/повернення техніки
  onToggleRegistration     // Функція для запису/скасування запису на подію
}) {

  // Визначаємо URL картинки залежно від типу елемента
  let displayImageUrl = '';
  if (item.type === 'book') {
    displayImageUrl = item.coverUrl || ''; // Використовуємо coverUrl для книг
  } else if (item.type === 'equipment' || item.type === 'event') {
    displayImageUrl = item.imageUrl || ''; // Використовуємо imageUrl для техніки та подій
  }

  // Обробник кліку на картку (не на кнопки всередині)
  const handleCardClick = (e) => {
    // Перевіряємо, чи клік був не по кнопці
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return; 
    }
    if (onShowDetails) {
      onShowDetails(item);
    }
  };

  // Обробники для кнопок, які зупиняють спливання події до handleCardClick
  const handleBookRentalAction = (e) => {
    e.stopPropagation(); // Зупиняємо спливання
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
      {/* Відображаємо картинку, якщо є URL */}
      {displayImageUrl && <img src={displayImageUrl} alt={item.title} className="item-image" />}
      
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

        {/* Специфічна інформація та кнопки для КНИГ */}
        {item.type === 'book' && (
          <>
            {item.author && <p className="item-author"><strong>Автор:</strong> {item.author}</p>}
            {item.genre && <p className="item-genre"><strong>Жанр:</strong> {item.genre}</p>}
            {typeof item.rating === 'number' && (
              <div className="item-rating-container">
                <strong>Рейтинг:</strong> <StarRating rating={item.rating} />
              </div>
            )}
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

        {/* Специфічна інформація та кнопки для ТЕХНІКИ */}
        {item.type === 'equipment' && (
          <>
            {item.equipmentType && <p className="item-equipment-type"><strong>Тип:</strong> {item.equipmentType}</p>}
            <p className={`item-status ${item.availabilityStatus === 'available' ? 'status-available' : 'status-rented'}`}>
              <strong>Статус:</strong> {item.availabilityStatus === 'available' ? 'В наявності' : 'В оренді'}
            </p>
            {/* Кнопка бронювання техніки (видима, якщо передана функція onToggleAvailability) */}
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

        {/* Специфічна інформація та кнопки для ПОДІЙ */}
        {item.type === 'event' && (
          <>
            {item.date && <p className="item-event-date"><strong>Дата:</strong> {item.date} {item.time && `(${item.time})`}</p>}
            {item.location && <p className="item-event-location"><strong>Місце:</strong> {item.location}</p>}
            {/* Кнопка запису на подію (видима, якщо передана функція onToggleRegistration) */}
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