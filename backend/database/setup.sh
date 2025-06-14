#!/bin/bash

# 🚀 Скрипт автоматической настройки базы данных для Тез Кызмат

echo "🗄️ Настройка базы данных Тез Кызмат..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода ошибок
error() {
    echo -e "${RED}❌ Ошибка: $1${NC}"
    exit 1
}

# Функция для вывода успешных сообщений
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Функция для вывода предупреждений
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Проверка наличия MySQL
if ! command -v mysql &> /dev/null; then
    error "MySQL не установлен. Установите MySQL и повторите попытку."
fi

# Запрос параметров подключения
echo "📝 Введите параметры подключения к MySQL:"
read -p "Хост (по умолчанию localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Порт (по умолчанию 3306): " DB_PORT
DB_PORT=${DB_PORT:-3306}

read -p "Имя пользователя (по умолчанию root): " DB_USER
DB_USER=${DB_USER:-root}

read -s -p "Пароль: " DB_PASSWORD
echo

read -p "Имя базы данных (по умолчанию tez_kyzmat): " DB_NAME
DB_NAME=${DB_NAME:-tez_kyzmat}

# Проверка подключения к MySQL
echo "🔍 Проверка подключения к MySQL..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" &> /dev/null
if [ $? -ne 0 ]; then
    error "Не удалось подключиться к MySQL. Проверьте параметры подключения."
fi

success "Подключение к MySQL успешно"

# Создание базы данных
echo "🏗️ Создание базы данных $DB_NAME..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null
if [ $? -eq 0 ]; then
    success "База данных $DB_NAME создана"
else
    warning "База данных $DB_NAME уже существует"
fi

# Выполнение SQL скрипта инициализации
echo "📊 Выполнение скрипта инициализации..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$(dirname "$0")/init.sql"
if [ $? -eq 0 ]; then
    success "Скрипт инициализации выполнен успешно"
else
    error "Ошибка выполнения скрипта инициализации"
fi

# Создание .env файла
echo "⚙️ Создание .env файла..."
if [ -f "../.env" ]; then
    warning "Файл .env уже существует. Создаю backup..."
    cp "../.env" "../.env.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Генерация случайного JWT секрета
JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || date +%s | sha256sum | base64 | head -c 32)

cat > "../.env" << EOF
# База данных
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASSWORD

# JWT
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=30d

# SMS API (настройте для продакшена)
SMS_API_KEY=your_sms_api_key_here
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
EOF

success "Файл .env создан"

# Создание папки uploads
echo "📁 Создание папки для загрузок..."
mkdir -p "../uploads/services"
touch "../uploads/.gitkeep"
success "Папка uploads создана"

# Проверка структуры таблиц
echo "🔍 Проверка созданных таблиц..."
TABLES=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SHOW TABLES;" -s)
echo "Созданные таблицы:"
echo "$TABLES"

# Финальные инструкции
echo
echo "🎉 Настройка завершена успешно!"
echo
echo "📋 Следующие шаги:"
echo "1. Настройте SMS API в .env файле"
echo "2. Установите зависимости: npm install"
echo "3. Запустите приложение: npm run start:dev"
echo
echo "📊 Полезные команды:"
echo "• Проверка БД: mysql -u $DB_USER -p $DB_NAME"
echo "• Просмотр таблиц: mysql -u $DB_USER -p $DB_NAME -e 'SHOW TABLES;'"
echo "• Статистика: mysql -u $DB_USER -p $DB_NAME -e 'SELECT COUNT(*) FROM services;'"
echo
success "База данных готова к работе!" 