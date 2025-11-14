// 用于构建时的类型声明文件
declare module '@tarojs/taro' {
  export const getCurrentPages: () => any[];
  export const request: (options: any) => Promise<any>;
  export const getStorageSync: (key: string) => any;
  export const setStorageSync: (key: string, value: any) => void;
  export const removeStorageSync: (key: string) => void;
}