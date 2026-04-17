import nodemailer from "nodemailer";
import { getCurrentSiteConfig } from "@/constants/city";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      comments,
      location,
      selectedPipe,
      depth,
      includeEquipment,
      selectedSetup,
      totalPrice,
    } = body;

    const hostname = req.headers.get("host") || "";
    const site = getCurrentSiteConfig(hostname);

    // Данные для сервисов
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = "-1002577203888";

    // GreenAPI данные (лучше тоже в process.env)
    const ID_INSTANCE = "3100517801";
    const API_TOKEN = "4e23b210658549c881680633b93bb11301a0f304a927433da6";
    const TARGET_PHONE = "79609250870";

    // Формируем текст сообщения
    let message = `*Новая заявка на бурение*\n\n`;
    message += `**Город:** ${site.clearCity}\n`;
    message += `**Имя:** ${name}\n`;
    message += `**Телефон:** ${phone}\n`;

    if (comments) {
      message += `**Комментарий:** ${comments}\n`;
    }

    if (
      location ||
      selectedPipe ||
      depth ||
      includeEquipment ||
      selectedSetup
    ) {
      message += `\n**Детали расчета:**\n`;
      message += `📍 Место: ${location || "Не указано"}\n`;
      message += `🏗 Конструкция: ${selectedPipe?.title || "Не выбрана"}\n`;
      message += `📏 Глубина: ${depth || "Не указана"} м\n`;
      message += `📦 Оборудование: ${includeEquipment ? "Включён" : "Не включён"}\n`;
      message += `🏠 Обустройство: ${selectedSetup?.title || "Не выбран"}\n`;

      message += `💰 Итоговая цена: ${totalPrice} ₽\n`;
    }

    // 1. Подготовка Telegram
    const sendTelegram = fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );

    // 2. Подготовка Email (Nodemailer)
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "sersur42@yandex.ru",
        pass: process.env.MAIL_ACCESS_PASS,
      },
    });

    const mailOptions = {
      from: `"Заявка: ${site.name}" <sersur42@yandex.ru>`,
      to: "bureniekemerovo@mail.ru",
      subject: `Новая заявка (${site.clearCity}) - ${name}`,
      text: message.replace(/\*/g, ""), // Убираем звездочки Markdown для письма
    };

    // 3. Подготовка GreenAPI (WhatsApp/Max)
    const sendGreenApi = fetch(
      `https://api.green-api.com/waInstance${ID_INSTANCE}/SendMessage/${API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: `${TARGET_PHONE}@c.us`,
          message: message.replace(/\*/g, ""), // WhatsApp не всегда красиво ест Markdown
        }),
      },
    );

    // Запускаем всё параллельно
    // Используем allSettled, чтобы если один сервис упал, остальные всё равно отработали
    const results = await Promise.allSettled([
      sendTelegram,
      transporter.sendMail(mailOptions),
      sendGreenApi,
    ]);

    // Логируем ошибки в консоль для отладки
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Ошибка в сервисе #${index}:`, result.reason);
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: "Заявка успешно обработана" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Критическая ошибка роута:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Внутренняя ошибка сервера" }),
      { status: 500 },
    );
  }
}
