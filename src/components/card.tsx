import { FC, PropsWithChildren } from 'react';
import cls from 'classnames';

interface ICard extends PropsWithChildren {
  className?: string;
}

const Card: FC<ICard> = ({ children, className }) => {
  return <article className={cls('mb-3 space-y-2 bg-white p-8 shadow shadow-gray-5', className)}>{children}</article>;
};

export default Card;
