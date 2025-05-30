import { WHATSAPP_MESSAGE_TEMPLATE } from "@/data/constants";

export const openWhatsAppChat = (
  whatsappNumber: string,
  serviceName: string
): void => {
  const message = encodeURIComponent(WHATSAPP_MESSAGE_TEMPLATE(serviceName));
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
};
