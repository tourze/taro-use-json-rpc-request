// TestComponent.tsx - 用于在开发环境测试Hook
import React from 'react';
import { useJsonRpcRequest, JsonRPC } from './index';
import { setupStorybookTaro } from './mocks';

// 确保在开发环境中设置Taro mock
if (typeof window !== 'undefined') {
  setupStorybookTaro();
}

export const TestComponent: React.FC = () => {
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // 测试Hook
  const { data, error: hookError, isLoading } = useJsonRpcRequest(
    'user.getProfile',
    { userId: '123' }
  );

  const testDirectCall = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      JsonRPC.init({
        baseURL: 'https://mock-api.example.com',
        appId: 'test-app',
        appSecret: 'test-secret',
        useAuthorization: true
      });

      const response = await JsonRPC.request('system.getStats', {});
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Direct call failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧪 Taro JSON-RPC Hook Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Hook 测试结果:</h2>
        {isLoading && <p>⏳ Hook 加载中...</p>}
        {hookError && <p style={{ color: 'red' }}>❌ Hook 错误: {hookError.message}</p>}
        {data && (
          <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '4px' }}>
            <p>✅ Hook 成功获取数据:</p>
            <pre style={{ fontSize: '12px' }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>直接API调用:</h2>
        <button
          onClick={testDirectCall}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ 测试中...' : '🚀 测试直接调用'}
        </button>

        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <p>❌ 直接调用错误: {error}</p>
          </div>
        )}

        {result && (
          <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
            <p>✅ 直接调用成功:</p>
            <pre style={{ fontSize: '12px' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        <h3>📋 测试状态:</h3>
        <ul>
          <li>Taro Mock: ✅ 已设置</li>
          <li>Hook调用: {isLoading ? '⏳ 进行中' : data ? '✅ 成功' : hookError ? '❌ 失败' : '⏸️ 未开始'}</li>
          <li>直接调用: {loading ? '⏳ 进行中' : result ? '✅ 成功' : error ? '❌ 失败' : '⏸️ 未开始'}</li>
        </ul>
      </div>
    </div>
  );
};

export default TestComponent;