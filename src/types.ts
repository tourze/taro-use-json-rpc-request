// types.ts
export interface JsonRPCConfig {
  baseURL: string;
  appId?: string;
  appSecret?: string;
  signKey?: string;
  useAuthorization?: boolean;
  useBase64?: boolean;
  timeout?: number;
}

export interface RequestOptions {
  withJwt?: boolean;
  timeout?: number;
  headers?: Record<string, string>;
  cache?: number;
}

export interface JsonRPCResponse<T = any> {
  jsonrpc: string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id: string;
}

export interface JsonRPCError {
  code: number;
  message: string;
  data?: any;
}

export interface JsonRPCRequest {
  jsonrpc: string;
  method: string;
  params?: any;
  id: string;
}

export type UseJsonRpcRequestOptions<T = any> = {
  swrOptions?: any;
  onSuccess?: (data: T) => void;
  onError?: (error: JsonRPCError) => void;
};

export type UseJsonRpcRequestReturn<T = any> = {
  data: T | undefined;
  error: JsonRPCError | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (data?: T | Promise<T> | ((currentData?: T) => T | Promise<T>), shouldRevalidate?: boolean) => Promise<T | undefined>;
  revalidate: () => Promise<boolean>;
  isValidating: boolean;
};