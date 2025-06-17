import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  ValidationPipe,
} from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiTooManyRequestsResponse,
} from "@nestjs/swagger";

import { ServicesService, ServiceFilters } from "./services.service";
import { CreateServiceDto, DISTRICTS } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServiceCategory } from "./entities/service.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminGuard } from "../auth/guards/admin.guard";
import { CurrentUser } from "../common/decorators/user.decorator";

@ApiTags("services")
@Controller("services")
@UseGuards(ThrottlerGuard)
@ApiTooManyRequestsResponse({ description: "Превышен лимит запросов" })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({
    summary: "Создание объявления",
    description:
      "Создает новое объявление о технике с возможностью загрузки до 5 изображений",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateServiceDto,
    description: "Данные объявления с возможностью прикрепления изображений",
  })
  @ApiResponse({
    status: 201,
    description: "Объявление успешно создано",
    schema: {
      example: {
        success: true,
        data: {
          _id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Трактор МТЗ-80",
          category: "tractors",
          description: "Трактор в отличном состоянии, готов к работе",
          ownerName: "Азамат Токтосунов",
          contact: "+996700123456",
          whatsapp: "+996700123456",
          location: "bishkek",
          locationName: "г. Бишкек",
          district: "leninsky",
          districtName: "Ленинский район",
          price: "1500 сом/день",
          available: true,
          images: ["/uploads/services/image1.jpg"],
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Неверные данные",
    schema: {
      example: {
        success: false,
        message: "Validation failed",
        errors: [
          {
            field: "name",
            message: "Название должно быть от 3 до 255 символов"
          },
          {
            field: "contact",
            message: "Неверный формат номера телефона"
          }
        ]
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Не авторизован",
    schema: {
      example: {
        success: false,
        message: "Unauthorized",
        statusCode: 401,
      },
    },
  })
  async create(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const error = errors[0]; // Get only the first error
        let message = Object.values(error.constraints)[0];

        // Special handling for location and district
        if (error.property === 'district' && error.target) {
          const location = (error.target as any).location;
          if (!location) {
            message = 'Сначала выберите регион';
          } else if (!DISTRICTS[location]?.includes(error.value)) {
            message = `Неверный район для региона ${location}`;
          }
        }

        // Special handling for WhatsApp number
        if (error.property === 'whatsapp') {
          if (!error.value.startsWith('+')) {
            message = 'Номер WhatsApp должен начинаться с +996';
          }
        }

        return new BadRequestException({
          success: false,
          message: "Validation failed",
          errors: [{
            field: error.property,
            message: message
          }]
        });
      }
    })) createServiceDto: CreateServiceDto,
    @Request() req: any
  ) {
    // Получаем файлы из multipart запроса
    const files = await this.extractFiles(req);

    // Validate images
    if (files && files.length > 5) {
      throw new BadRequestException({
        success: false,
        message: "Validation failed",
        errors: [{
          field: "images",
          message: "Максимальное количество изображений - 5"
        }]
      });
    }

    // Validate district
    if (createServiceDto.location && createServiceDto.district) {
      if (!DISTRICTS[createServiceDto.location]?.includes(createServiceDto.district)) {
        throw new BadRequestException({
          success: false,
          message: "Validation failed",
          errors: [{
            field: "district",
            message: `Неверный район для региона ${createServiceDto.location}`
          }]
        });
      }
    }

    // Format WhatsApp number if needed
    if (createServiceDto.whatsapp && !createServiceDto.whatsapp.startsWith('+')) {
      createServiceDto.whatsapp = `+${createServiceDto.whatsapp}`;
    }

    const service = await this.servicesService.create(
      createServiceDto,
      files,
      req.user?.id
    );

    return {
      success: true,
      data: service,
    };
  }

  @Get()
  @ApiOperation({
    summary: "Получение списка объявлений",
    description: "Возвращает список объявлений с фильтрацией и пагинацией",
  })
  @ApiQuery({
    name: "category",
    enum: ServiceCategory,
    required: false,
    description: "Категория техники",
  })
  @ApiQuery({
    name: "location",
    type: "string",
    required: false,
    description: "Регион (bishkek, osh, chui и т.д.)",
  })
  @ApiQuery({
    name: "district",
    type: "string",
    required: false,
    description: "Район в регионе",
  })
  @ApiQuery({
    name: "available",
    type: "boolean",
    required: false,
    description: "Доступность техники",
  })
  @ApiQuery({
    name: "search",
    type: "string",
    required: false,
    description: "Поиск по названию, описанию, имени владельца",
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description: "Номер страницы (по умолчанию 1)",
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    description: "Количество объявлений на странице (по умолчанию 20)",
  })
  @ApiResponse({
    status: 200,
    description: "Список объявлений получен успешно",
    schema: {
      example: {
        success: true,
        data: [
          {
            _id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Трактор МТЗ-80",
            category: "tractors",
            description: "Трактор в отличном состоянии",
            ownerName: "Азамат Токтосунов",
            contact: "+996700123456",
            whatsapp: "+996700123456",
            location: "bishkek",
            locationName: "г. Бишкек",
            district: "leninsky",
            districtName: "Ленинский район",
            price: "1500 сом/день",
            available: true,
            images: ["/uploads/services/image1.jpg"],
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z",
          },
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 50,
          pages: 3,
        },
      },
    },
  })
  async findAll(
    @Query("category") category?: ServiceCategory,
    @Query("location") location?: string,
    @Query("district") district?: string,
    @Query("available", new ParseBoolPipe({ optional: true }))
    available?: boolean,
    @Query("search") search?: string,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number
  ) {
    const filters: ServiceFilters = {
      category,
      location,
      district,
      available,
      search,
      page,
      limit,
    };

    return this.servicesService.findAll(filters);
  }

  @Get("stats")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Статистика платформы (только для админов)",
    description: "Возвращает общую статистику по пользователям и объявлениям",
  })
  @ApiResponse({
    status: 200,
    description: "Статистика получена успешно",
    schema: {
      example: {
        success: true,
        data: {
          totalUsers: 150,
          totalServices: 420,
          totalCategories: 5,
          servicesByCategory: {
            tractors: 120,
            trucks: 80,
            concrete: 90,
            unloading: 70,
            water: 60,
          },
          activeServices: 380,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({
    status: 403,
    description: "Недостаточно прав (только для админов)",
  })
  async getStats() {
    return this.servicesService.getStats();
  }

  @Get("my")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Мои объявления",
    description: "Возвращает список объявлений текущего пользователя",
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description: "Номер страницы",
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    description: "Количество объявлений на странице",
  })
  @ApiResponse({
    status: 200,
    description: "Список моих объявлений",
    schema: {
      example: {
        success: true,
        data: [
          {
            _id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Мой трактор МТЗ-80",
            category: "tractors",
            available: true,
            createdAt: "2024-01-15T10:00:00Z",
          },
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 5,
          pages: 1,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  async getMyServices(
    @Request() req: any,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number
  ) {
    return this.servicesService.getMyServices(req.user.id, page, limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Получение объявления по ID",
    description: "Возвращает детальную информацию об объявлении",
  })
  @ApiParam({ name: "id", description: "UUID объявления" })
  @ApiResponse({
    status: 200,
    description: "Объявление найдено",
    schema: {
      example: {
        success: true,
        data: {
          _id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Трактор МТЗ-80",
          category: "tractors",
          description: "Трактор в отличном состоянии, готов к работе",
          ownerName: "Азамат Токтосунов",
          contact: "+996700123456",
          whatsapp: "+996700123456",
          location: "bishkek",
          locationName: "г. Бишкек",
          district: "leninsky",
          districtName: "Ленинский район",
          price: "1500 сом/день",
          available: true,
          images: [
            "/uploads/services/image1.jpg",
            "/uploads/services/image2.jpg",
          ],
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Объявление не найдено",
    schema: {
      example: {
        success: false,
        message: "Объявление не найдено",
        statusCode: 404,
      },
    },
  })
  async findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req: any
  ) {
    // Получаем файлы из multipart запроса
    const files = await this.extractFiles(req);

    const service = await this.servicesService.update(
      id,
      updateServiceDto,
      files,
      req.user.id,
      req.user.isAdmin
    );

    return {
      success: true,
      data: service,
    };
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string, @Request() req: any) {
    await this.servicesService.remove(id, req.user.id, req.user.isAdmin);
    return {
      success: true,
      message: "Объявление удалено",
    };
  }

  // Вспомогательный метод для извлечения файлов из Fastify multipart
  private async extractFiles(req: any): Promise<any[]> {
    const files = [];

    try {
      // Fastify multipart files
      const parts = req.parts();

      for await (const part of parts) {
        if (part.file && part.fieldname === "images") {
          const buffer = await part.toBuffer();
          files.push({
            fieldname: part.fieldname,
            originalname: part.filename,
            filename: part.filename,
            data: buffer,
          });
        }
      }
    } catch (error) {
      // Если нет файлов или ошибка парсинга, возвращаем пустой массив
      console.log("No files in request or parsing error:", error.message);
    }

    return files;
  }
}
