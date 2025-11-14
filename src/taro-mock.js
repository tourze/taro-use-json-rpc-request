// Taro API Mock for Storybook development
// This file provides mock implementations for Taro APIs used in the library

const mockTaro = {
  // Mock Taro.request for Storybook
  request: (options) => {
    console.log('Mock Taro.request called with:', options);
    return Promise.resolve({
      data: { mockResponse: true },
      statusCode: 200,
      header: {}
    });
  },

  // Mock other Taro APIs that might be used
  getStorageSync: (key) => {
    console.log('Mock Taro.getStorageSync called with key:', key);
    return null;
  },

  setStorageSync: (key, _data) => {
    console.log('Mock Taro.setStorageSync called with key:', key);
  },

  // Add environment info
  ENV_TYPE: {
    WEAPP: 'weapp',
    SWAN: 'swan',
    ALIPAY: 'alipay',
    TT: 'tt',
    QQ: 'qq',
    JD: 'jd',
    H5: 'h5'
  }
};

module.exports = mockTaro;
export default mockTaro;