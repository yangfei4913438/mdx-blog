import { useEffect, useState } from 'react';
import classnames from 'classnames';

/**
 * 网格辅助线，默认不显示
 * 同时按下 ctrl + g 就可以显示、关闭，网格辅助线
 * */
const GridColumn = () => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const monitor = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'g') {
        setShowGrid(() => !showGrid);
      }
    };
    window.addEventListener('keyup', monitor);

    return () => {
      window.removeEventListener('keyup', monitor);
    };
  }, [showGrid]);

  return (
    <div
      className={classnames('absolute top-0 left-0 bottom-0 right-0 flex justify-center pointer-events-none', {
        hidden: !showGrid || process.env.NODE_ENV === 'production',
      })}
    >
      <section className="z-50 w-screen h-screen fixed container grid gap-16 grid-cols-10">
        {Array.from({ length: 10 }).map((_, idx) => {
          return <div className="bg-black-opacity-3" key={idx} />;
        })}
      </section>
    </div>
  );
};

export default GridColumn;
