// src/components/UserProfileTab.jsx
import React from 'react';
import ItemCard from './ItemCard'; // Будемо використовувати ItemCard для відображення
import './UserProfileTab.css';    // Створимо стилі

function UserProfileTab({ 
  currentUser, 
  rentedBooks, 
  rentedEquipment, 
  registeredEvents,
  onToggleBookRental,
  onToggleEquipmentAvailability,
  onToggleEventRegistration 
}) {
  if (!currentUser) return null; // На всякий випадок

  return (
    <div className="user-profile-tab tab-content">
      <h2>Особистий кабінет: {currentUser.username}</h2>

      <section className="profile-section">
        <h3>📚 Мої книги в оренді ({rentedBooks.length})</h3>
        {rentedBooks.length > 0 ? (
          <div className="profile-item-list">
            {rentedBooks.map(book => (
              <ItemCard 
                key={book.id} 
                item={book} 
                onToggleBookRental={onToggleBookRental} // Дозволяємо "повернути" книгу
              />
            ))}
          </div>
        ) : (
          <p>У вас немає книг в оренді.</p>
        )}
      </section>

      <section className="profile-section">
        <h3>💻 Моя заброньована техніка ({rentedEquipment.length})</h3>
        {rentedEquipment.length > 0 ? (
          <div className="profile-item-list">
            {rentedEquipment.map(eq => (
              <ItemCard 
                key={eq.id} 
                item={eq} 
                onToggleAvailability={onToggleEquipmentAvailability} // Дозволяємо "повернути" техніку
              />
            ))}
          </div>
        ) : (
          <p>У вас немає заброньованої техніки.</p>
        )}
      </section>

      <section className="profile-section">
        <h3>🎉 Події, на які я записаний ({registeredEvents.length})</h3>
        {registeredEvents.length > 0 ? (
          <div className="profile-item-list">
            {registeredEvents.map(event => (
              <ItemCard 
                key={event.id} 
                item={event} 
                onToggleRegistration={onToggleEventRegistration} // Дозволяємо "скасувати запис"
              />
            ))}
          </div>
        ) : (
          <p>Ви не записані на жодну подію.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfileTab;