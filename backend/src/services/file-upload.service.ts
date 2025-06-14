import { Injectable, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import { join, extname } from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FileUploadService {
  private readonly uploadPath: string;
  private readonly allowedTypes = ["jpg", "jpeg", "png", "webp"];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(private configService: ConfigService) {
    this.uploadPath =
      this.configService.get<string>("UPLOAD_PATH") || "./uploads";
  }

  async uploadImages(files: any[]): Promise<string[]> {
    if (!files || files.length === 0) {
      return [];
    }

    if (files.length > 5) {
      throw new BadRequestException("Максимум 5 изображений");
    }

    // Создаем папку, если не существует
    const servicesDir = join(this.uploadPath, "services");
    if (!existsSync(servicesDir)) {
      await mkdir(servicesDir, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
      // Проверяем размер файла
      if (file.data && file.data.length > this.maxFileSize) {
        throw new BadRequestException("Размер файла не должен превышать 5MB");
      }

      // Проверяем тип файла
      const fileExt = extname(file.filename).toLowerCase().slice(1);
      if (!this.allowedTypes.includes(fileExt)) {
        throw new BadRequestException(
          "Разрешены только изображения: jpg, jpeg, png, webp"
        );
      }

      // Генерируем уникальное имя файла
      const uniqueName = `${uuidv4()}.${fileExt}`;
      const filePath = join(servicesDir, uniqueName);

      try {
        // Сохраняем файл
        await writeFile(filePath, file.data);
        uploadedFiles.push(`/uploads/services/${uniqueName}`);
      } catch (error) {
        // Если произошла ошибка, удаляем уже загруженные файлы
        await this.cleanupFiles(uploadedFiles);
        throw new BadRequestException("Ошибка загрузки файла");
      }
    }

    return uploadedFiles;
  }

  async deleteImages(imagePaths: string[]): Promise<void> {
    if (!imagePaths || imagePaths.length === 0) {
      return;
    }

    for (const imagePath of imagePaths) {
      try {
        // Преобразуем URL в путь к файлу
        const fileName = imagePath.split("/").pop();
        const filePath = join(this.uploadPath, "services", fileName);

        if (existsSync(filePath)) {
          await unlink(filePath);
        }
      } catch (error) {
        console.error(`Не удалось удалить файл ${imagePath}:`, error);
      }
    }
  }

  private async cleanupFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        const fileName = filePath.split("/").pop();
        const fullPath = join(this.uploadPath, "services", fileName);
        if (existsSync(fullPath)) {
          await unlink(fullPath);
        }
      } catch (error) {
        console.error(`Не удалось удалить файл при очистке:`, error);
      }
    }
  }
}
