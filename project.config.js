// 安全标头
const securityHeaders = [
  {
    // dns 预解析
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    // xss 防护
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    // 这可以防止允许用户上传和共享文件的网站的 XSS 攻击
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // 防止点击劫持攻击
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    // 推荐人策略
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

// 获取CDN地址
const getCdnUrl = (env) => {
  switch (env) {
    case 'production':
      return 'https://www.yangfei.org.cn/assets/';
    case 'test':
      return 'https://www.yangfei.org.cn/assets/';
    default:
      return '';
  }
};

const ignoreDirs = ['.DS_Store'];

module.exports = {
  securityHeaders,
  getCdnUrl,
  ignoreDirs,
};
