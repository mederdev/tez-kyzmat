import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(query?: any): Promise<Service[]> {
    const filter: any = {};

    // Фильтрация по категории
    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    // Фильтрация по локации
    if (query.location && query.location !== 'all') {
      filter.location = query.location;
    }

    // Фильтрация по району
    if (query.district) {
      filter.district = query.district;
    }

    // Фильтрация по доступности
    if (query.available !== undefined) {
      filter.available = query.available === 'true';
    }

    // Поиск по тексту
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { ownerName: { $regex: query.search, $options: 'i' } },
      ];
    }

    return this.serviceModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Сервис с ID ${id} не найден`);
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Сервис с ID ${id} не найден`);
    }

    return updatedService;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Сервис с ID ${id} не найден`);
    }
  }

  async getStats(): Promise<any> {
    const [total, categoriesBreakdown] = await Promise.all([
      this.serviceModel.countDocuments().exec(),
      this.getCategoriesBreakdown()
    ]);

    // Convert categories breakdown to the expected format
    const servicesByCategory = categoriesBreakdown.reduce((acc, item) => {
      acc[item.category] = item.count;
      return acc;
    }, {});

    return {
      totalServices: total,
      totalCategories: Object.keys(servicesByCategory).length,
      servicesByCategory,
      activeServices: categoriesBreakdown.reduce((sum, item) => sum + item.active, 0)
    };
  }

  private async getCategoriesBreakdown(): Promise<any[]> {
    return this.serviceModel
      .aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            active: {
              $sum: {
                $cond: [{ $eq: ['$available', true] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            active: 1,
            _id: 0,
          },
        },
      ])
      .exec();
  }
}
