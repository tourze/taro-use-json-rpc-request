// Taro环境模拟器，用于在Storybook中测试Taro Hook
export const createTaroMock = () => {
  // 模拟的页面栈
  const mockPages = [
    { route: 'pages/index/index' },
  ];

  const mockStorage: Record<string, any> = {};

  return {
    // 模拟Taro.request
    request: async (options: any) => {
      console.log('🔍 Mock Taro.request:', options);

      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟JSON-RPC响应
      const url = options.url;
      if (url?.includes('json-rpc')) {
        const method = new URL(url).searchParams.get('___method');

        // 模拟不同的API响应
        switch (method) {
          case 'user.getProfile':
            return {
              data: {
                jsonrpc: '2.0',
                result: {
                  id: '123',
                  name: '张三',
                  email: 'zhangsan@example.com',
                  avatar: 'https://example.com/avatar.jpg'
                },
                id: 'mock-id-1'
              }
            };

          case 'user.getFriends':
            return {
              data: {
                jsonrpc: '2.0',
                result: [
                  { id: '456', name: '李四', email: 'lisi@example.com' },
                  { id: '789', name: '王五', email: 'wangwu@example.com' }
                ],
                id: 'mock-id-2'
              }
            };

          case 'user.updateProfile':
            return {
              data: {
                jsonrpc: '2.0',
                result: {
                  id: '123',
                  ...options.data?.params,
                  updatedAt: new Date().toISOString()
                },
                id: 'mock-id-3'
              }
            };

          case 'system.getStats':
            return {
              data: {
                jsonrpc: '2.0',
                result: {
                  totalUsers: 10000,
                  activeUsers: 2500,
                  todayRegistrations: 42
                },
                id: 'mock-id-4'
              }
            };

          default:
            // 默认错误响应
            return {
              data: {
                jsonrpc: '2.0',
                error: {
                  code: -32601,
                  message: `Method not found: ${method}`,
                  data: null
                },
                id: 'mock-id-error'
              }
            };
        }
      }

      // 默认响应
      return {
        data: { success: true },
        statusCode: 200,
        header: {}
      };
    },

    // 模拟Taro.getCurrentPages
    getCurrentPages: () => {
      console.log('🔍 Mock Taro.getCurrentPages:', mockPages);
      return mockPages;
    },

    // 模拟Taro.getStorageSync
    getStorageSync: (key: string) => {
      console.log('🔍 Mock Taro.getStorageSync:', key);
      return mockStorage[key] || '';
    },

    // 模拟Taro.setStorageSync
    setStorageSync: (key: string, value: any) => {
      console.log('🔍 Mock Taro.setStorageSync:', key, value);
      mockStorage[key] = value;
    },

    // 模拟Taro.removeStorageSync
    removeStorageSync: (key: string) => {
      console.log('🔍 Mock Taro.removeStorageSync:', key);
      delete mockStorage[key];
    },

    // 清除mock数据
    clearMockData: () => {
      Object.keys(mockStorage).forEach(key => {
        delete mockStorage[key];
      });
      mockPages.length = 0;
      mockPages.push({ route: 'pages/index/index' });
    },

    // 设置mock数据
    setMockStorage: (data: Record<string, any>) => {
      Object.assign(mockStorage, data);
    },

    // 设置mock页面栈
    setMockPages: (pages: any[]) => {
      mockPages.length = 0;
      mockPages.push(...pages);
    }
  };
};

// 创建全局Taro模拟实例
export const taroMock = createTaroMock();

// Taro接口定义
export interface TaroMockInterface {
  request: (options: any) => Promise<any>;
  getCurrentPages: () => any[];
  getStorageSync: (key: string) => any;
  setStorageSync: (key: string, value: any) => void;
  removeStorageSync: (key: string) => void;
}