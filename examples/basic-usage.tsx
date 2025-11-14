// examples/basic-usage.tsx
import React from 'react';
import { useJsonRpcRequest, JsonRPC } from 'taro-use-json-rpc-request';

// 在应用入口处初始化
// JsonRPC.init({
//   baseURL: 'https://your-api-domain.com',
//   appId: 'your-app-id',
//   appSecret: 'your-app-secret',
//   useAuthorization: true
// });

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const UserProfileExample: React.FC = () => {
  // 基本使用
  const { data, error, isLoading } = useJsonRpcRequest<UserProfile>(
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

export const AdvancedExample: React.FC = () => {
  // 带选项的使用
  const { data, mutate } = useJsonRpcRequest<UserProfile[]>(
    'user.getFriends',
    { userId: '123' },
    {
      swrOptions: {
        revalidateOnFocus: true,
        refreshInterval: 30000,
      },
      onSuccess: (data) => {
        console.log('获取好友列表成功:', data);
      },
      onError: (_error) => {
        console.error('获取好友列表失败');
      },
    }
  );

  const handleRefresh = () => {
    mutate();
  };

  return (
    <div>
      <h2>好友列表</h2>
      <button onClick={handleRefresh}>刷新</button>
      {data?.map((friend) => (
        <div key={friend.id}>
          <span>{friend.name}</span>
        </div>
      ))}
    </div>
  );
};

// 直接使用 JsonRPC 类
export const DirectApiExample: React.FC = () => {
  const updateUser = async () => {
    try {
      const result = await JsonRPC.request<UserProfile>(
        'user.updateProfile',
        {
          name: '新名称',
          email: 'new@example.com',
        },
        {
          withJwt: true,
          headers: {
            'Custom-Header': 'value',
          },
        }
      );

      console.log('更新成功:', result);
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  return (
    <div>
      <button onClick={updateUser}>更新资料</button>
    </div>
  );
};