import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EventDetailModal from './EventDetailModal.jsx'; // Модалка для подій
import { events as allEventsData } from '../data/eventsData.js';

function EventsTab() {
  const [displayedEvents, setDisplayedEvents] = useState(allEventsData);
  const [searchTerm, setSearchTerm] = useState('');
  // Можна додати фільтр за датою або організатором
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  useEffect(() => {
    let filteredEvents = allEventsData;
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(lowercasedSearchTerm) ||
        (event.organizer && event.organizer.toLowerCase().includes(lowercasedSearchTerm))
      );
    }
    setDisplayedEvents(filteredEvents);
  }, [searchTerm]);

  const handleShowDetails = (event) => setSelectedEventForModal(event);
  const handleCloseModal = () => setSelectedEventForModal(null);

  const handleToggleRegistration = (eventId) => { // Функція для зміни статусу реєстрації
     setDisplayedEvents(prevItems => 
      prevItems.map(item => 
        item.id === eventId 
          ? { ...item, isRegistered: !item.isRegistered }
          : item
      )
    );
    // Аналогічно до техніки, для глобальної зміни статусу, логіку краще винести в App.jsx
  };

  const filterOptionsForEvents = {
    searchPlaceholder: "Пошук подій за назвою або організатором...",
    // Тут можна додати фільтр за датою, якщо потрібно
  };

  return (
    <div className="tab-content events-tab">
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForEvents}
      />
      <ItemList
        items={displayedEvents.map(ev => ({ ...ev, type: 'event' }))}
        onShowDetails={handleShowDetails}
        onToggleRegistration={handleToggleRegistration} // Передаємо функцію
      />
      {selectedEventForModal && (
        <EventDetailModal item={selectedEventForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EventsTab;