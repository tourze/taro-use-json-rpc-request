# taro-use-json-rpc-request

一个为Taro应用设计的JSON-RPC 2.0请求Hook，集成SWR进行数据管理和缓存。

## 特性

- 🚀 基于JSON-RPC 2.0协议
- ⚡ 集成SWR进行数据缓存和重新验证
- 🔐 支持JWT认证和HMAC-SHA1签名
- 📱 专为Taro框架优化
- 🎯 完全TypeScript支持
- 🔄 自动错误处理和重试
- 📦 轻量级，零依赖核心功能

## 安装

```bash
npm install taro-use-json-rpc-request
# 或
yarn add taro-use-json-rpc-request
# 或
pnpm add taro-use-json-rpc-request
```

## 依赖

此包需要以下对等依赖：

```json
{
  "@tarojs/taro": ">=3.3.0",
  "react": ">=16.8.0"
}
```

## 基本使用

### 1. 配置JsonRPC

在你的应用入口文件（如`app.tsx`）中初始化JsonRPC：

```tsx
import { JsonRPC } from 'taro-use-json-rpc-request';

JsonRPC.init({
  baseURL: 'https://your-api-domain.com',
  appId: 'your-app-id',
  appSecret: 'your-app-secret', // 可选，用于签名
  useAuthorization: true, // 使用Bearer token
  useBase64: false, // 是否使用Base64编码
  timeout: 10000 // 请求超时时间
});
```

### 2. 使用Hook

```tsx
import React from 'react';
import { useJsonRpcRequest } from 'taro-use-json-rpc-request';

const UserProfile: React.FC = () => {
  const { data, error, isLoading } = useJsonRpcRequest(
    'user.getProfile',
    { userId: '123' }
  );

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  );
};
```

## 高级使用

### 带JWT认证的请求

```tsx
const { data, error } = useJsonRpcRequest(
  'user.getOrders',
  { status: 'active' },
  {
    swrOptions: {
      // SWR选项
      revalidateOnFocus: true,
      refreshInterval: 30000
    },
    onSuccess: (data) => {
      console.log('获取订单成功:', data);
    },
    onError: (error) => {
      console.error('获取订单失败:', error);
    }
  }
);
```

### 直接调用JsonRPC

```tsx
import { JsonRPC } from 'taro-use-json-rpc-request';

// 在事件处理器或其他逻辑中直接调用
const handleSubmit = async () => {
  try {
    const result = await JsonRPC.request('user.update', {
      name: '新名称',
      email: 'new@example.com'
    }, {
      withJwt: true, // 自动添加JWT token
      headers: {
        'Custom-Header': 'value'
      }
    });

    console.log('更新成功:', result);
  } catch (error) {
    console.error('更新失败:', error);
  }
};
```

### 手动重新验证数据

```tsx
const { data, mutate } = useJsonRpcRequest('user.getData', {});

const refreshData = () => {
  // 手动重新获取数据
  mutate();
};
```

## API 文档

### JsonRPC

#### `JsonRPC.init(config)`

初始化JsonRPC配置。

**参数:**
- `config: JsonRPCConfig`
  - `baseURL: string` - API基础URL
  - `appId?: string` - 应用ID，用于签名
  - `appSecret?: string` - 应用密钥，用于签名
  - `signKey?: string` - 额外的签名密钥
  - `useAuthorization?: boolean` - 是否使用Bearer token格式，默认false
  - `useBase64?: boolean` - 是否对请求体进行Base64编码，默认false
  - `timeout?: number` - 请求超时时间（毫秒），默认10000

#### `JsonRPC.request(method, params, options?)`

发送JSON-RPC请求。

**参数:**
- `method: string` - RPC方法名
- `params?: any` - 请求参数
- `options?: RequestOptions`
  - `withJwt?: boolean` - 是否自动添加JWT token
  - `timeout?: number` - 本次请求的超时时间
  - `headers?: Record<string, string>` - 额外的请求头
  - `cache?: number` - 缓存时间（毫秒）

**返回:**
- `Promise<T>` - 请求结果

### useJsonRpcRequest

#### `useJsonRpcRequest<T>(method, params?, options?)`

用于JSON-RPC请求的React Hook。

**参数:**
- `method: string` - RPC方法名
- `params?: any` - 请求参数
- `options?: UseJsonRpcRequestOptions<T>`
  - `swrOptions?: any` - SWR配置选项
  - `onSuccess?: (data: T) => void` - 成功回调
  - `onError?: (error: JsonRPCError) => void` - 错误回调

**返回:**
- `UseJsonRpcRequestReturn<T>`
  - `data: T | undefined` - 响应数据
  - `error: JsonRPCError | undefined` - 错误信息
  - `isLoading: boolean` - 是否正在加载
  - `isError: boolean` - 是否有错误
  - `mutate: Function` - 手动更新数据的函数
  - `revalidate: Function` - 重新验证数据的函数
  - `isValidating: boolean` - 是否正在验证

## 类型定义

```typescript
interface JsonRPCError {
  code: number;
  message: string;
  data?: any;
}

interface JsonRPCConfig {
  baseURL: string;
  appId?: string;
  appSecret?: string;
  signKey?: string;
  useAuthorization?: boolean;
  useBase64?: boolean;
  timeout?: number;
}
```

## 开发

克隆项目并安装依赖：

```bash
git clone <repository-url>
cd taro-use-json-rpc-request
npm install
```

### 开发模式

```bash
# 监听源代码变化并构建
npm run dev
```

### 构建项目

```bash
# 构建生产版本
npm run build
```

### Storybook 开发

本项目集成了Storybook用于开发和测试Hook功能：

```bash
# 启动Storybook开发服务器
npm run storybook

# 构建Storybook静态文件
npm run build-storybook
```

Storybook将在 http://localhost:6010 启动，你可以在其中：

- 🧪 测试 `useJsonRpcRequest` Hook的各种使用场景
- 🔧 测试 `JsonRPC` 类的直接API调用
- 📚 查看完整的API文档和使用示例
- 🎯 交互式测试不同的参数组合

由于这是Taro Hook库，Storybook中包含了完整的Taro环境模拟器，让你可以在浏览器中直接测试Taro相关功能。

## 示例

查看 `examples` 目录获取完整的使用示例。

## 许可证

MIT License