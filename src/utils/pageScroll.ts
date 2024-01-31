// 平滑滚动到顶部
export const scrollToTop = () => {
  let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  const distance = currentPosition / 50;
  let scrollAnimation: any;
  function smoothScroll() {
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
      window.scrollBy(0, -distance);
      scrollAnimation = requestAnimationFrame(smoothScroll);
    } else {
      cancelAnimationFrame(scrollAnimation);
    }
  }

  scrollAnimation = requestAnimationFrame(smoothScroll);
};
