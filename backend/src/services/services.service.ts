import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";

import { Service, ServiceCategory } from "./entities/service.entity";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { FileUploadService } from "./file-upload.service";
import { UsersService } from "../users/users.service";

export interface ServiceFilters {
  category?: ServiceCategory;
  location?: string;
  district?: string;
  available?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    private fileUploadService: FileUploadService,
    private usersService: UsersService
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    files: any[],
    userId: string
  ): Promise<Service> {
    // Загружаем изображения
    const images = await this.fileUploadService.uploadImages(files);

    // Создаем объявление
    const service = this.servicesRepository.create({
      ...createServiceDto,
      images,
      ownerId: userId,
    });

    return this.servicesRepository.save(service);
  }

  async findAll(filters: ServiceFilters = {}) {
    const {
      category,
      location,
      district,
      available,
      search,
      page = 1,
      limit = 20,
    } = filters;

    const queryBuilder = this.servicesRepository
      .createQueryBuilder("service")
      .leftJoinAndSelect("service.owner", "owner")
      .orderBy("service.createdAt", "DESC");

    // Фильтрация по категории
    if (category) {
      queryBuilder.andWhere("service.category = :category", { category });
    }

    // Фильтрация по локации
    if (location) {
      queryBuilder.andWhere("service.location = :location", { location });
    }

    // Фильтрация по району
    if (district) {
      queryBuilder.andWhere("service.district = :district", { district });
    }

    // Фильтрация по доступности
    if (available !== undefined) {
      queryBuilder.andWhere("service.available = :available", { available });
    }

    // Поиск по тексту
    if (search) {
      queryBuilder.andWhere(
        "(service.name LIKE :search OR service.description LIKE :search OR service.ownerName LIKE :search)",
        { search: `%${search}%` }
      );
    }

    // Пагинация
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [services, total] = await queryBuilder.getManyAndCount();

    return {
      success: true,
      data: services.map((service) => this.formatService(service)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const service = await this.servicesRepository.findOne({
      where: { _id: id },
      relations: ["owner"],
    });

    if (!service) {
      throw new NotFoundException("Объявление не найдено");
    }

    return {
      success: true,
      data: this.formatService(service),
    };
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    files: any[],
    userId: string,
    isAdmin: boolean = false
  ): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { _id: id },
      relations: ["owner"],
    });

    if (!service) {
      throw new NotFoundException("Объявление не найдено");
    }

    // Проверяем права доступа
    if (!isAdmin && service.ownerId !== userId) {
      throw new ForbiddenException("Недостаточно прав для редактирования");
    }

    let newImages = service.images || [];

    // Если есть новые файлы, загружаем их и заменяем старые
    if (files && files.length > 0) {
      // Удаляем старые изображения
      if (service.images && service.images.length > 0) {
        await this.fileUploadService.deleteImages(service.images);
      }
      // Загружаем новые
      newImages = await this.fileUploadService.uploadImages(files);
    }

    // Обновляем данные
    await this.servicesRepository.update(id, {
      ...updateServiceDto,
      images: newImages,
    });

    return this.findOne(id).then((result) => result.data);
  }

  async remove(
    id: string,
    userId: string,
    isAdmin: boolean = false
  ): Promise<void> {
    const service = await this.servicesRepository.findOne({
      where: { _id: id },
    });

    if (!service) {
      throw new NotFoundException("Объявление не найдено");
    }

    // Проверяем права доступа
    if (!isAdmin && service.ownerId !== userId) {
      throw new ForbiddenException("Недостаточно прав для удаления");
    }

    // Удаляем изображения
    if (service.images && service.images.length > 0) {
      await this.fileUploadService.deleteImages(service.images);
    }

    // Удаляем объявление
    await this.servicesRepository.remove(service);
  }

  async getStats() {
    const totalServices = await this.servicesRepository.count();
    const activeServices = await this.servicesRepository.count({
      where: { available: true },
    });
    const totalUsers = await this.usersService.getUsersCount();

    // Статистика по категориям
    const categoryStats = await this.servicesRepository
      .createQueryBuilder("service")
      .select("service.category", "category")
      .addSelect("COUNT(*)", "count")
      .groupBy("service.category")
      .getRawMany();

    const servicesByCategory = categoryStats.reduce((acc, item) => {
      acc[item.category] = parseInt(item.count);
      return acc;
    }, {});

    return {
      success: true,
      data: {
        totalUsers,
        totalServices,
        totalCategories: Object.keys(ServiceCategory).length,
        servicesByCategory,
        activeServices,
      },
    };
  }

  async getMyServices(userId: string, page = 1, limit = 20) {
    const [services, total] = await this.servicesRepository.findAndCount({
      where: { ownerId: userId },
      relations: ["owner"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      success: true,
      data: services.map((service) => this.formatService(service)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  private formatService(service: Service): any {
    return {
      _id: service._id,
      name: service.name,
      category: service.category,
      description: service.description,
      ownerName: service.ownerName,
      contact: service.contact,
      whatsapp: service.whatsapp,
      location: service.location,
      locationName: service.locationName,
      district: service.district,
      districtName: service.districtName,
      price: service.price,
      available: service.available,
      images: service.images || [],
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      ownerId: service.ownerId,
    };
  }
}
