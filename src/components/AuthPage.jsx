// src/components/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css';
import { registerUser, loginUser } from '../utils/authService'; // Імпортуємо функції

function AuthPage({ onAuthSuccess, onGoBack }) { // onAuthSuccess - нова функція для передачі даних користувача
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Для відображення помилок

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Скидаємо попередню помилку

    if (isLoginView) {
      const user = loginUser(username, password);
      if (user) {
        onAuthSuccess(user); // Передаємо об'єкт користувача в App.jsx
      } else {
        // Помилка вже показана через alert в loginUser, але можна додати setError
        // setError('Не вдалося увійти. Перевірте дані.');
      }
    } else { // Реєстрація
      if (password !== confirmPassword) {
        setError('Паролі не співпадають!');
        return;
      }
      if (password.length < 6) {
        setError('Пароль має бути щонайменше 6 символів.');
        return;
      }
      const newUser = registerUser(username, password);
      if (newUser) {
        onAuthSuccess(newUser); // Передаємо об'єкт нового користувача
      } else {
        // Помилка вже показана через alert в registerUser
        // setError('Не вдалося зареєструватися. Можливо, таке ім\'я вже існує.');
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        {/* Кнопка "Назад" тепер не потрібна, якщо App.jsx керує вкладками, 
            або можна залишити, якщо AuthPage не є вкладкою, а окремим станом */}
        {typeof onGoBack === 'function' && (
             <button onClick={onGoBack} className="auth-back-button">← Назад до каталогу</button>
        )}
        <h2>{isLoginView ? 'Вхід до Бібліотеки' : 'Створення Акаунту'}</h2>
        {error && <p className="auth-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="auth-username">Ім'я користувача (логін):</label>
            <input
              type="text"
              id="auth-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ваш унікальний логін"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="auth-password">Пароль:</label>
            <input
              type="password"
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль (мін. 6 символів)"
              required
            />
          </div>
          {!isLoginView && (
            <div className="form-group">
              <label htmlFor="auth-confirmPassword">Підтвердіть пароль:</label>
              <input
                type="password"
                id="auth-confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторіть пароль"
                required
              />
            </div>
          )}
          <button type="submit" className="auth-submit-button">
            {isLoginView ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
        <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="auth-toggle-button">
          {isLoginView ? 'Немає акаунту? Створити новий' : 'Вже є акаунт? Увійти'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;