// 检查email合法性
export const checkEmail = (emailAddress: string) => {
  let Regex = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return Regex.test(emailAddress);
};

// 用户名正则，2到12位（汉字，字母，数字，下划线，减号, 空格）空格不能是第一位
export const checkUserName = (name: string) => {
  let Regex = /^(?!\s)[a-zA-Z0-9_\u4e00-\u9fa5\s-]{2,12}$/;
  return Regex.test(name);
};

// 密码正则，6-16位，包括至少1个大写字母，1个小写字母，1个数字
export const checkPassword = (password: string) => {
  let Regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,16}$/;
  // let Regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*?()~`=+{}[\]|:;'",.<>\/ ]).{6,12}$/
  return Regex.test(password);
};

// 检测是否为IP地址
export const checkIPAddress = (ip: string) => {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
};

// 截止2021年的可用手机号
export const checkPhoneNumber = (num: string) => {
  const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  return reg.test(num);
};

// 中英文姓名正则匹配
export const checkName = (name: string) => {
  const reg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
  return reg.test(name);
};
