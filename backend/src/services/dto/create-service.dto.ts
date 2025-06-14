import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
  Length,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ServiceCategory } from "../entities/service.entity";

export class CreateServiceDto {
  @ApiProperty({
    description: "Название объявления",
    example: "Трактор МТЗ-80 в аренду",
    minLength: 3,
    maxLength: 255,
  })
  @IsString({ message: "Название должно быть строкой" })
  @Length(3, 255, { message: "Название должно быть от 3 до 255 символов" })
  name: string;

  @ApiProperty({
    description: "Категория техники",
    enum: ServiceCategory,
    example: ServiceCategory.TRACTORS,
  })
  @IsEnum(ServiceCategory, { message: "Неверная категория" })
  category: ServiceCategory;

  @ApiProperty({
    description: "Подробное описание объявления",
    example:
      "Трактор МТЗ-80 в отличном состоянии, готов к работе в поле. Опытный механизатор в комплекте.",
    minLength: 10,
    maxLength: 2000,
  })
  @IsString({ message: "Описание должно быть строкой" })
  @Length(10, 2000, { message: "Описание должно быть от 10 до 2000 символов" })
  description: string;

  @ApiProperty({
    description: "Имя владельца техники",
    example: "Азамат Токтосунов",
    minLength: 2,
    maxLength: 255,
  })
  @IsString({ message: "Имя владельца должно быть строкой" })
  @Length(2, 255, { message: "Имя владельца должно быть от 2 до 255 символов" })
  ownerName: string;

  @ApiProperty({
    description: "Контактный телефон",
    example: "+996700123456",
    pattern: "^\\+996[0-9]{9}$",
  })
  @IsPhoneNumber("KG", { message: "Неверный формат номера телефона" })
  contact: string;

  @ApiProperty({
    description: "WhatsApp номер",
    example: "+996700123456",
    pattern: "^\\+996[0-9]{9}$",
  })
  @IsPhoneNumber("KG", { message: "Неверный формат номера WhatsApp" })
  whatsapp: string;

  @ApiProperty({
    description: "Код региона",
    example: "bishkek",
    enum: [
      "bishkek",
      "osh",
      "chui",
      "issyk-kul",
      "naryn",
      "talas",
      "jalal-abad",
      "osh-region",
      "batken",
    ],
  })
  @IsString({ message: "Локация должна быть строкой" })
  location: string;

  @ApiProperty({
    description: "Название региона",
    example: "г. Бишкек",
  })
  @IsString({ message: "Название локации должно быть строкой" })
  locationName: string;

  @ApiProperty({
    description: "Код района (опционально)",
    example: "leninsky",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Район должен быть строкой" })
  district?: string;

  @ApiProperty({
    description: "Название района (опционально)",
    example: "Ленинский район",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Название района должно быть строкой" })
  districtName?: string;

  @ApiProperty({
    description: "Цена за услугу",
    example: "1500 сом/день",
    minLength: 1,
    maxLength: 255,
  })
  @IsString({ message: "Цена должна быть строкой" })
  @Length(1, 255, { message: "Цена должна быть от 1 до 255 символов" })
  price: string;

  @ApiProperty({
    description: "Доступность техники",
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: "Доступность должна быть булевым значением" })
  available?: boolean;

  @ApiProperty({
    type: "array",
    items: {
      type: "string",
      format: "binary",
    },
    description: "Изображения объявления (до 5 файлов, каждый до 5MB)",
    required: false,
  })
  images?: Express.Multer.File[];
}
