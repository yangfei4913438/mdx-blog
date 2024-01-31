// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getPostList } from '@/core/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IPostInfo[]>) {
  // 获取数据(无参数就是中文数据)
  const list: IPostInfo[] = getPostList('zh');
  // 返回数据
  res.status(200).json(list);
}
