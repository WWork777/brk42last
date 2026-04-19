/** @type {import('next').NextConfig} */

// Проверяем, запущено ли приложение в продакшене
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Включаем префикс для всех статических файлов (JS, CSS, шрифты)
  assetPrefix: isProd ? "https://cdn.brk42.ru" : undefined,

  images: {
    formats: ["image/avif", "image/webp"],
    // Добавляем твой CDN в список разрешенных доменов для картинок
    domains: ["pic.rutube.ru", "avatars.mds.yandex.net", "cdn.brk42.ru"],
  },
};

export default nextConfig;
