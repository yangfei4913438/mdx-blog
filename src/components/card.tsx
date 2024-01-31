import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <article className='shadow-gray-5 block bg-white py-8 shadow' data-aos='fade-down'>
      {children}
    </article>
  );
};

export default Card;
