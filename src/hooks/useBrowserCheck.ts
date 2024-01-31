import { useEffect, useState } from 'react';

const useBrowserCheck = () => {
  // 钉钉内置
  const [isDingDing, setIsDingDing] = useState(false);
  // 微信内置
  const [isWeChat, setIsWeChat] = useState(false);
  // 手机端qq浏览器
  const [isQQMobile, setIsQQMobile] = useState(false);
  // 手机端遨游浏览器
  const [isMaxthonMobile, setIsMaxthonMobile] = useState(false);
  // 手机端UC浏览器
  const [isUCMobile, setIsUCMobile] = useState(false);
  // 手机端猎豹浏览器
  const [isLieBaoMobile, setIsLieBaoMobile] = useState(false);
  // 手机端欧朋浏览器
  const [isOPMobile, setIsOPMobile] = useState(false);
  // 手机端夸克浏览器
  const [isQuarkMobile, setIsQuarkMobile] = useState(false);
  // 手机端搜狗浏览器
  const [isSogouMobile, setIsSogouMobile] = useState(false);
  // 手机端Edge
  const [isEdgeMobile, setIsEdgeMobile] = useState(false);
  // 手机端火狐浏览器
  const [isFirefoxMobile, setIsFirefoxMobile] = useState(false);
  // 华为手机自带浏览器
  const [isHuaweiMobile, setIsHuaweiMobile] = useState(false);

  useEffect(() => {
    setIsDingDing(navigator.userAgent.includes('DingTalk'));
    setIsWeChat(navigator.userAgent.includes('WeChat'));
    setIsQQMobile(navigator.userAgent.includes('MQQBrowser'));
    setIsMaxthonMobile(navigator.userAgent.includes('Maxthon') && navigator.userAgent.includes('Mobile'));
    setIsUCMobile(navigator.userAgent.includes('UCBrowser') && navigator.userAgent.includes('Mobile'));
    setIsLieBaoMobile(navigator.userAgent.includes('LieBaoFast') && navigator.userAgent.includes('Mobile'));
    setIsOPMobile(navigator.userAgent.includes('OPR') && navigator.userAgent.includes('Mobile'));
    setIsQuarkMobile(navigator.userAgent.includes('Quark') && navigator.userAgent.includes('Mobile'));
    setIsSogouMobile(navigator.userAgent.includes('SogouMobileBrowser'));
    setIsEdgeMobile(navigator.userAgent.includes('Edg') && navigator.userAgent.includes('Mobile'));
    setIsFirefoxMobile(navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Mobile'));
    setIsHuaweiMobile(navigator.userAgent.includes('HuaweiBrowser') && navigator.userAgent.includes('Mobile'));
  }, []);

  return {
    isDingDing,
    isWeChat,
    isQQMobile,
    isMaxthonMobile,
    isUCMobile,
    isLieBaoMobile,
    isOPMobile,
    isQuarkMobile,
    isSogouMobile,
    isEdgeMobile,
    isFirefoxMobile,
    isHuaweiMobile,
  };
};

export default useBrowserCheck;
