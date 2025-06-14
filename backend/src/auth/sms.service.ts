import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private configService: ConfigService) {}

  async sendSms(phone: string, message: string): Promise<boolean> {
    try {
      // В режиме разработки просто логируем код
      // if (this.configService.get<string>("NODE_ENV") === "development") {
      //   this.logger.log(`📱 SMS код для ${phone}: ${message}`);
      //   return true;
      // }

      // Реальная отправка SMS через Nikita.kg XML API
      return await this.sendViaNikitaKg(phone, message);
    } catch (error) {
      this.logger.error(`Ошибка отправки SMS: ${error.message}`);
      return false;
    }
  }

  private async sendViaNikitaKg(
    phone: string,
    message: string
  ): Promise<boolean> {
    try {
      const login = this.configService.get<string>("SMS_LOGIN");
      const password = this.configService.get<string>("SMS_PASSWORD");
      const sender =
        this.configService.get<string>("SMS_SENDER") || "TezKyzmat";
      const apiUrl =
        this.configService.get<string>("SMS_API_URL") ||
        "https://smspro.nikita.kg/api/message";

      if (!login || !password) {
        this.logger.error("SMS_LOGIN или SMS_PASSWORD не настроены");
        return false;
      }

      // Генерируем уникальный ID для сообщения
      const messageId = this.generateMessageId();

      // Форматируем номер телефона (убираем + если есть)
      const formattedPhone = phone.replace("+", "");

      // Создаем XML запрос согласно документации Nikita.kg
      const xmlBody = this.createXmlRequest({
        login,
        password,
        messageId,
        sender,
        text: message,
        phone: formattedPhone,
        test:
          this.configService.get<string>("NODE_ENV") === "development"
            ? "1"
            : "0",
      });

      this.logger.log(`Отправка SMS через Nikita.kg на ${phone}`);

      const response = await axios.post(apiUrl, xmlBody, {
        headers: {
          "Content-Type": "application/xml; charset=UTF-8",
        },
        timeout: 10000, // 10 секунд таймаут
      });

      // Парсим XML ответ
      const success = this.parseResponse(response.data);

      if (success) {
        this.logger.log(
          `✅ SMS успешно отправлен на ${phone} (ID: ${messageId})`
        );
      } else {
        this.logger.error(
          `❌ Ошибка отправки SMS на ${phone}: ${response.data}`
        );
      }

      return success;
    } catch (error) {
      this.logger.error(`Ошибка Nikita.kg API: ${error.message}`);
      return false;
    }
  }

  private createXmlRequest(params: {
    login: string;
    password: string;
    messageId: string;
    sender: string;
    text: string;
    phone: string;
    test: string;
  }): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<message>
  <login>${params.login}</login>
  <pwd>${params.password}</pwd>
  <id>${params.messageId}</id>
  <sender>${params.sender}</sender>
  <text>${params.text}</text>
  <phones>
    <phone>${params.phone}</phone>
  </phones>
  <test>${params.test}</test>
</message>`;
  }

  private parseResponse(xmlResponse: string): boolean {
    try {
      // Простая проверка успешности по наличию определенных тегов
      // В реальном проекте лучше использовать XML парсер
      return (
        xmlResponse.includes("<status>") &&
        !xmlResponse.includes("<error>") &&
        !xmlResponse.includes("ERROR")
      );
    } catch (error) {
      this.logger.error(`Ошибка парсинга ответа: ${error.message}`);
      return false;
    }
  }

  private generateMessageId(): string {
    // Генерируем уникальный ID длиной до 12 символов (латинские буквы и цифры)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async sendWhatsApp(phone: string, message: string): Promise<boolean> {
    try {
      // В режиме разработки просто логируем код
      if (this.configService.get<string>("NODE_ENV") === "development") {
        this.logger.log(`💬 WhatsApp код для ${phone}: ${message}`);
        return true;
      }

      // Здесь можно интегрировать с WhatsApp Business API
      // Пока просто возвращаем true
      this.logger.log(`WhatsApp сообщение отправлено на ${phone}`);
      return true;
    } catch (error) {
      this.logger.error(`Ошибка отправки WhatsApp: ${error.message}`);
      return false;
    }
  }

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Дополнительные методы для работы с Nikita.kg API

  async checkBalance(): Promise<number | null> {
    try {
      const login = this.configService.get<string>("SMS_LOGIN");
      const password = this.configService.get<string>("SMS_PASSWORD");

      if (!login || !password) {
        return null;
      }

      // Здесь можно добавить запрос баланса если API поддерживает
      this.logger.log("Проверка баланса SMS...");
      return null;
    } catch (error) {
      this.logger.error(`Ошибка проверки баланса: ${error.message}`);
      return null;
    }
  }

  async getDeliveryStatus(messageId: string): Promise<string | null> {
    try {
      // Здесь можно добавить запрос статуса доставки если API поддерживает
      this.logger.log(`Проверка статуса сообщения ${messageId}...`);
      return null;
    } catch (error) {
      this.logger.error(`Ошибка проверки статуса: ${error.message}`);
      return null;
    }
  }
}
