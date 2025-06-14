-- Создание базы данных
CREATE DATABASE IF NOT EXISTS tez_kyzmat 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE tez_kyzmat;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица для кодов верификации SMS
CREATE TABLE IF NOT EXISTS verification_codes (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone_code (phone, code),
  INDEX idx_expires_at (expires_at)
);

-- Таблица объявлений/сервисов
CREATE TABLE IF NOT EXISTS services (
  _id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category ENUM('unloading', 'tractors', 'trucks', 'concrete', 'water') NOT NULL,
  description TEXT NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  location VARCHAR(50) NOT NULL,
  location_name VARCHAR(255) NOT NULL,
  district VARCHAR(50) NULL,
  district_name VARCHAR(255) NULL,
  price VARCHAR(255) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  images JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  owner_id VARCHAR(36) NULL,
  
  -- Индексы для быстрого поиска
  INDEX idx_category (category),
  INDEX idx_location (location),
  INDEX idx_district (district),
  INDEX idx_available (available),
  INDEX idx_created_at (created_at),
  INDEX idx_owner_id (owner_id),
  
  -- Внешний ключ
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Создание первого администратора (опционально)
INSERT IGNORE INTO users (id, phone, name, is_admin, created_at, updated_at) 
VALUES (
  UUID(), 
  '+996700000000', 
  'Администратор', 
  TRUE, 
  NOW(), 
  NOW()
);

-- Примеры тестовых данных (опционально для разработки)
INSERT IGNORE INTO services (_id, name, category, description, owner_name, contact, whatsapp, location, location_name, price, available, created_at, updated_at) 
VALUES 
(UUID(), 'МТЗ-80 Трактор', 'tractors', 'Опытный тракторист с собственной техникой. Выполняю пахоту, культивацию, посев.', 'Талант Жуманов', '+996701234567', '+996701234567', 'chui', 'Чүй областы', '1500 сом/час', TRUE, NOW(), NOW()),
(UUID(), 'КамАЗ 5511 Самосвал', 'trucks', 'Грузоперевозки сыпучих материалов. КамАЗ в отличном состоянии.', 'Азамат Токтосунов', '+996702345678', '+996702345678', 'bishkek', 'Бишкек шаары', '2000 сом/час', TRUE, NOW(), NOW()),
(UUID(), 'Бетономешалка 150л', 'concrete', 'Аренда бетономешалки для небольших строительных работ.', 'Мирлан Касымов', '+996703456789', '+996703456789', 'osh', 'Ош шаары', '800 сом/день', TRUE, NOW(), NOW()); 