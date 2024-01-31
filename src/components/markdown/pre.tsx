import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import uniqueId from 'lodash/uniqueId';
import { copyText } from '@/utils/mouseHelper';
import { Copy } from 'lucide-react';

interface IProps extends PropsWithChildren {
  className: string;
}

const Pre: FC<IProps> = ({ className, children }) => {
  const { t } = useTranslation('common');

  // 生成 dom id
  const id = uniqueId('pre-copy-');

  let dom: HTMLElement;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dom = document.getElementById(id)!;
  }, [id]);

  return (
    <div className={`${className} group relative`}>
      <div
        className='absolute right-3 top-3 hidden cursor-pointer group-hover:block'
        onClick={(event) => copyText(dom.innerText, t('copy-successfully'), event)}
      >
        <button type='button' title={t('copy')} className=''>
          <Copy className='h-5 w-5 text-white' />
        </button>
      </div>
      <pre id={id}>{children}</pre>
    </div>
  );
};

export default Pre;
