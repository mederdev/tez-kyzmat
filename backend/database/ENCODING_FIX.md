# 🔤 Исправление проблем с кодировкой

Если вы видите символы вида `ÐœÐ¢Ð—-80 Ð¢Ñ€Ð°ÐºÑ‚Ð¾Ñ€` вместо кириллицы, это проблема с кодировкой UTF-8.

## Быстрое исправление

### 1. Остановите сервер

```bash
# Остановите NestJS сервер если он запущен
pkill -f "ts-node\|nodemon"
```

### 2. Исправьте кодировку в базе данных

```bash
# Войдите в MySQL
mysql -u root -p

# Выполните скрипт исправления
source database/fix-encoding.sql
```

### 3. Перезапустите сервер

```bash
npm run start:dev
```

## Подробное решение

### Причины проблемы:

1. **База данных создана с неправильной кодировкой** (latin1 вместо utf8mb4)
2. **Соединение с БД не использует UTF-8**
3. **Данные были сохранены в неправильной кодировке**

### Проверка текущей кодировки:

```sql
-- Проверить кодировку базы данных
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'tez_kyzmat';

-- Проверить кодировку таблиц
SELECT TABLE_NAME, TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'tez_kyzmat';

-- Проверить кодировку колонок
SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'tez_kyzmat'
  AND CHARACTER_SET_NAME IS NOT NULL;
```

### Исправление кодировки:

#### Вариант 1: Автоматический скрипт

```bash
# Выполните готовый скрипт
mysql -u root -p < database/fix-encoding.sql
```

#### Вариант 2: Ручное исправление

```sql
-- 1. Изменить кодировку базы данных
ALTER DATABASE tez_kyzmat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Изменить кодировку таблиц
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE services CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE verification_codes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Специально для текстовых полей
ALTER TABLE services
  MODIFY COLUMN name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  MODIFY COLUMN owner_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Исправление испорченных данных:

Если данные уже сохранены с неправильной кодировкой:

```sql
-- ВНИМАНИЕ: Сделайте резервную копию!
mysqldump -u root -p tez_kyzmat > backup_before_encoding_fix.sql

-- Попробуйте исправить данные
UPDATE services SET
  name = CONVERT(CAST(CONVERT(name USING latin1) AS BINARY) USING utf8mb4),
  description = CONVERT(CAST(CONVERT(description USING latin1) AS BINARY) USING utf8mb4),
  owner_name = CONVERT(CAST(CONVERT(owner_name USING latin1) AS BINARY) USING utf8mb4)
WHERE name LIKE '%Ð%' OR description LIKE '%Ð%' OR owner_name LIKE '%Ð%';
```

### Настройки для предотвращения проблем:

#### 1. MySQL конфигурация (my.cnf):

```ini
[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init-connect = 'SET NAMES utf8mb4'
```

#### 2. Переменные окружения:

```env
# Добавьте в .env файл
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```

#### 3. TypeORM настройки (уже исправлено):

```typescript
// В app.module.ts
charset: "utf8mb4",
extra: {
  charset: "utf8mb4_unicode_ci",
}
```

### Проверка результата:

```sql
-- Проверьте что кодировка исправлена
SELECT name, description, owner_name
FROM services
WHERE name LIKE '%трактор%' OR description LIKE '%техника%'
LIMIT 5;
```

### Docker пользователи:

Если используете Docker:

```bash
# Пересоздайте контейнер с правильной кодировкой
docker-compose down
docker volume rm tez_kyzmat_mysql_data  # ВНИМАНИЕ: Удалит все данные!
docker-compose up -d mysql

# Или исправьте в существующем контейнере
docker-compose exec mysql mysql -u root -p -e "source /docker-entrypoint-initdb.d/fix-encoding.sql"
```

### Предотвращение в будущем:

1. **Всегда создавайте БД с utf8mb4**
2. **Проверяйте кодировку при создании таблиц**
3. **Используйте правильные настройки подключения**
4. **Тестируйте с кириллицей сразу**

### Полезные команды:

```bash
# Проверить кодировку в терминале
echo "Тест кириллицы" | hexdump -C

# Проверить кодировку файла
file -bi your_file.sql

# Конвертировать файл в UTF-8
iconv -f ISO-8859-1 -t UTF-8 input.sql > output.sql
```
