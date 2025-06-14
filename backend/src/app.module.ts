import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ServicesModule } from "./services/services.module";
import { CommonModule } from "./common/common.module";

import { User } from "./users/entities/user.entity";
import { Service } from "./services/entities/service.entity";
import { VerificationCode } from "./auth/entities/verification-code.entity";

@Module({
  imports: [
    // Конфигурация
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // База данных
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Service, VerificationCode],
        synchronize: configService.get("NODE_ENV") === "development",
        logging: configService.get("NODE_ENV") === "development",
        charset: "utf8mb4",
        extra: {
          charset: "utf8mb4_unicode_ci",
        },
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: +configService.get("THROTTLE_TTL") || 60000,
          limit: +configService.get("THROTTLE_LIMIT") || 100,
        },
      ],
      inject: [ConfigService],
    }),

    // Модули приложения
    CommonModule,
    AuthModule,
    UsersModule,
    ServicesModule,
  ],
})
export class AppModule {}
