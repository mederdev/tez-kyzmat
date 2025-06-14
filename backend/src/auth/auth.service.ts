import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan } from "typeorm";

import { UsersService } from "../users/users.service";
import { SmsService } from "./sms.service";
import { VerificationCode } from "./entities/verification-code.entity";
import { SendCodeDto, SendMethod } from "./dto/send-code.dto";
import { VerifyCodeDto } from "./dto/verify-code.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
    private usersService: UsersService,
    private smsService: SmsService,
    private jwtService: JwtService
  ) {}

  async sendCode(sendCodeDto: SendCodeDto) {
    const { phone, method } = sendCodeDto;

    // Очищаем старые коды
    await this.cleanupExpiredCodes();

    // Проверяем, не отправлен ли уже код недавно
    const recentCode = await this.verificationCodeRepository.findOne({
      where: { phone, used: false },
      order: { createdAt: "DESC" },
    });

    if (recentCode && new Date() < recentCode.expiresAt) {
      throw new BadRequestException("Код уже отправлен. Подождите 5 минут.");
    }

    // Генерируем новый код
    const code = this.smsService.generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

    // Сохраняем код в базе
    const verificationCode = this.verificationCodeRepository.create({
      phone,
      code,
      expiresAt,
    });
    await this.verificationCodeRepository.save(verificationCode);

    // Отправляем код
    const message = `Тез Кызмат. Ваш код подтверждения: ${code}`;
    let sent = false;

    if (method === SendMethod.PHONE) {
      sent = await this.smsService.sendSms(phone, message);
    } else if (method === SendMethod.WHATSAPP) {
      sent = await this.smsService.sendWhatsApp(phone, message);
    }

    if (!sent) {
      throw new BadRequestException("Не удалось отправить код");
    }

    return {
      success: true,
      message: "Код отправлен",
    };
  }

  async verifyLogin(verifyCodeDto: VerifyCodeDto) {
    const { phone, code } = verifyCodeDto;

    // Находим код
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: { phone, code, used: false },
    });

    if (!verificationCode) {
      throw new BadRequestException("Неверный код");
    }

    if (new Date() > verificationCode.expiresAt) {
      throw new BadRequestException("Код истек");
    }

    // Помечаем код как использованный
    verificationCode.used = true;
    await this.verificationCodeRepository.save(verificationCode);

    // Ищем пользователя
    const user = await this.usersService.findByPhone(phone);
    if (!user) {
      throw new BadRequestException(
        "Пользователь не найден. Зарегистрируйтесь сначала."
      );
    }

    // Генерируем JWT токен
    const payload = { sub: user.id, phone: user.phone };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name,
          isAdmin: user.isAdmin,
        },
        token,
      },
    };
  }

  async verifyRegister(verifyCodeDto: VerifyCodeDto) {
    const { phone, code, name } = verifyCodeDto;

    // Находим код
    const verificationCode = await this.verificationCodeRepository.findOne({
      where: { phone, code, used: false },
    });

    if (!verificationCode) {
      throw new BadRequestException("Неверный код");
    }

    if (new Date() > verificationCode.expiresAt) {
      throw new BadRequestException("Код истек");
    }

    // Помечаем код как использованный
    verificationCode.used = true;
    await this.verificationCodeRepository.save(verificationCode);

    // Проверяем, не существует ли уже пользователь
    const existingUser = await this.usersService.findByPhone(phone);
    if (existingUser) {
      throw new BadRequestException(
        "Пользователь уже существует. Используйте вход."
      );
    }

    // Создаем нового пользователя
    const user = await this.usersService.create({
      phone,
      name: name || null,
    });

    // Генерируем JWT токен
    const payload = { sub: user.id, phone: user.phone };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name,
          isAdmin: user.isAdmin,
        },
        token,
      },
    };
  }

  private async cleanupExpiredCodes() {
    await this.verificationCodeRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
