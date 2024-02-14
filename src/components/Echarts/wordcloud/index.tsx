import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import defaultTheme from './themes/default.json';
import { EChartsType, init, registerTheme } from 'echarts/core';
import 'echarts-wordcloud';

interface IWordCloud {
  data: { name: string; value: number }[];
  className?: string;
}

export interface EchartsHandler {
  getEchartsInstance: () => EChartsType | undefined;
}

const WordCloud = forwardRef(({ data, className }: IWordCloud, ref: React.Ref<EchartsHandler>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>();

  useImperativeHandle(ref, () => ({
    getEchartsInstance: () => chartRef.current,
  }));

  useEffect(() => {
    if (divRef.current === null) return;

    registerTheme(defaultTheme.themeName, defaultTheme.theme);

    if (chartRef.current === undefined) {
      // 初始化
      chartRef.current = init(divRef.current, defaultTheme.themeName);
    }

    const options = {
      series: [
        {
          type: 'wordCloud', // 制定图表的类型为词云图。
          shape: 'diamond', // 设置词云的形状为方形。ECharts 提供了几种预设的形状，如心形（cardioid）、方形（diamond）、三角形（triangle-forward）等
          keepAspect: false, // 是否保持掩码图像（maskImage）的纵横比，或者是对于预设形状保持1:1的纵横比。从 echarts-wordcloud@2.1.0 版本开始支持

          left: 'center',
          top: 'center',
          width: '95%',
          height: '100%',

          sizeRange: [14, 80], // 数据中的值将映射到的文本大小范围。默认最小为 14px，最大为 80px。
          rotationRange: [-90, 90], // 文本旋转的范围和步进值（以度为单位），文本会在[-90, 90]的范围内以 45 度为步进随机旋转
          rotationStep: 15,
          gridSize: 20, // 用于标记画布可用性的网格大小（以像素为单位），网格越大，单词之间的间隙越大
          drawOutOfBound: false, // 是否允许单词部分地绘制在画布之外，允许比画布大的单词被绘制。
          layoutAnimation: true, // 是否执行布局动画。注意关闭它会在单词较多时导致用户界面阻塞
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
              // Random color
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              );
            },
          },
          // Data is an array. Each array item must have name and value property.
          data: data,
        },
      ],
    };

    chartRef.current?.setOption(options);
  }, [data, chartRef, divRef]);

  // 监听宽度
  useEffect(() => {
    const resize = () => {
      chartRef.current?.resize();
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (chartRef.current) {
        chartRef.current?.clear();
        chartRef.current?.dispose();
      }
    };
  }, [chartRef]);

  return <div ref={divRef} className={className} />;
});

WordCloud.displayName = 'WordCloud';

export default WordCloud;
