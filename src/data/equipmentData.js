// src/data/equipmentData.js
export const equipment = [
  // --- Ноутбуки ---
  {
    id: 'equip_laptop_dell_xps15',
    title: 'Ноутбук Dell XPS 15 (2023)',
    equipmentType: 'Ноутбук',
    specs: 'Intel Core i7-13700H, 16GB DDR5, 1TB SSD, NVIDIA RTX 4050, 15.6" OLED',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/dell_xps15.jpg',
    description: 'Потужний та стильний ноутбук для роботи та творчості, з чудовим OLED дисплеєм.'
  },
  {
    id: 'equip_laptop_macbook_air_m2',
    title: 'Ноутбук Apple MacBook Air M2 (13-inch)',
    equipmentType: 'Ноутбук',
    specs: 'Apple M2 chip, 8GB RAM, 256GB SSD, 13.6" Liquid Retina display',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/macbook_air_m2.jpg',
    description: 'Легкий, тонкий та продуктивний ноутбук на базі чіпу M2, ідеальний для подорожей.'
  },
  {
    id: 'equip_laptop_lenovo_yoga',
    title: 'Ноутбук-трансформер Lenovo Yoga 7',
    equipmentType: 'Ноутбук-трансформер',
    specs: 'AMD Ryzen 5, 16GB RAM, 512GB SSD, 14" touchscreen, 360-degree hinge',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/lenovo_yoga.jpg',
    description: 'Універсальний ноутбук-трансформер, який легко перетворюється на планшет.'
  },

  // --- Планшети та електронні читалки ---
  {
    id: 'equip_tablet_ipad_air',
    title: 'Планшет Apple iPad Air (5th gen)',
    equipmentType: 'Планшет',
    specs: 'M1 chip, 10.9-inch Liquid Retina display, 256GB, Wi-Fi',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/ipad_air.jpg',
    description: 'Потужний та універсальний планшет для роботи, навчання та розваг.'
  },
  {
    id: 'equip_ereader_kindle_paperwhite',
    title: 'Електронна книга Amazon Kindle Paperwhite (11th Gen)',
    equipmentType: 'Електронна книга',
    specs: '6.8” дисплей, водонепроникний, регульоване тепле світло, 16GB',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/kindle_paperwhite.jpg',
    description: 'Комфортне читання в будь-яких умовах з дисплеєм, що імітує папір.'
  },
  {
    id: 'equip_ereader_pocketbook_era',
    title: 'Електронна книга PocketBook Era Color',
    equipmentType: 'Електронна книга',
    specs: '7.8" E Ink Kaleido™ 3 кольоровий екран, аудіоплеєр, водозахист IPX8',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/pocketbook_era_color.jpg',
    description: 'Читайте книги та комікси в кольорі з захистом від води.'
  },

  // --- Ігрові приставки ---
  {
    id: 'equip_console_ps5',
    title: 'Ігрова консоль Sony PlayStation 5',
    equipmentType: 'Ігрова консоль',
    specs: 'SSD 825GB, підтримка 4K/120fps, DualSense контролер',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/ps5.jpg',
    description: 'Пориньте у світ ігор нового покоління з неймовірною графікою та швидкістю.'
  },
  {
    id: 'equip_console_xbox_series_x',
    title: 'Ігрова консоль Microsoft Xbox Series X',
    equipmentType: 'Ігрова консоль',
    specs: 'SSD 1TB, підтримка 4K/120fps, Xbox Wireless Controller',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/xbox_series_x.jpg',
    description: 'Найпотужніша консоль Xbox для неперевершеного ігрового досвіду.'
  },
  {
    id: 'equip_console_nintendo_switch_oled',
    title: 'Ігрова консоль Nintendo Switch (OLED Model)',
    equipmentType: 'Портативна консоль',
    specs: '7-дюймовий OLED екран, 64GB внутрішньої пам’яті, гібридний режим',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/nintendo_switch_oled.jpg',
    description: 'Грайте улюблені ігри вдома на телевізорі або в дорозі завдяки гібридному дизайну.'
  },

  // --- VR/AR окуляри ---
  {
    id: 'equip_vr_quest3',
    title: 'VR/MR Окуляри Meta Quest 3',
    equipmentType: 'VR/MR Окуляри',
    specs: 'Змішана реальність, 128GB, контролери Touch Plus',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/meta_quest3.jpg',
    description: 'Відкрийте для себе нові світи у віртуальній та змішаній реальності.'
  },
  {
    id: 'equip_vr_psvr2',
    title: 'VR Шолом Sony PlayStation VR2',
    equipmentType: 'VR Шолом',
    specs: 'Для PlayStation 5, OLED дисплеї, відстеження погляду, контролери Sense',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/ps_vr2.jpg',
    description: 'Занурення у віртуальну реальність нового рівня для власників PS5.'
  },

  // --- Проектори та аудіо ---
  {
    id: 'equip_projector_epson_efh06',
    title: 'Проектор Epson EB-FH06',
    equipmentType: 'Проектор',
    specs: 'Full HD (1920x1080), 3500 люмен, 3LCD, HDMI, Wi-Fi',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/epson_projector.jpg', // Ти вже мав схожий, можна оновити
    description: 'Яскравий та чіткий проектор для домашнього кінотеатру або презентацій.'
  },
  {
    id: 'equip_headphones_sony_xm5',
    title: 'Навушники Sony WH-1000XM5',
    equipmentType: 'Навушники',
    specs: 'Бездротові, з активним шумозаглушенням, до 30 годин роботи, Bluetooth',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/sony_wh1000xm5.jpg', // Ти вже мав схожі
    description: 'Лідер ринку навушників з шумозаглушенням для ідеального звуку.'
  },
  {
    id: 'equip_speaker_jbl_charge5',
    title: 'Портативна колонка JBL Charge 5',
    equipmentType: 'Портативна колонка',
    specs: 'Bluetooth, водонепроникна IP67, до 20 годин роботи, функція Powerbank',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/jbl_charge5.jpg',
    description: 'Потужний звук та тривала робота для вечірок будь-де.'
  },

  // --- Побутова та спеціалізована техніка (рідкісного використання) ---
  {
    id: 'equip_sewing_machine_brother',
    title: 'Швейна машинка Brother FS40',
    equipmentType: 'Швейна машинка',
    specs: 'Електронна, 40 швейних операцій, LCD дисплей, автоматична заправка нитки',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/brother_sewing_machine.jpg',
    description: 'Надійна та функціональна швейна машинка для домашнього використання та хобі.'
  },
  {
    id: 'equip_3d_printer_creality',
    title: '3D Принтер Creality Ender 3 V2',
    equipmentType: '3D Принтер',
    specs: 'Область друку 220x220x250мм, тиха материнська плата, скляна платформа',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/creality_ender3_v2.jpg',
    description: 'Популярний 3D принтер для ентузіастів та створення прототипів.'
  },
  {
    id: 'equip_telescope_celestron',
    title: 'Телескоп Celestron AstroMaster 70AZ',
    equipmentType: 'Телескоп',
    specs: 'Рефрактор, діаметр об\'єктива 70 мм, азимутальне монтування, для початківців',
    availabilityStatus: 'rented',
    imageUrl: '/images/equipment/celestron_telescope.jpg',
    description: 'Відкрийте для себе красу нічного неба з цим простим у використанні телескопом.'
  },
  {
    id: 'equip_graphics_tablet_wacom',
    title: 'Графічний планшет Wacom Intuos S',
    equipmentType: 'Графічний планшет',
    specs: 'Робоча область 152x95 мм, 4096 рівнів натиску, перо без батареї',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/wacom_intuos_s.jpg',
    description: 'Ідеальний інструмент для цифрового малювання та ретуші фотографій.'
  },
  {
    id: 'equip_soldering_station_yihua',
    title: 'Паяльна станція YIHUA 936',
    equipmentType: 'Паяльна станція',
    specs: 'Регулювання температури 200-480°C, антистатичний захист',
    availabilityStatus: 'available',
    imageUrl: '/images/equipment/yihua_soldering_station.jpg',
    description: 'Для радіоаматорів та ремонту електроніки в домашніх умовах.'
  }
];