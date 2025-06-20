// src/components/EquipmentTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EquipmentDetailModal from './EquipmentDetailModal.jsx';

function EquipmentTab({ allItems, onToggleEquipmentAvailability, currentUser }) {
  // ... (весь код стану та ефектів як був) ...
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedEquipmentForModal, setSelectedEquipmentForModal] = useState(null);

  const equipmentOnly = useMemo(() => allItems.filter(item => item.type === 'equipment'), [allItems]);
  
  useEffect(() => {
     let filteredResult = equipmentOnly;
     if (selectedAvailability !== 'all') { /* ... */ }
     if (searchTerm.trim() !== '') { /* ... */ }
     setDisplayedItems(filteredResult);
  }, [searchTerm, selectedAvailability, equipmentOnly]);

  const handleShowDetails = (eq) => setSelectedEquipmentForModal(eq);
  const handleCloseModal = () => setSelectedEquipmentForModal(null);
  const filterOptionsForEquipment = { /* ... */ };
  
  return (
    <div className="tab-content equipment-tab">
      <h2>Каталог Техніки</h2>
      <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} filterOptions={filterOptionsForEquipment} />
      <ItemList
        items={displayedItems}
        onShowDetails={handleShowDetails}
        onToggleAvailability={onToggleEquipmentAvailability}
        currentUser={currentUser} // <--- ПЕРЕДАЄМО currentUser
      />
      {selectedEquipmentForModal && <EquipmentDetailModal item={selectedEquipmentForModal} onClose={handleCloseModal} />}
    </div>
  );
}
export default EquipmentTab;