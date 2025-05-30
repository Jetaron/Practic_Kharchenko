// src/components/BookCard.jsx

function BookCard({ book, onShowDetails }) {
  if (!book) {
    // console.warn("BookCard: Пропс 'book' є undefined."); // Можна залишити для діагностики
    return <p>Інформація про книгу відсутня.</p>;
  }

  const handleDetailsClick = () => {
    // console.log("BookCard: handleDetailsClick викликана для:", book.title); // Можна залишити
    if (onShowDetails) {
      // console.log("BookCard: onShowDetails існує, викликаю її"); // Можна залишити
      onShowDetails(book);
    } else {
      console.warn("BookCard: onShowDetails НЕ переданий або undefined для книги:", book.title);
    }
  };

  return (
    <div className="book-card">
      <img
        src={book.coverImageUrl || '/images/placeholder.png'} // Використовуємо шлях з booksData.js
                                                             // '/images/placeholder.png' - це приклад локального плейсхолдера,
                                                             // якщо ти його створиш у public/images/
        alt={`Обкладинка книги "${book.title}"`}
        className="book-cover"
        onError={(e) => { 
          // Обробник помилки завантаження зображення, можна замінити на плейсхолдер
          e.target.onerror = null; // Запобігає зацикленню, якщо плейсхолдер теж не знайдено
          e.target.src = "/images/placeholder.png"; // Шлях до твого плейсхолдера
          console.warn(`BookCard: Не вдалося завантажити обкладинку для "${book.title}" за шляхом: ${book.coverImageUrl}. Встановлено плейсхолдер.`);
        }}
      />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Автор: {book.author}</p>
        {/* можна розкоментувати жанр та рік на картці
        <p className="book-genre">Жанр: {book.genre}</p>
        <p className="book-year">Рік: {book.year}</p>
        */}
        <button onClick={handleDetailsClick} className="details-button">
          Детальніше
        </button>
      </div>
    </div>
  );
}

export default BookCard;