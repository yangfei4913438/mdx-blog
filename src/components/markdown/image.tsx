import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// 因为是客户端适配的组件，所以不能在服务器端渲染
const Viewer = dynamic(() => import('react-viewer'), { ssr: false });

const Image = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  // 是否显示图片控件
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="cursor-zoom-in" onClick={() => setVisible(true)}>
        <img {...props} alt={props.alt} />
      </div>
      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={[{ src: props.src as string }]}
        noNavbar // 不显示缩略图
        attribute={false} // 不显示图片属性
        changeable={false} // 不显示图片切换
      />
    </>
  );
};

export default Image;
