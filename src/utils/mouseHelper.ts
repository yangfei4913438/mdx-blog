import React from 'react';

// 传入的参数，被复制到剪贴板
export const copyText = async (text: string, tip: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (navigator.clipboard) {
    // clipboard api 复制
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制(这里是兼容性语法，所以使用的是老的api,提示使用了废弃api是正常情况)
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
  }

  // 复制成功提示
  const eleTips = document.createElement('span');
  eleTips.className = 'text-popup';
  eleTips.innerHTML = tip;
  document.body.appendChild(eleTips);
  // 事件
  eleTips.addEventListener('animationend', function () {
    eleTips.parentNode?.removeChild(eleTips);
  });
  // For IE9
  if (!history.pushState) {
    setTimeout(function () {
      eleTips.parentNode?.removeChild(eleTips);
    }, 1000);
  }
  eleTips.style.left = event.pageX - eleTips.clientWidth / 2 + 'px';
  eleTips.style.top = event.pageY - eleTips.clientHeight + 'px';

  const strStyle =
    '.text-popup { animation: textPopup 1s both; -ms-transform: translateY(-20px); color: #01cf97; user-select: none; white-space: nowrap; position: absolute; z-index: 99; }@keyframes textPopup {0%, 100% { opacity: 0; } 5% { opacity: 1; } 100% { transform: translateY(-50px); }}';

  let eleStyle = document.querySelector('#popupStyle');
  if (!eleStyle) {
    eleStyle = document.createElement('style');
    eleStyle.innerHTML = strStyle;
    document.head.appendChild(eleStyle);
  }
};
