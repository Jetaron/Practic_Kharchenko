// src/components/BookList.jsx
import BookCard from './BookCard';

function BookList({ books, onShowDetails }) {
  // ДІАГНОСТИКА: Що отримує BookList як пропс 'books'?
  console.log("BookList: Пропс 'books' отримано (кількість):", books ? books.length : 'undefined', books);

  if (!books || books.length === 0) {
    // Ця умова викликає повідомлення "Інформація про книгу відсутня."
    console.warn("BookList: Пропс 'books' порожній або undefined. Відображення повідомлення про відсутність інформації.");
    return <p>Інформація про книгу відсутня.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
}

export default BookList;