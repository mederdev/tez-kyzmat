import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    })
  );

  const configService = app.get(ConfigService);

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Глобальный фильтр ошибок
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS
  app.enableCors({
    origin: configService.get("CORS_ORIGIN") || "http://localhost:3000",
    credentials: true,
  });

  // Глобальный префикс для API
  app.setGlobalPrefix("api");

  // Регистрация multipart для загрузки файлов
  await app.register(require("@fastify/multipart"), {
    limits: {
      fieldNameSize: 100,
      fieldSize: 100,
      fields: 10,
      fileSize: 5 * 1024 * 1024, // 5MB
      files: 5,
      headerPairs: 2000,
    },
  });

  // Статические файлы
  await app.register(require("@fastify/static"), {
    root: process.cwd() + "/uploads",
    prefix: "/uploads/",
  });

  // Настройка Swagger документации
  const config = new DocumentBuilder()
    .setTitle("Тез Кызмат API")
    .setDescription(
      `
      API для платформы поиска сельскохозяйственной и строительной техники в Кыргызстане.
      
      ## Особенности:
      - 🔐 SMS аутентификация через JWT токены
      - 📱 Поддержка всех регионов Кыргызстана
      - 🚜 5 категорий техники (тракторы, КамАЗы, бетономешалки и др.)
      - 📸 Загрузка до 5 изображений на объявление
      - 🔍 Мощная система фильтрации и поиска
      
      ## Аутентификация:
      Для работы с защищенными эндпоинтами используйте Bearer токен в заголовке Authorization.
      
      ## SMS коды:
      В режиме разработки SMS коды выводятся в консоль сервера.
    `
    )
    .setVersion("1.0.0")
    .setContact(
      "Тез Кызмат Support",
      "https://tez-kyzmat.kg",
      "support@tez-kyzmat.kg"
    )
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .addServer("http://localhost:3001", "Development Server")
    .addServer("https://api.tez-kyzmat.kg", "Production Server")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description:
          "Введите JWT токен (получите его через /auth/verify-login или /auth/verify-register)",
        in: "header",
      },
      "JWT-auth"
    )
    .addTag("auth", "Аутентификация через SMS")
    .addTag("services", "Объявления о технике")
    .addTag("common", "Справочники и константы")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
    customSiteTitle: "Тез Кызмат API Docs",
    customfavIcon: "/favicon.ico",
    customCssUrl: "/swagger-ui-custom.css",
  });

  const port = configService.get("PORT") || 3001;
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Сервер запущен на порту ${port}`);
  console.log(`📖 Swagger документация: http://localhost:${port}/docs`);
  console.log(`🔗 API эндпоинты: http://localhost:${port}/api`);
}

bootstrap();
