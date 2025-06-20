// src/components/EquipmentTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EquipmentDetailModal from './EquipmentDetailModal.jsx';

function EquipmentTab({ allItems, onToggleEquipmentAvailability, currentUser }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedEquipmentForModal, setSelectedEquipmentForModal] = useState(null);

  const equipmentOnly = useMemo(() => 
    allItems.filter(item => item.type === 'equipment'), 
  [allItems]);

  useEffect(() => {
    let filteredResult = equipmentOnly;
    if (selectedAvailability !== 'all') {
      filteredResult = filteredResult.filter(item => item.availabilityStatus === selectedAvailability);
    }
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredResult = filteredResult.filter(item => 
        item.title.toLowerCase().includes(lowercasedSearchTerm) ||
        (item.equipmentType && item.equipmentType.toLowerCase().includes(lowercasedSearchTerm))
      );
    }
    setDisplayedItems(filteredResult);
  }, [searchTerm, selectedAvailability, equipmentOnly]);

  const handleShowDetails = (equipment) => setSelectedEquipmentForModal(equipment);
  const handleCloseModal = () => setSelectedEquipmentForModal(null);

  // Опції фільтрів для техніки
  const filterOptionsForEquipment = {
    searchPlaceholder: "Пошук техніки за назвою або типом...",
    availabilityOptions: [
      { value: 'available', label: 'В наявності' },
      { value: 'rented', label: 'В оренді' }
    ],
    selectedAvailability: selectedAvailability,
    onAvailabilityChange: setSelectedAvailability, // Функція для зміни статусу доступності
  };

  return (
    <div className="tab-content equipment-tab">
      <h2>Каталог Техніки</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForEquipment}
      />
      <ItemList
        items={displayedItems}
        onShowDetails={handleShowDetails}
        onToggleAvailability={onToggleEquipmentAvailability}
      />
      {selectedEquipmentForModal && (
        <EquipmentDetailModal item={selectedEquipmentForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EquipmentTab;