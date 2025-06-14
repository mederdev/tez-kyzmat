# Тез Кызмат - Backend API

Бэкенд API для платформы поиска сельскохозяйственной и строительной техники в Кыргызстане.

## Технологии

- **NestJS** - Node.js фреймворк
- **Fastify** - HTTP сервер
- **TypeORM** - ORM для работы с базой данных
- **MySQL** - База данных
- **JWT** - Аутентификация
- **TypeScript** - Типизированный JavaScript

## Установка

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

## Переменные окружения

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

# SMS API
SMS_API_KEY=your_sms_api_key
SMS_SENDER=TezKyzmat
SMS_API_URL=https://api.nikita.kg/sms/send

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

## Запуск

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

## API Эндпоинты

### Аутентификация

- `POST /api/auth/send-code` - Отправка SMS кода
- `POST /api/auth/verify-login` - Вход по SMS коду
- `POST /api/auth/verify-register` - Регистрация по SMS коду

### Объявления

- `GET /api/services` - Получение всех объявлений (с фильтрацией)
- `GET /api/services/:id` - Получение объявления по ID
- `POST /api/services` - Создание объявления (требует аутентификации)
- `PATCH /api/services/:id` - Обновление объявления
- `DELETE /api/services/:id` - Удаление объявления
- `GET /api/services/my` - Мои объявления
- `GET /api/services/stats` - Статистика (только для админов)

### Справочники

- `GET /api/locations` - Список регионов
- `GET /api/districts` - Список районов
- `GET /api/categories` - Список категорий

## Примеры запросов

### Отправка SMS кода

```bash
curl -X POST http://localhost:3001/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"phone": "+996700123456", "method": "phone"}'
```

### Создание объявления

```bash
curl -X POST http://localhost:3001/api/services \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=КамАЗ самосвал" \
  -F "category=trucks" \
  -F "description=Грузоперевозки по городу" \
  -F "ownerName=Азамат Токтосунов" \
  -F "contact=+996700123456" \
  -F "whatsapp=+996700123456" \
  -F "location=bishkek" \
  -F "locationName=Бишкек шаары" \
  -F "price=1000 сом/час" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg"
```

### Поиск объявлений

```bash
curl "http://localhost:3001/api/services?category=tractors&location=chui&search=МТЗ"
```

## Структура проекта

```
src/
├── auth/                 # Модуль аутентификации
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # Сущности базы данных
│   ├── guards/          # Guards для авторизации
│   └── strategies/      # Стратегии Passport
├── common/              # Общие модули
│   ├── constants/       # Константы
│   └── decorators/      # Декораторы
├── services/            # Модуль объявлений
│   ├── dto/
│   └── entities/
├── users/               # Модуль пользователей
│   └── entities/
└── uploads/             # Загруженные файлы
```

## Разработка

### Добавление нового эндпоинта

1. Создайте DTO для валидации данных
2. Добавьте метод в сервис
3. Добавьте маршрут в контроллер
4. Добавьте необходимые guards для авторизации

### Загрузка файлов

Файлы загружаются через multipart/form-data и сохраняются в папке `uploads/services/`. Поддерживаются форматы: JPG, PNG, WebP. Максимальный размер файла: 5MB.

## Безопасность

- JWT токены для аутентификации
- Rate limiting для предотвращения спама
- Валидация всех входящих данных
- Проверка прав доступа для операций CRUD

## Мониторинг

В режиме разработки все SMS коды выводятся в консоль. В продакшне используйте реальный SMS API.

## Лицензия

MIT
