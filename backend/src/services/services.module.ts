import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { FileUploadService } from "./file-upload.service";
import { Service } from "./entities/service.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Service]), ConfigModule, UsersModule],
  controllers: [ServicesController],
  providers: [ServicesService, FileUploadService],
  exports: [ServicesService],
})
export class ServicesModule {}
