// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getPostList } from '@/core/api';
import { allowedHosts } from '@/core/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IPostInfo[] | { error: string }>) {
  const { key } = req.query;

  const host = req.headers.host ?? '';
  if (!allowedHosts.includes(host)) {
    res.status(403).json({ error: '拒绝访问' });
  }

  // 获取数据(无参数就是中文数据)
  const list: IPostInfo[] = getPostList('zh');

  const data = key
    ? list.filter((item) => {
        return [String(item.dir).toLowerCase(), String(item.subDir).toLowerCase()].includes(String(key).toLowerCase());
      })
    : list;

  // 返回数据
  res.status(200).json(data);
}
