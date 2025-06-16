// src/data/eventsData.js
export const events = [
  {
    id: 'event_react_workshop',
    type: 'event', // Вказуємо тип
    title: 'Воркшоп: Основи React для початківців',
    date: '2024-06-15', // Можна використовувати рядок або об'єкт Date
    time: '14:00 - 17:00',
    location: 'Конференц-зал №1, Бібліотека',
    description: 'Дізнайтеся про базові концепції React, створення компонентів та управління станом. Практичні завдання включені.',
    organizer: 'IT Клуб Бібліотеки',
    isRegistered: false, // Чи записався користувач (для клієнтської логіки)
    imageUrl: '/images/events/react_workshop.jpg' // Картинка для події
  },
  {
    id: 'event_author_meeting_shevchenko',
    type: 'event',
    title: 'Зустріч з письменником: Сучасне прочитання Шевченка',
    date: '2024-06-22',
    time: '18:30',
    location: 'Літературна вітальня',
    description: 'Обговорення творчості Тараса Шевченка з відомим літературознавцем. Можливість поставити питання.',
    organizer: 'Літературний клуб "Слово"',
    isRegistered: false,
    imageUrl: '/images/events/shevchenko_meeting.jpg'
  },
  {
    id: 'event_kids_story_time',
    type: 'event',
    title: 'Казковий час для малят (3-6 років)',
    date: '2024-06-29',
    time: '11:00',
    location: 'Дитяча кімната',
    description: 'Читання дитячих казок, ігри та творчі завдання для найменших відвідувачів.',
    organizer: 'Дитячий відділ бібліотеки',
    isRegistered: true, // Приклад, де користувач вже "записаний"
    imageUrl: '/images/events/kids_story_time.jpg'
  },
  // Додай ще 2-3 події для різноманіття
  {
    id: 'event_coding_for_teens',
    type: 'event',
    title: 'Курс: Програмування на Python для підлітків',
    date: '2024-07-01', // Початок курсу
    time: 'Щопонеділка та щосереди о 16:00',
    location: 'Комп\'ютерний клас №2',
    description: 'Базовий курс програмування на Python для школярів 12-16 років. Попередня реєстрація обов\'язкова.',
    organizer: 'Освітній центр "Майбутнє IT"',
    isRegistered: false,
    imageUrl: '/images/events/python_teens.jpg'
  }
];