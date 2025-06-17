import { DataSource } from "typeorm";
import { config } from "dotenv";
import { seedServices } from "../scripts/seed-services";
import { User } from "../users/entities/user.entity";
import { Service } from "../services/entities/service.entity";
import { VerificationCode } from "../auth/entities/verification-code.entity";

// Load environment variables
config({ path: ".env.local" });

async function seed() {
  const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Service, VerificationCode],
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    charset: "utf8mb4",
    extra: {
      charset: "utf8mb4_unicode_ci",
    },
  });

  try {
    await dataSource.initialize();
    console.log("Database connection established");

    await seedServices(dataSource);
    
    await dataSource.destroy();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed(); 