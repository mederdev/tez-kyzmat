# 🗄️ Настройка базы данных для Тез Кызмат

## Быстрый старт

### 1. Установка MySQL

#### macOS:

```bash
brew install mysql
brew services start mysql
```

#### Ubuntu/Debian:

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### Windows:

Скачайте MySQL с официального сайта: https://dev.mysql.com/downloads/installer/

### 2. Создание базы данных

#### Автоматически (рекомендуется):

```bash
# Войдите в MySQL
mysql -u root -p

# Выполните скрипт инициализации
source database/init.sql
```

#### Вручную:

```sql
-- Создайте базу данных
CREATE DATABASE tez_kyzmat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Создайте пользователя (опционально)
CREATE USER 'tez_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON tez_kyzmat.* TO 'tez_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Настройка .env файла

Скопируйте `env.example` в `.env` и заполните настройки:

```bash
cp env.example .env
```

Минимально необходимые настройки:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tez_kyzmat
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_key_here
```

### 4. Запуск приложения

```bash
# Установите зависимости
npm install

# Запустите в режиме разработки
npm run start:dev
```

## Схема базы данных

### Таблицы:

1. **`users`** - Пользователи системы

   - `id` - Уникальный идентификатор (UUID)
   - `phone` - Номер телефона (уникальный)
   - `name` - Имя пользователя
   - `is_admin` - Флаг администратора

2. **`services`** - Объявления о технике

   - `_id` - Уникальный идентификатор (UUID)
   - `name` - Название техники
   - `category` - Категория (enum)
   - `description` - Описание
   - `owner_name` - Имя владельца
   - `contact` - Контактный телефон
   - `whatsapp` - WhatsApp
   - `location` - ID региона
   - `location_name` - Название региона
   - `district` - ID района (опционально)
   - `district_name` - Название района (опционально)
   - `price` - Цена
   - `available` - Доступность
   - `images` - Массив URL изображений (JSON)
   - `owner_id` - ID владельца (связь с users)

3. **`verification_codes`** - Коды верификации SMS
   - `id` - Уникальный идентификатор (UUID)
   - `phone` - Номер телефона
   - `code` - 6-значный код
   - `expires_at` - Время истечения
   - `used` - Флаг использования

### Индексы для оптимизации:

- `idx_category` - Быстрый поиск по категории
- `idx_location` - Поиск по региону
- `idx_district` - Поиск по району
- `idx_available` - Фильтр по доступности
- `idx_created_at` - Сортировка по дате
- `idx_phone_code` - Верификация SMS кодов

## Миграции и синхронизация

### Режим разработки:

В режиме разработки TypeORM автоматически создает и обновляет таблицы:

```typescript
synchronize: configService.get("NODE_ENV") === "development";
```

### Продакшн:

В продакшне используйте миграции:

```bash
# Генерация миграции
npm run typeorm migration:generate -- -n CreateInitialTables

# Выполнение миграций
npm run typeorm migration:run
```

## Резервное копирование

### Создание бэкапа:

```bash
mysqldump -u root -p tez_kyzmat > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Восстановление:

```bash
mysql -u root -p tez_kyzmat < backup_20240101_120000.sql
```

## Мониторинг производительности

### Полезные запросы:

```sql
-- Статистика по объявлениям
SELECT category, COUNT(*) as count
FROM services
GROUP BY category;

-- Активные пользователи за месяц
SELECT COUNT(DISTINCT owner_id) as active_users
FROM services
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- Самые популярные регионы
SELECT location_name, COUNT(*) as count
FROM services
GROUP BY location_name
ORDER BY count DESC
LIMIT 10;
```

### Оптимизация запросов:

```sql
-- Анализ медленных запросов
SHOW PROCESSLIST;

-- Просмотр использования индексов
EXPLAIN SELECT * FROM services WHERE category = 'tractors' AND location = 'bishkek';
```

## Troubleshooting

### Частые проблемы:

1. **Ошибка подключения к БД:**

   ```
   Error: connect ECONNREFUSED 127.0.0.1:3306
   ```

   - Проверьте, запущен ли MySQL: `brew services list` или `systemctl status mysql`
   - Проверьте настройки в .env файле

2. **Ошибка аутентификации:**

   ```
   Error: Access denied for user 'root'@'localhost'
   ```

   - Сбросьте пароль root: `sudo mysql_secure_installation`
   - Создайте нового пользователя с правами

3. **Ошибка кодировки:**
   ```
   Error: Incorrect string value
   ```
   - Убедитесь, что БД создана с utf8mb4:
   ```sql
   ALTER DATABASE tez_kyzmat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Полезные команды:

```bash
# Проверка состояния MySQL
mysql -u root -p -e "SELECT VERSION();"

# Просмотр баз данных
mysql -u root -p -e "SHOW DATABASES;"

# Просмотр таблиц
mysql -u root -p tez_kyzmat -e "SHOW TABLES;"

# Проверка размера БД
mysql -u root -p -e "SELECT table_schema 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size (MB)' FROM information_schema.tables WHERE table_schema = 'tez_kyzmat';"
```
