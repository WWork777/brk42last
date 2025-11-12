/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Добавляет вендорные префиксы
    ...(process.env.NODE_ENV === 'production' && {
      '@fullhuman/postcss-purgecss': {
        content: ['./pages/**/*.js', './components/**/*.js', './public/**/*.html'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
      cssnano: {
        preset: 'default',
      },
    }),
  },
};

export default config;
