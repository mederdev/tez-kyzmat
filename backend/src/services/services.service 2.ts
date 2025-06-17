import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto & { ownerId: string }): Promise<ServiceDocument> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(query?: any): Promise<ServiceDocument[]> {
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

  async findOne(id: string): Promise<ServiceDocument> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDocument> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }

  async getStats(): Promise<any> {
    const total = await this.serviceModel.countDocuments().exec();
    const active = await this.serviceModel
      .countDocuments({ available: true })
      .exec();
    const categories = await this.serviceModel.distinct('category').exec();

    return {
      totalServices: total,
      activeServices: active,
      totalCategories: categories.length,
      categoriesBreakdown: await this.getCategoriesBreakdown(),
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

  async findByOwnerId(ownerId: string): Promise<ServiceDocument[]> {
    return this.serviceModel.find({ ownerId }).exec();
  }

  async findAllWithOwners(): Promise<ServiceDocument[]> {
    return this.serviceModel.find().populate('ownerId', 'name email').exec();
  }
}
