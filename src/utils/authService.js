// src/utils/authService.js

const USERS_STORAGE_KEY = 'libraryUsers';

// Функція для отримання всіх користувачів з localStorage
const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Помилка завантаження користувачів з localStorage:", error);
    return [];
  }
};

// Функція для збереження користувачів у localStorage
const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Помилка збереження користувачів в localStorage:", error);
  }
};

// Функція реєстрації нового користувача
export const registerUser = (username, password) => {
  if (!username || !password) {
    alert("Ім'я користувача та пароль не можуть бути порожніми!");
    return null;
  }
  const users = getUsers();
  const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());

  if (existingUser) {
    alert('Користувач з таким ім\'ям вже існує!');
    return null;
  }

  // УВАГА: Зберігання пароля у відкритому вигляді - ДУЖЕ НЕБЕЗПЕЧНО для реальних систем!
  // Це лише для навчальної імітації.
  const newUser = { 
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, // Простий унікальний ID
    username: username, 
    password: password // В реальному додатку тут мав би бути хеш пароля
  };
  
  users.push(newUser);
  saveUsers(users);
  console.log('[authService] Користувача зареєстровано:', newUser);
  return newUser; // Повертаємо об'єкт нового користувача (без пароля для безпеки)
};

// Функція логіну користувача
export const loginUser = (username, password) => {
  if (!username || !password) {
    alert("Ім'я користувача та пароль не можуть бути порожніми!");
    return null;
  }
  const users = getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    alert('Користувача з таким ім\'ям не знайдено!');
    return null;
  }

  // УВАГА: Пряме порівняння паролів - ДУЖЕ НЕБЕЗПЕЧНО!
  if (user.password !== password) {
    alert('Неправильний пароль!');
    return null;
  }
  
  console.log('[authService] Користувач увійшов:', {id: user.id, username: user.username});
  // Повертаємо об'єкт користувача без пароля
  return { id: user.id, username: user.username };
};