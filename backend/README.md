# Rural Rig Finder Backend

Backend API для платформы поиска сельскохозяйственной техники в Кыргызстане.

## 🚀 Технологии

- **NestJS** - Node.js фреймворк
- **MongoDB** - NoSQL база данных
- **Mongoose** - ODM для MongoDB
- **TypeScript** - Типизированный JavaScript
- **Class Validator** - Валидация данных

## 📋 Требования

- Node.js 18+
- MongoDB 5.0+
- npm или yarn

## 🛠 Установка

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd rural-rig-finder-backend
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env`:

```bash
MONGODB_URI=mongodb://localhost:27017/rural-rig-finder
PORT=3001
NODE_ENV=development
```

4. Запустите MongoDB (если локально):

```bash
mongod
```

## 🚀 Запуск

### Режим разработки

```bash
npm run start:dev
```

### Продакшн

```bash
npm run build
npm run start:prod
```

## 🌱 Заполнение базы данных

Для заполнения базы данных тестовыми данными:

```bash
npm run seed
```

## 📚 API Endpoints

### Сервисы

- `GET /api/services` - Получить все сервисы
- `GET /api/services/:id` - Получить сервис по ID
- `POST /api/services` - Создать новый сервис
- `PATCH /api/services/:id` - Обновить сервис
- `DELETE /api/services/:id` - Удалить сервис
- `GET /api/services/stats` - Получить статистику

### Параметры фильтрации для GET /api/services

- `category` - Фильтр по категории (unloading, tractors, trucks, concrete, water)
- `location` - Фильтр по локации (bishkek, osh, chui, etc.)
- `district` - Фильтр по району
- `available` - Фильтр по доступности (true/false)
- `search` - Поиск по названию, описанию или имени владельца

### Пример запроса

```bash
GET /api/services?category=tractors&location=bishkek&available=true&search=культиватор
```

## 🏗 Структура проекта

```
src/
├── database/           # Скрипты для работы с БД
│   └── seed.ts        # Заполнение тестовыми данными
├── services/          # Модуль сервисов
│   ├── dto/           # Data Transfer Objects
│   ├── service.schema.ts  # Mongoose схема
│   ├── services.controller.ts  # REST контроллер
│   ├── services.service.ts     # Бизнес логика
│   └── services.module.ts      # NestJS модуль
├── app.controller.ts  # Главный контроллер
├── app.module.ts      # Главный модуль
├── app.service.ts     # Главный сервис
└── main.ts           # Точка входа
```

## 🧪 Тестирование

```bash
# Юнит тесты
npm run test

# E2E тесты
npm run test:e2e

# Покрытие тестами
npm run test:cov
```

## 📝 Примеры использования

### Создание нового сервиса

```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Трактор МТЗ-80",
    "category": "tractors",
    "description": "Универсальный трактор для полевых работ",
    "ownerName": "Иван Иванов",
    "contact": "+996555123456",
    "whatsapp": "+996555123456",
    "location": "bishkek",
    "locationName": "Бишкек шаары",
    "price": "2000 сом/день",
    "available": true
  }'
```

### Получение всех сервисов

```bash
curl http://localhost:3001/api/services
```

### Фильтрация сервисов

```bash
curl "http://localhost:3001/api/services?category=tractors&location=bishkek"
```

## 🔧 Конфигурация

Все настройки находятся в файле `.env`:

- `MONGODB_URI` - Строка подключения к MongoDB
- `PORT` - Порт для запуска сервера
- `NODE_ENV` - Окружение (development/production)

## 📄 Лицензия

Этот проект лицензирован под MIT License.
