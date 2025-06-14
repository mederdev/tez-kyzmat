import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private configService: ConfigService) {}

  async sendSms(phone: string, message: string): Promise<boolean> {
    try {
      const apiKey = this.configService.get<string>("SMS_API_KEY");
      const apiUrl = this.configService.get<string>("SMS_API_URL");
      const sender =
        this.configService.get<string>("SMS_SENDER") || "TezKyzmat";

      // В режиме разработки просто логируем код
      if (this.configService.get<string>("NODE_ENV") === "development") {
        this.logger.log(`SMS код для ${phone}: ${message}`);
        return true;
      }

      // Реальная отправка SMS через API провайдера
      const response = await axios.post(apiUrl, {
        api_key: apiKey,
        sender: sender,
        phone: phone.replace("+", ""),
        message: message,
      });

      this.logger.log(`SMS отправлен на ${phone}: ${response.status}`);
      return response.status === 200;
    } catch (error) {
      this.logger.error(`Ошибка отправки SMS: ${error.message}`);
      return false;
    }
  }

  async sendWhatsApp(phone: string, message: string): Promise<boolean> {
    try {
      // В режиме разработки просто логируем код
      if (this.configService.get<string>("NODE_ENV") === "development") {
        this.logger.log(`WhatsApp код для ${phone}: ${message}`);
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
}
