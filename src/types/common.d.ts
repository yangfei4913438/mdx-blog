declare module '*.md';
declare module '*.mdx';

interface IPostInfo {
  dirIndex: number;
  subDirIndex: number;
  index: number;
  dir: string;
  subDir: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  url: string;
}

interface IPost {
  postInfos: IPostInfo[];
  tags: { [key: string]: number };
}
