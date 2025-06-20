// src/components/EventsTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EventDetailModal from './EventDetailModal.jsx';

function EventsTab({ allItems, onToggleEventRegistration, currentUser }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  const eventsOnly = useMemo(() => 
    allItems.filter(item => item.type === 'event'), 
  [allItems]);
  
  useEffect(() => {
    let filteredResult = eventsOnly;
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredResult = filteredResult.filter(event => 
        event.title.toLowerCase().includes(lowercasedSearchTerm) ||
        (event.organizer && event.organizer.toLowerCase().includes(lowercasedSearchTerm))
      );
    }
    setDisplayedItems(filteredResult);
  }, [searchTerm, eventsOnly]);

  const handleShowDetails = (event) => setSelectedEventForModal(event);
  const handleCloseModal = () => setSelectedEventForModal(null);

  // Опції фільтрів для подій
  const filterOptionsForEvents = {
    searchPlaceholder: "Пошук подій за назвою або організатором...",
    // Тут можна додати інші фільтри для подій, якщо потрібно
  };

  return (
    <div className="tab-content events-tab">
      <h2>Майбутні Події</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForEvents}
      />
      <ItemList
        items={displayedItems}
        onShowDetails={handleShowDetails}
        onToggleRegistration={onToggleEventRegistration}
      />
      {selectedEventForModal && (
        <EventDetailModal item={selectedEventForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EventsTab;