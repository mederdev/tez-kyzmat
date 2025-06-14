import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTooManyRequestsResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SendCodeDto } from "./dto/send-code.dto";
import { VerifyCodeDto } from "./dto/verify-code.dto";

@ApiTags("auth")
@Controller("auth")
@UseGuards(ThrottlerGuard)
@ApiTooManyRequestsResponse({ description: "Превышен лимит запросов" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-code")
  @ApiOperation({
    summary: "Отправка SMS кода",
    description:
      "Отправляет 6-значный код подтверждения на указанный номер телефона",
  })
  @ApiBody({
    type: SendCodeDto,
    examples: {
      phone: {
        summary: "SMS на телефон",
        value: {
          phone: "+996700123456",
          method: "phone",
        },
      },
      whatsapp: {
        summary: "Сообщение в WhatsApp",
        value: {
          phone: "+996700123456",
          method: "whatsapp",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Код успешно отправлен",
    schema: {
      example: {
        success: true,
        message: "Код отправлен",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Неверные данные или код уже отправлен",
    schema: {
      example: {
        success: false,
        message: "Код уже отправлен. Подождите 5 минут.",
        statusCode: 400,
      },
    },
  })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    return this.authService.sendCode(sendCodeDto);
  }

  @Post("verify-login")
  @ApiOperation({
    summary: "Вход по SMS коду",
    description:
      "Авторизует существующего пользователя по SMS коду и возвращает JWT токен",
  })
  @ApiBody({
    type: VerifyCodeDto,
    examples: {
      login: {
        summary: "Вход пользователя",
        value: {
          phone: "+996700123456",
          code: "123456",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Успешная авторизация",
    schema: {
      example: {
        success: true,
        data: {
          user: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            phone: "+996700123456",
            name: "Азамат Токтосунов",
            isAdmin: false,
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Неверный код или пользователь не найден",
    schema: {
      example: {
        success: false,
        message: "Пользователь не найден. Зарегистрируйтесь сначала.",
        statusCode: 400,
      },
    },
  })
  async verifyLogin(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyLogin(verifyCodeDto);
  }

  @Post("verify-register")
  @ApiOperation({
    summary: "Регистрация по SMS коду",
    description:
      "Регистрирует нового пользователя по SMS коду и возвращает JWT токен",
  })
  @ApiBody({
    type: VerifyCodeDto,
    examples: {
      register: {
        summary: "Регистрация нового пользователя",
        value: {
          phone: "+996700654321",
          code: "123456",
          name: "Мирлан Касымов",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Успешная регистрация",
    schema: {
      example: {
        success: true,
        data: {
          user: {
            id: "456e7890-e89b-12d3-a456-426614174001",
            phone: "+996700654321",
            name: "Мирлан Касымов",
            isAdmin: false,
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Неверный код или пользователь уже существует",
    schema: {
      example: {
        success: false,
        message: "Пользователь уже существует. Используйте вход.",
        statusCode: 400,
      },
    },
  })
  async verifyRegister(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyRegister(verifyCodeDto);
  }
}
