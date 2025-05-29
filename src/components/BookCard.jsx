// src/components/BookCard.jsx

// Додаємо `onShowDetails` до пропсів
function BookCard({ book, onShowDetails }) {
  if (!book) {
    return <p>Інформація про книгу відсутня.</p>;
  }

  // Функція, яка викликається при кліку на кнопку "Детальніше"
  // Вона викликає onShowDetails, передаючи поточну книгу
  const handleDetailsClick = () => {
    if (onShowDetails) {
      onShowDetails(book);
    }
  };

  return (
    <div className="book-card">
      <img 
        src={book.coverImageUrl || 'https://via.placeholder.com/150x220.png?text=No+Cover'} 
        alt={`Обкладинка книги "${book.title}"`} 
        className="book-cover" 
      />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Автор: {book.author}</p>
        {/* Можна приховати жанр і рік, якщо картка стає занадто великою,
            бо ця інформація буде в модальному вікні. Або залишити. */}
        {/* <p className="book-genre">Жанр: {book.genre}</p> */}
        {/* <p className="book-year">Рік: {book.year}</p> */}
        
        {/* Додаємо кнопку */}
        <button onClick={handleDetailsClick} className="details-button">
          Детальніше
        </button>
      </div>
    </div>
  );
}

export default BookCard;