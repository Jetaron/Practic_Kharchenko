
import React from 'react';
import './BookDetailModal.css'; // Можемо використати ті ж стилі

function EventDetailModal({ item, onClose }) {
  if (!item || item.type !== 'event') {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{item.title}</h2>
        {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', marginBottom: '15px' }} />}
        <p><strong>Дата:</strong> {item.date} ({item.time})</p>
        <p><strong>Місце:</strong> {item.location}</p>
        <p><strong>Організатор:</strong> {item.organizer}</p>
        <p><strong>Опис:</strong> {item.description || "Детальний опис події відсутній."}</p>
        <p><strong>Ви записані:</strong> {item.isRegistered ? 'Так' : 'Ні, але можете записатися на картці події!'}</p>
        <button onClick={onClose} className="modal-close-button">Закрити</button>
      </div>
    </div>
  );
}

export default EventDetailModal;