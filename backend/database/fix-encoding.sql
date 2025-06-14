-- Скрипт для исправления кодировки в базе данных Тез Кызмат
-- Выполните этот скрипт если у вас проблемы с отображением кириллицы

USE tez_kyzmat;

-- Изменяем кодировку базы данных
ALTER DATABASE tez_kyzmat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Изменяем кодировку таблиц и колонок
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE services CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE verification_codes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Специально для текстовых полей с кириллицей
ALTER TABLE users 
  MODIFY COLUMN name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE services 
  MODIFY COLUMN name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN owner_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN location_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN district_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN price VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Проверяем кодировку
SELECT 
  TABLE_SCHEMA,
  TABLE_NAME,
  COLUMN_NAME,
  CHARACTER_SET_NAME,
  COLLATION_NAME
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'tez_kyzmat' 
  AND CHARACTER_SET_NAME IS NOT NULL
ORDER BY TABLE_NAME, COLUMN_NAME;

-- Если данные уже испорчены, можно попробовать исправить их:
-- ВНИМАНИЕ: Сделайте резервную копию перед выполнением!

-- Пример исправления для таблицы services:
-- UPDATE services SET 
--   name = CONVERT(CAST(CONVERT(name USING latin1) AS BINARY) USING utf8mb4),
--   description = CONVERT(CAST(CONVERT(description USING latin1) AS BINARY) USING utf8mb4),
--   owner_name = CONVERT(CAST(CONVERT(owner_name USING latin1) AS BINARY) USING utf8mb4),
--   location_name = CONVERT(CAST(CONVERT(location_name USING latin1) AS BINARY) USING utf8mb4),
--   district_name = CONVERT(CAST(CONVERT(district_name USING latin1) AS BINARY) USING utf8mb4),
--   price = CONVERT(CAST(CONVERT(price USING latin1) AS BINARY) USING utf8mb4);

-- Проверяем результат
SELECT name, description, owner_name FROM services LIMIT 5; 