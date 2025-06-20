// src/components/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css'; // Створимо стилі

// Приймає функції onLogin, onRegister та функцію для переходу назад
function AuthPage({ onLogin, onRegister, onGoBack }) {
  const [isLoginView, setIsLoginView] = useState(true); // Показувати логін чи реєстрацію

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Для реєстрації

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      // Імітація логіну: передаємо username, пароль не перевіряємо
      // У реальному додатку тут був би запит на сервер
      console.log('AuthPage: Спроба логіну з username:', username);
      onLogin(username || 'TestUser'); // Якщо username порожній, логінимо як TestUser
    } else {
      if (password !== confirmPassword) {
        alert('Паролі не співпадають!');
        return;
      }
      // Імітація реєстрації: передаємо username
      // У реальному додатку тут був би запит на сервер
      console.log('AuthPage: Спроба реєстрації з username:', username);
      onRegister(username || 'NewUser'); // Якщо username порожній, реєструємо як NewUser
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <button onClick={onGoBack} className="auth-back-button">← Назад до каталогу</button>
        <h2>{isLoginView ? 'Вхід до Бібліотеки' : 'Реєстрація'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Ім'я користувача (логін):</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введіть ваш логін"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть ваш пароль"
              required
            />
          </div>
          {!isLoginView && ( // Поле "Підтвердити пароль" тільки для реєстрації
            <div className="form-group">
              <label htmlFor="confirmPassword">Підтвердіть пароль:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторіть ваш пароль"
                required
              />
            </div>
          )}
          <button type="submit" className="auth-submit-button">
            {isLoginView ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
        <button onClick={() => setIsLoginView(!isLoginView)} className="auth-toggle-button">
          {isLoginView ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;