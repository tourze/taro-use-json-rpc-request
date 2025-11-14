// src/useJsonRpcRequest.ts
import { JsonRPC } from './JsonRPC';
import useSWR from 'swr';
import type {
  UseJsonRpcRequestOptions,
  UseJsonRpcRequestReturn,
  JsonRPCError
} from './types';

const useJsonRpcRequest = <T = any>(
  apiName: string,
  params: any = {},
  options: UseJsonRpcRequestOptions<T> = {}
): UseJsonRpcRequestReturn<T> => {
  const { swrOptions, onSuccess, onError } = options;

  const { data, error, mutate, isValidating, isLoading } = useSWR<T>(
    apiName ? [apiName, JSON.stringify(params)] : null,
    ([method, paramsStr]) => JsonRPC.request<T>(method as string, JSON.parse(paramsStr as string)),
    {
      ...swrOptions,
      onSuccess: (data: T) => {
        onSuccess?.(data);
        swrOptions?.onSuccess?.(data);
      },
      onError: (error: JsonRPCError) => {
        onError?.(error);
        swrOptions?.onError?.(error);
      },
    }
  );

  return {
    data,
    error: error as JsonRPCError | undefined,
    isLoading,
    isError: !!error,
    mutate,
    revalidate: () => mutate() as Promise<boolean>,
    isValidating,
  };
};

export default useJsonRpcRequest;