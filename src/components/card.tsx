import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return <article className='mb-3 space-y-2 bg-white p-8 shadow shadow-gray-5'>{children}</article>;
};

export default Card;
