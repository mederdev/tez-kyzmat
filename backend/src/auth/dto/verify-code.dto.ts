import { IsString, IsPhoneNumber, Length, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyCodeDto {
  @ApiProperty({
    description: "Номер телефона в международном формате",
    example: "+996700123456",
    pattern: "^\\+996[0-9]{9}$",
  })
  @IsPhoneNumber("KG", { message: "Неверный формат номера телефона" })
  phone: string;

  @ApiProperty({
    description: "6-значный код подтверждения из SMS",
    example: "123456",
    minLength: 6,
    maxLength: 6,
    pattern: "^[0-9]{6}$",
  })
  @IsString({ message: "Код должен быть строкой" })
  @Length(6, 6, { message: "Код должен содержать 6 цифр" })
  code: string;

  @ApiProperty({
    description: "Имя пользователя (только для регистрации)",
    example: "Азамат Токтосунов",
    minLength: 2,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Имя должно быть строкой" })
  @Length(2, 255, { message: "Имя должно быть от 2 до 255 символов" })
  name?: string;
}
