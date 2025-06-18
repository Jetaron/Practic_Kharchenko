import React, { useState, useEffect, useMemo } from 'react';
import ItemList from './ItemList.jsx';
import FilterBar from './FilterBar.jsx';
import EquipmentDetailModal from './EquipmentDetailModal.jsx'; // Модалка для техніки
import { equipment as allEquipmentData } from '../data/equipmentData.js';

function EquipmentTab() {
  const [displayedEquipment, setDisplayedEquipment] = useState(allEquipmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('all'); // 'all', 'available', 'rented'
  const [selectedEquipmentForModal, setSelectedEquipmentForModal] = useState(null);

  // Можна додати отримання унікальних типів техніки, якщо потрібно буде фільтр за ними
  const equipmentTypes = useMemo(() => {
    const types = allEquipmentData
        .filter(item => item.equipmentType)
        .map(item => String(item.equipmentType));
    return [...new Set(types)].sort();
  }, []);


  useEffect(() => {
    let filteredEquipment = allEquipmentData;

    if (selectedAvailability !== 'all') {
      filteredEquipment = filteredEquipment.filter(item => item.availabilityStatus === selectedAvailability);
    }

    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filteredEquipment = filteredEquipment.filter(item => 
        item.title.toLowerCase().includes(lowercasedSearchTerm) ||
        (item.equipmentType && item.equipmentType.toLowerCase().includes(lowercasedSearchTerm))
      );
    }
    setDisplayedEquipment(filteredEquipment);
  }, [searchTerm, selectedAvailability]);

  const handleShowDetails = (equipment) => setSelectedEquipmentForModal(equipment);
  const handleCloseModal = () => setSelectedEquipmentForModal(null);

  const handleToggleAvailability = (itemId) => { // Функція для зміни статусу
    setDisplayedEquipment(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, availabilityStatus: item.availabilityStatus === 'available' ? 'rented' : 'available' }
          : item
      )
    );
    // Важливо: також потрібно оновити allEquipmentData або мати єдиний masterList в App.jsx
    // для персистентності змін між перемиканнями вкладок.
    // Поки що це буде працювати тільки для displayedEquipment.
    // Для глобальної зміни статусу, цю логіку краще винести в App.jsx
  };


  const filterOptionsForEquipment = {
    searchPlaceholder: "Пошук техніки за назвою або типом...",
    // Тут можна додати фільтр за equipmentType, якщо потрібно
    // types: equipmentTypes.map(type => ({ value: type, label: type })), 
    // selectedType: ..., (потрібен буде ще один стан)
    // onTypeChange: ...,
    availabilityOptions: [ // Опції для фільтра доступності
      { value: 'available', label: 'В наявності' },
      { value: 'rented', label: 'В оренді' }
    ],
    selectedAvailability: selectedAvailability,
    onAvailabilityChange: setSelectedAvailability,
  };

  return (
    <div className="tab-content equipment-tab">
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={filterOptionsForEquipment}
      />
      <ItemList
        items={displayedEquipment.map(eq => ({ ...eq, type: 'equipment' }))}
        onShowDetails={handleShowDetails}
        onToggleAvailability={handleToggleAvailability} // Передаємо функцію
      />
      {selectedEquipmentForModal && (
        <EquipmentDetailModal item={selectedEquipmentForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EquipmentTab;