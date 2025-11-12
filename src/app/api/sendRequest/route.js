import nodemailer from "nodemailer";
import { SITES, getCurrentSiteConfig } from "@/constants/city"; // Путь подкорректируй под свой

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
    } = body;

    const hostname = req.headers.get("host") || "";
    const site = getCurrentSiteConfig(hostname);

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = -1002577203888;

    let message = `
Новая заявка на бурение:

Город: ${site.clearCity}
Имя: ${name}
Телефон: ${phone}
    `;

    if (comments) {
      message += `Комментарий: ${comments}\n`;
    }

    if (location || selectedPipe || depth || includeEquipment || selectedSetup) {
      message += `
Место бурения: ${location || "Не указано"}
Конструкция скважины: ${selectedPipe?.title || "Не выбрана"}
Глубина скважины: ${depth || "Не указана"} м
Комплект оборудования: ${includeEquipment ? "Включён" : "Не включён"}
Способ обустройства: ${selectedSetup?.title || "Не выбран"}
      `;
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramResponse.ok) {
      throw new Error("Ошибка при отправке сообщения в Telegram");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "request.brk42@mail.ru",
        pass: process.env.MAIL_ACCESS_PASS,
      },
    });

    const mailOptions = {
      from: `"${site.name}" <request.brk42@mail.ru>`,
      to: "bureniekemerovo@mail.ru",
      subject: `Новая заявка (${site.clearCity})`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Заявка успешно отправлена!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Ошибка:", error.message);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
