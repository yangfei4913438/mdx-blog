const { securityHeaders } = require('./project.config');
// const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // compiler: {
  //   removeConsole: false,
  // },
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
  },
  headers: async () => {
    return [
      {
        // 将这些报头应用到应用程序中的所有路由中
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
