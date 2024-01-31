import React, { useEffect } from 'react';
import useBrowserCheck from '@/hooks/useBrowserCheck';

const Video = (
  props: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
) => {
  // 获取当前的浏览器类型
  const { isWeChat } = useBrowserCheck();

  // 进入全屏
  const enterFullscreen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (isWeChat) return;
    const el: any = document.getElementById(`full-screenVideo-${props.src}`);
    // 取出多种浏览器下得全屏方法
    const requestMethod =
      el?.requestFullscreen ||
      el?.webkitRequestFullscreen ||
      el?.msRequestFullscreen ||
      el?.mozRequestFullScreen;
    // 如果存在，则执行全屏方法
    if (requestMethod) {
      requestMethod.apply(el);
    }
  };

  // useEffect(() => {
  //   if (props.src) {
  //     const video = document.createElement('video');
  //     const canvas = document.getElementById(`full-screenVideo-${props.src}`)! as HTMLCanvasElement;
  //     const context = canvas.getContext('2d')!;
  //
  //     // 赋值播放地址
  //     video.muted = true;
  //     video.autoplay = true;
  //     video.loop = true;
  //     video.src = props.src;
  //
  //     // 监听是否可以播放
  //     video.oncanplay = async () => {
  //       await video.play();
  //       canvas.width = video.videoWidth * window.devicePixelRatio;
  //       canvas.height = video.videoHeight * window.devicePixelRatio;
  //     };
  //
  //     // 监听播放
  //     video.onplaying = () => {
  //       let timer: any;
  //       timer = setInterval(() => {
  //         if (video.currentTime >= video.duration) {
  //           clearInterval(timer);
  //           video.pause();
  //         }
  //         const h = canvas.width * (video.videoHeight / video.videoWidth);
  //         context.drawImage(video, 0, 0, canvas.width, h);
  //       }, 100);
  //     };
  //   }
  // }, [props.src]);

  // 禁止鼠标右键
  useEffect(() => {
    const dom = document.getElementById(`full-screenVideo-${props.src}`);
    // @ts-ignore
    dom.oncontextmenu = function (e) {
      // e = e || window.event;
      return false;
    };
  }, [props.src]);

  return (
    <div className='relative cursor-pointer' onClick={enterFullscreen}>
      {/* <canvas id={`full-screenVideo-${props.src}`} className="w-full" />*/}
      <video
        id={`full-screenVideo-${props.src}`}
        {...props}
        controls={isWeChat}
        playsInline
        x5-video-player-type='h5'
        x5-video-player-fullscreen='true'
        x-webkit-airplay='allow'
        disablePictureInPicture={true}
        controlsList='nodownload noremoteplayback'
        muted
        autoPlay={!isWeChat}
        loop={!isWeChat}
        preload='auto'
      />
    </div>
  );
};

export default Video;
