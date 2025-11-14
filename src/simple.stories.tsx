import React from 'react';

export default {
  title: 'Taro JSON-RPC Library',
  component: () => 'Demo Component',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Taro JSON-RPC Request Hook

这是一个为Taro应用设计的JSON-RPC 2.0请求Hook，集成SWR进行数据管理和缓存。

## 主要特性

- 🚀 基于JSON-RPC 2.0协议
- ⚡ 集成SWR进行数据缓存和重新验证
- 🔐 支持JWT认证和HMAC-SHA1签名
- 📱 专为Taro框架优化
- 🎯 完全TypeScript支持
- 🔄 自动错误处理和重试
- 📦 轻量级，零依赖核心功能

## 基本使用

\`\`\`typescript
import { useJsonRpcRequest, JsonRPC } from 'taro-use-json-rpc-request';

// 初始化
JsonRPC.init({
  baseURL: 'https://your-api-domain.com',
  appId: 'your-app-id',
  appSecret: 'your-app-secret'
});

// 使用Hook
const { data, error, isLoading } = useJsonRpcRequest(
  'user.getProfile',
  { userId: '123' }
);
\`\`\`

## 项目已完成功能

✅ **完整的npm包配置**
- 支持ESM和CJS格式
- 完整的TypeScript类型定义
- 优化的构建配置

✅ **JsonRPC核心类**
- JSON-RPC 2.0协议实现
- JWT认证支持
- HMAC-SHA1签名验证
- Base64编码支持
- 完整的错误处理

✅ **useJsonRpcRequest Hook**
- 基于SWR的数据获取
- 自动缓存和重新验证
- 支持自定义配置
- 完整的TypeScript支持

## 使用方法

1. 安装包：\`npm install taro-use-json-rpc-request\`
2. 初始化JsonRPC配置
3. 在组件中使用useJsonRpcRequest Hook
4. 或者直接使用JsonRPC类进行API调用
        `
      }
    }
  },
};

const BasicUsageComponent: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxWidth: '500px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3>🚀 基础使用示例</h3>
      <p>展示 useJsonRpcRequest Hook 的基本用法</p>

      <div style={{ marginTop: '16px', background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
        <h4>示例数据:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto', margin: '8px 0' }}>
{`{
  "id": "123",
  "name": "张三",
  "email": "zhangsan@example.com",
  "avatar": "https://example.com/avatar.jpg"
}`}
        </pre>
      </div>

      <div style={{ marginTop: '16px', background: '#e8f5e8', padding: '12px', borderRadius: '4px' }}>
        <h4>代码示例:</h4>
        <pre style={{ fontSize: '12px', background: '#fff', padding: '8px', borderRadius: '4px', margin: '8px 0' }}>
{`const { data, error, isLoading } = useJsonRpcRequest(
  'user.getProfile',
  { userId: '123' }
);`}
        </pre>
        <p style={{ margin: '8px 0 0 0', color: '#2e7d32', fontSize: '14px' }}>
          ✅ 轻松获取API数据，自动处理加载状态和错误
        </p>
      </div>
    </div>
  );
};

const ConfigurationComponent: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxWidth: '600px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3>⚙️ JsonRPC 配置示例</h3>
      <p>展示如何配置JsonRPC客户端</p>

      <div style={{ marginTop: '16px', background: '#f8f9fa', padding: '16px', borderRadius: '4px' }}>
        <h4>主要配置选项:</h4>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li><code style={{ background: '#e3f2fd', padding: '2px 4px', borderRadius: '3px' }}>baseURL</code> - API基础URL (必填)</li>
          <li><code style={{ background: '#e3f2fd', padding: '2px 4px', borderRadius: '3px' }}>appId</code> - 应用ID，用于签名验证</li>
          <li><code style={{ background: '#e3f2fd', padding: '2px 4px', borderRadius: '3px' }}>appSecret</code> - 应用密钥，用于HMAC-SHA1签名</li>
          <li><code style={{ background: '#e3f2fd', padding: '2px 4px', borderRadius: '3px' }}>useAuthorization</code> - 是否使用Bearer Token格式</li>
          <li><code style={{ background: '#e3f2fd', padding: '2px 4px', borderRadius: '3px' }}>timeout</code> - 请求超时时间 (毫秒)</li>
        </ul>

        <div style={{ marginTop: '16px' }}>
          <h5>示例配置:</h5>
          <pre style={{ fontSize: '12px', background: '#fff', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}>
{`JsonRPC.init({
  baseURL: 'https://api.example.com',
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  useAuthorization: true,
  timeout: 10000
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const BasicUsage = {
  name: '基础使用',
  render: () => <BasicUsageComponent />,
  parameters: {
    docs: {
      description: {
        story: '最基本的使用方式，展示如何获取用户资料数据。'
      }
    }
  }
};

export const Configuration = {
  name: '配置说明',
  render: () => <ConfigurationComponent />,
  parameters: {
    docs: {
      description: {
        story: '展示JsonRPC客户端的各种配置选项和用法。'
      }
    }
  }
};