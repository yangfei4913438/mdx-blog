import SeoLink from '@/components/link';

const Footer = () => {
  return (
    <footer className='h-20 py-4 text-center'>
      <SeoLink href={'https://beian.miit.gov.cn/'} self={false}>
        沪ICP备14052242号-1
      </SeoLink>
    </footer>
  );
};

export default Footer;
