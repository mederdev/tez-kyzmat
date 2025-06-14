# Тез Кызмат - Backend API

Бэкенд API для платформы поиска сельскохозяйственной и строительной техники в Кыргызстане.

## 🚀 Технологии

- **NestJS** - Node.js фреймворк
- **Fastify** - HTTP сервер (быстрее Express)
- **TypeORM** - ORM для работы с базой данных
- **MySQL** - База данных
- **JWT** - Аутентификация
- **Swagger** - API документация
- **TypeScript** - Типизированный JavaScript

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd backend
```

2. Установите зависимости:

```bash
npm install
```

3. Настройте базу данных:

   - Создайте базу данных MySQL с именем `tez_kyzmat`
   - Скопируйте `.env.example` в `.env` и заполните переменные

4. Запустите миграции (автоматически создадутся таблицы в dev режиме):

```bash
npm run start:dev
```

## ⚙️ Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tez_kyzmat
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d

# SMS API (Nikita.kg)
SMS_LOGIN=your_nikita_login
SMS_PASSWORD=your_nikita_password
SMS_SENDER=TezKyzmat
SMS_API_URL=https://smspro.nikita.kg/api/message

# Файлы
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Сервер
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

## 🏃‍♂️ Запуск

### Режим разработки

```bash
npm run start:dev
```

### Режим отладки

```bash
npm run start:debug
```

### Продакшн

```bash
npm run build
npm run start
```

## 📖 API Документация

После запуска сервера документация Swagger доступна по адресу:

- **Swagger UI**: http://localhost:3001/docs
- **API эндпоинты**: http://localhost:3001/api

## 📱 SMS Интеграция (Nikita.kg)

### Настройка SMS API

1. **Регистрация в Nikita.kg:**

   - Перейдите на https://nikita.kg/
   - Зарегистрируйтесь как партнер
   - Получите логин и пароль для SMS API

2. **Настройка переменных окружения:**

   ```env
   SMS_LOGIN=your_nikita_login
   SMS_PASSWORD=your_nikita_password
   SMS_SENDER=TezKyzmat
   ```

3. **Особенности API:**
   - Использует XML формат запросов
   - Поддерживает до 50 номеров в одном запросе
   - Максимальная длина SMS: 800 символов
   - Кириллица: 70 символов на SMS
   - Латиница: 160 символов на SMS

### Тестирование SMS

В режиме разработки (`NODE_ENV=development`) SMS коды выводятся в консоль:

```bash
[SmsService] 📱 SMS код для +996700123456: 123456
```

В продакшне SMS отправляются реально через API Nikita.kg.

### Поддерживаемые операторы

- **Beeline** (996700, 996770, 996220)
- **Megacom** (996550, 996555, 996559)
- **O!** (996500, 996501, 996502, 996503, 996504, 996505, 996506, 996507, 996508, 996509)
- **Nurtel** (996540)

## 🔗 API Эндпоинты

### Аутентификация

- `POST /api/auth/send-code` - Отправка SMS кода
- `POST /api/auth/verify-login` - Вход по SMS коду
- `POST /api/auth/verify-register` - Регистрация по SMS коду

### Объявления

- `GET /api/services` - Список объявлений (с фильтрацией)
- `POST /api/services` - Создание объявления (требует авторизации)
- `GET /api/services/:id` - Получение объявления по ID
- `PATCH /api/services/:id` - Обновление объявления
- `DELETE /api/services/:id` - Удаление объявления
- `GET /api/services/my` - Мои объявления
- `GET /api/services/stats` - Статистика (только для админов)

### Справочники

- `GET /api/common/categories` - Категории техники
- `GET /api/common/locations` - Регионы и районы
- `GET /api/common/districts/:location` - Районы региона

## 🗄️ База данных

### Структура таблиц:

1. **`users`** - Пользователи
2. **`services`** - Объявления о технике
3. **`verification_codes`** - SMS коды верификации

### Настройка MySQL:

```bash
# Создание базы данных
mysql -u root -p
CREATE DATABASE tez_kyzmat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Или используйте готовый скрипт
mysql -u root -p < database/init.sql
```

### Docker:

```bash
# Запуск MySQL в Docker
docker-compose up -d mysql

# Доступ к phpMyAdmin
open http://localhost:8080
```

## 🔧 Исправление проблем

### Проблемы с кодировкой

Если видите символы вида `ÐœÐ¢Ð—-80` вместо кириллицы:

```bash
# Выполните скрипт исправления
mysql -u root -p < database/fix-encoding.sql
```

Подробнее: [database/ENCODING_FIX.md](database/ENCODING_FIX.md)

### Проблемы с SMS

1. **SMS коды не приходят:**

   - Проверьте настройки `SMS_LOGIN` и `SMS_PASSWORD`
   - Убедитесь что у вас есть баланс в Nikita.kg
   - Проверьте логи сервера

2. **Ошибка "SMS_LOGIN не настроен":**
   - Добавьте переменные в `.env` файл
   - Перезапустите сервер

## 🚀 Деплой

### Подготовка к продакшну:

1. **Настройте переменные окружения:**

   ```env
   NODE_ENV=production
   DB_HOST=your_production_db_host
   JWT_SECRET=your_very_secure_key
   SMS_LOGIN=your_real_nikita_login
   SMS_PASSWORD=your_real_nikita_password
   ```

2. **Соберите проект:**

   ```bash
   npm run build
   ```

3. **Запустите:**
   ```bash
   npm run start
   ```

### Docker деплой:

```bash
# Сборка образа
docker build -t tez-kyzmat-backend .

# Запуск с docker-compose
docker-compose up -d
```

## 🧪 Тестирование

```bash
# Запуск тестов (когда будут добавлены)
npm test

# Проверка типов TypeScript
npx tsc --noEmit

# Линтинг кода
npx eslint src/
```

## 📊 Мониторинг

### Логи

Все важные события логируются:

- SMS отправка
- Ошибки аутентификации
- Создание/обновление объявлений
- Ошибки базы данных

### Метрики

- Rate limiting настроен на 100 запросов в минуту
- Таймауты для внешних API: 10 секунд
- Максимальный размер файла: 5MB

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Сделайте коммит изменений
4. Отправьте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

- Email: support@tez-kyzmat.kg
- Telegram: @tez_kyzmat_support
- Документация: http://localhost:3001/docs
