import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <article className='block bg-white p-8 shadow shadow-gray-5' data-aos='fade-down'>
      {children}
    </article>
  );
};

export default Card;
