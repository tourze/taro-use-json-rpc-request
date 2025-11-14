// Storybook专用Taro环境设置
import { taroMock } from './taro-mock';

// 在Storybook环境中替换真实的Taro
export const setupStorybookTaro = () => {
  if (typeof window !== 'undefined' && !window.Taro) {
    // 创建一个简单的Taro mock对象
    (window as any).Taro = {
      request: taroMock.request,
      getCurrentPages: taroMock.getCurrentPages,
      getStorageSync: taroMock.getStorageSync,
      setStorageSync: taroMock.setStorageSync,
      removeStorageSync: taroMock.removeStorageSync,
      // 其他常用Taro API的mock
      ENV_TYPE: {
        WEAPP: 'WEAPP',
        SWAN: 'SWAN',
        ALIPAY: 'ALIPAY',
        TT: 'TT',
        QQ: 'QQ',
        JD: 'JD',
        H5: 'H5'
      }
    };

    console.log('✅ Taro mock已设置，用于Storybook开发环境');
  }
};

// 重置Taro mock数据
export const resetStorybookTaro = () => {
  taroMock.clearMockData();

  // 设置默认的JWT token用于测试
  taroMock.setMockStorage({
    'JWT': 'mock-jwt-token-for-testing',
    'KEY_SHARE_MID': 'mock-mid-12345',
    'TRAFFIC_SOURCE': 'mock-source-storybook'
  });

  console.log('🔄 Taro mock数据已重置');
};

// 设置特定的测试场景
export const setStorybookScenario = (scenario: 'success' | 'error' | 'empty') => {
  taroMock.clearMockData();

  switch (scenario) {
    case 'success':
      taroMock.setMockStorage({
        'JWT': 'valid-jwt-token'
      });
      break;
    case 'error':
      // 清除JWT，模拟认证失败
      break;
    case 'empty':
      taroMock.setMockStorage({
        'JWT': 'valid-jwt-token'
      });
      break;
  }
};