// src/components/EventsTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EventDetailModal from './EventDetailModal.jsx';

function EventsTab({ allItems, onToggleEventRegistration, currentUser }) {
  // ... (весь код стану та ефектів як був) ...
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  const eventsOnly = useMemo(() => allItems.filter(item => item.type === 'event'), [allItems]);

  useEffect(() => {
     let filteredResult = eventsOnly;
     if (searchTerm.trim() !== '') { /* ... */ }
     setDisplayedItems(filteredResult);
  }, [searchTerm, eventsOnly]);
  
  const handleShowDetails = (ev) => setSelectedEventForModal(ev);
  const handleCloseModal = () => setSelectedEventForModal(null);
  const filterOptionsForEvents = { /* ... */ };

  return (
    <div className="tab-content events-tab">
      <h2>Майбутні Події</h2>
      <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} filterOptions={filterOptionsForEvents} />
      <ItemList
        items={displayedItems}
        onShowDetails={handleShowDetails}
        onToggleRegistration={onToggleEventRegistration}
        currentUser={currentUser} // <--- ПЕРЕДАЄМО currentUser
      />
      {selectedEventForModal && <EventDetailModal item={selectedEventForModal} onClose={handleCloseModal} />}
    </div>
  );
}
export default EventsTab;