// src/components/BookList.jsx

import React from 'react'; // Імпорт React (хоча в нових версіях JSX працює і без нього, але це хороша практика)
import BookCard from './BookCard'; // Імпортуємо компонент картки книги

// Компонент BookList тепер приймає два пропси:
// - books: масив об'єктів книг для відображення
// - onShowDetails: функція, яка буде викликана, коли користувач захоче побачити деталі книги
//                  (ця функція прийде з App.jsx і буде передана в кожну BookCard)
function BookList({ books, onShowDetails }) {
  
  // Перевірка, чи є книги для відображення
  if (!books || books.length === 0) {
    return <p>Наразі немає книг для відображення.</p>;
  }

  // Рендеримо список карток книг
  return (
    <div className="book-list">
      {/* 
        Ітеруємо по масиву `books` за допомогою методу `map`.
        Для кожної книги створюємо компонент `BookCard`.
      */}
      {books.map((book) => (
        <BookCard 
          key={book.id}          // Унікальний ключ для елемента списку (вимога React)
          book={book}            // Передаємо дані про поточну книгу в BookCard
          onShowDetails={onShowDetails} // Передаємо функцію onShowDetails в BookCard
                                   // щоб BookCard міг повідомити App.jsx про вибір книги
        />
      ))}
    </div>
  );
}

export default BookList;