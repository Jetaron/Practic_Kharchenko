// src/components/UserProfileTab.jsx
import React from 'react';
import ItemList from './ItemList.jsx'; // Використовуємо ItemList для відображення
import './UserProfileTab.css';

function UserProfileTab({ 
  currentUser, 
  rentedBooks, 
  rentedEquipment, 
  registeredEvents,
  onToggleBookRental,
  onToggleEquipmentAvailability,
  onToggleEventRegistration 
}) {
  if (!currentUser) return null;

  return (
    <div className="user-profile-tab tab-content">
      <h2>Особистий кабінет: {currentUser.username}</h2>

      <section className="profile-section">
        <h3>📚 Мої книги в оренді ({rentedBooks.length})</h3>
        {rentedBooks.length > 0 ? (
          <ItemList // Використовуємо ItemList для консистентного відображення
            items={rentedBooks} 
            // onShowDetails можна додати, якщо потрібні деталі і тут
            onToggleBookRental={onToggleBookRental} // Дозволяємо "повернути" книгу
            currentUser={currentUser} // Передаємо currentUser
          />
        ) : (
          <p>У вас немає книг в оренді.</p>
        )}
      </section>

      <section className="profile-section">
        <h3>💻 Моя заброньована техніка ({rentedEquipment.length})</h3>
        {rentedEquipment.length > 0 ? (
          <ItemList
            items={rentedEquipment}
            onToggleAvailability={onToggleEquipmentAvailability}
            currentUser={currentUser}
          />
        ) : (
          <p>У вас немає заброньованої техніки.</p>
        )}
      </section>

      <section className="profile-section">
        <h3>🎉 Події, на які я записаний ({registeredEvents.length})</h3>
        {registeredEvents.length > 0 ? (
          <ItemList
            items={registeredEvents}
            onToggleRegistration={onToggleEventRegistration}
            currentUser={currentUser}
          />
        ) : (
          <p>Ви не записані на жодну подію.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfileTab;