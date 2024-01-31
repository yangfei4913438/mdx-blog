import { FC, PropsWithChildren } from 'react';

interface ICatalogProps extends PropsWithChildren {
  tagName: string;
  value: any;
  children?: any[];
}

const Catalog: FC<ICatalogProps> = ({ tagName, ...rest }) => {
  switch (tagName) {
    case 'nav' || 'ol' || 'li' || 'a':
      return (
        <nav {...rest}>
          {rest.children?.map((item, idx) => {
            return <Catalog {...item} key={idx} />;
          })}
        </nav>
      );
    default:
      return rest.value;
  }
};

export default Catalog;
