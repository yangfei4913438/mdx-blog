import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FC, PropsWithChildren, useState } from 'react';
import SearchPosts from '@/components/searchPosts';
import { Input } from '@/components/ui/input';
import { useDialogData } from '@/store';

// 注意：
// 外部不要包裹打开对话框的按钮，打开的按钮应该放到这个组件的里面，作为子组件。
// 否则对话框的点击事件，会冒泡到外层的打开按钮。代码逻辑就变成了：关了又打开。造成无法窗口无法关闭的情况。
const SearchDialog: FC<PropsWithChildren> = ({ children }) => {
  // 用户输入
  const [key, setKey] = useState('');
  // 控制开关
  const { visible, customVisible } = useDialogData();

  return (
    <Dialog open={visible} onOpenChange={customVisible}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className='max-h-[80%] w-screen-90 min-w-screen-90 lg:w-screen-60 lg:min-w-screen-60'
        onPointerDown={(event) => event.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>文章搜索</DialogTitle>
          <DialogDescription>
            输入一级目录名称、二级目录名称、文章标题、或者文章标签，来模糊匹配相关文章。输入字符不区分大小写。
          </DialogDescription>
        </DialogHeader>
        <Input
          value={key}
          placeholder='请输入文章关键字，用来筛选文章列表中的文章'
          onChange={(event) => setKey(event.target.value)}
        />
        <div className='flex-grow overflow-auto'>
          <SearchPosts userInput={key} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
