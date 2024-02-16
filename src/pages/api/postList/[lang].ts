// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getPostList } from '@/core/api';

export default function handler(req: NextApiRequest, res: NextApiResponse<IPostInfo[] | { error: string }>) {
  // 取出参数
  const { lang, key } = req.query;
  const check = req.headers['sec-fetch-site'] ?? '';

  // 只允许同源访问
  if (check !== 'same-origin') {
    res.status(403).json({ error: '拒绝访问' });
  }

  // 判断参数
  const language = ['zh', 'zh_cn', 'cn'].includes(String(lang).toLowerCase()) ? 'zh' : 'en';
  // 获取数据
  const list: IPostInfo[] = getPostList(language);

  const data = key
    ? list.filter((item) => {
        return [String(item.dir).toLowerCase(), String(item.subDir).toLowerCase()].includes(String(key).toLowerCase());
      })
    : list;

  // 返回数据
  res.status(200).json(data);
}
