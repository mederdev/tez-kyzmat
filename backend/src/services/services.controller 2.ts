import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// Конфигурация для сохранения файлов
const storage = diskStorage({
  destination: "./uploads/services",
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor("images", 5, {
      storage,
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error("Только изображения разрешены!"), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    })
  )
  async create(
    @Request() req,
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    // Добавляем пути к загруженным файлам
    const imageUrls =
      files?.map((file) => `/uploads/services/${file.filename}`) || [];

    const serviceData = {
      ...createServiceDto,
      images: imageUrls,
      ownerId: req.user.id,
    };

    return {
      success: true,
      message: "Сервис успешно создан",
      data: await this.servicesService.create(serviceData),
    };
  }

  @Get()
  async findAll(@Query() query: any) {
    return {
      success: true,
      data: await this.servicesService.findAll(query),
    };
  }

  @Get("stats")
  async getStats() {
    return {
      success: true,
      data: await this.servicesService.getStats(),
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return {
      success: true,
      data: await this.servicesService.findOne(id),
    };
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor("images", 5, {
      storage,
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error("Только изображения разрешены!"), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    })
  )
  async update(
    @Request() req,
    @Param("id") id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    const service = await this.servicesService.findOne(id);
    if (service.ownerId !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized to update this service');
    }

    let updateData = { ...updateServiceDto };

    // Если загружены новые файлы, добавляем их
    if (files && files.length > 0) {
      const newImageUrls = files.map(
        (file) => `/uploads/services/${file.filename}`
      );
      updateData.images = newImageUrls;
    }

    return {
      success: true,
      message: "Сервис успешно обновлен",
      data: await this.servicesService.update(id, updateData),
    };
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req, @Param("id") id: string) {
    const service = await this.servicesService.findOne(id);
    if (service.ownerId !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized to delete this service');
    }
    await this.servicesService.remove(id);
    return {
      success: true,
      message: "Сервис успешно удален",
    };
  }

  @Get('user/my-services')
  @UseGuards(JwtAuthGuard)
  findUserServices(@Request() req) {
    return this.servicesService.findByOwnerId(req.user.id);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAllForAdmin() {
    return this.servicesService.findAllWithOwners();
  }
}
