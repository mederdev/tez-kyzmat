import { IsString, IsPhoneNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum SendMethod {
  PHONE = "phone",
  WHATSAPP = "whatsapp",
}

export class SendCodeDto {
  @ApiProperty({
    description: "Номер телефона в международном формате",
    example: "+996700123456",
    pattern: "^\\+996[0-9]{9}$",
  })
  @IsPhoneNumber("KG", { message: "Неверный формат номера телефона" })
  phone: string;

  @ApiProperty({
    description: "Способ отправки кода",
    enum: SendMethod,
    default: SendMethod.PHONE,
    example: SendMethod.PHONE,
  })
  @IsEnum(SendMethod, { message: "Метод должен быть phone или whatsapp" })
  method: SendMethod;
}
