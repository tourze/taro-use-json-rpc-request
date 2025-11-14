// JsonRPC.ts
import Taro from '@tarojs/taro';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import { Base64 } from 'js-base64';
import md5 from 'md5';
import { nanoid } from 'nanoid';
import queryString from 'query-string';
import type {
  JsonRPCConfig,
  RequestOptions,
  JsonRPCResponse,
  JsonRPCError,
  JsonRPCRequest
} from './types';

const VERSION = '2.0';

export class JsonRPC {
  private static config: JsonRPCConfig;
  private static sessionId = `${nanoid()}-${Date.now()}`;
  private static routeId = 1;

  static init(config: JsonRPCConfig) {
    this.config = config;
    this.updateRouteId();
  }

  static setBaseURL(url: string) {
    if (this.config) this.config.baseURL = url;
  }

  private static updateRouteId() {
    const pages = Taro.getCurrentPages();
    const currentPath = pages[pages.length - 1]?.route || '';
    // 简单路径变化检测
    if (currentPath && currentPath !== this.lastPath) {
      this.lastPath = currentPath;
      this.routeId++;
    }
  }
  private static lastPath = '';

  static async request<T = any>(
    method: string,
    params: any = {},
    options: RequestOptions = {}
  ): Promise<T> {
    if (!this.config?.baseURL) {
      throw new Error('JsonRPC 未初始化，请调用 JsonRPC.init()');
    }

    this.updateRouteId();

    const id = nanoid();
    const payload = { jsonrpc: VERSION, method, params, id };
    const url = this.buildURL(method);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // JWT
    if (options.withJwt) {
      try {
        const jwt = await Taro.getStorageSync('JWT');
        if (jwt) {
          headers[this.config.useAuthorization ? 'Authorization' : 'JWT'] = 
            this.config.useAuthorization ? `Bearer ${jwt}` : jwt;
        }
      } catch (e) {}
    }

    // 签名
    if (this.config.appSecret) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const nonce = this.generateNonce();
      const data = JSON.stringify(payload) + timestamp + nonce;
      const signature = HmacSHA1(data, this.config.appSecret).toString();

      headers['Signature-AppID'] = this.config.appId || '';
      headers['Signature-Nonce'] = nonce;
      headers['Signature-Timestamp'] = timestamp;
      headers['Signature'] = signature;

      if (this.config.signKey) {
        headers['Json-RPC-Sign'] = md5(`${this.config.signKey}${JSON.stringify(payload)}${timestamp}`);
      }
    }

    let data = JSON.stringify(payload);
    if (this.config.useBase64 ?? false) {
      data = Base64.encode(data);
    }

    try {
      const res = await Taro.request({
        url,
        method: 'POST',
        data,
        header: headers,
        timeout: options.timeout ?? this.config.timeout ?? 10000,
        dataType: 'json',
      });

      let result: JsonRPCResponse<T> = res.data;

      if (this.config.useBase64 && typeof result.result === 'string') {
        result.result = JSON.parse(Base64.decode(result.result));
      }

      if (result.error) {
        const error: JsonRPCError = {
          code: result.error.code ?? -1,
          message: result.error.message ?? '请求失败',
          data: result.error.data
        };
        throw error;
      }

      if (!result.result) {
        throw { code: -1, message: 'Invalid response' } as JsonRPCError;
      }

      return result.result;
    } catch (error: any) {
      const rpcError: JsonRPCError = {
        code: error.code ?? -1,
        message: error.message ?? '请求失败',
        data: error,
      };
      throw rpcError;
    }
  }

  private static buildURL(method: string): string {
    const params: any = {
      ___method: method,
      __sessionId: this.sessionId,
      __routeId: this.routeId,
    };

    // 可选：mid, ts
    try {
      const mid = Taro.getStorageSync('KEY_SHARE_MID');
      if (mid) params.__mid = mid;
    } catch (e) {}
    try {
      const ts = Taro.getStorageSync('TRAFFIC_SOURCE');
      if (ts) params.__ts = ts;
    } catch (e) {}

    const base = this.config.baseURL.replace(/\/+$/, '');
    const endpoint = `${base}/api/json-rpc?i=1`;
    const query = queryString.stringify(params);
    return `${endpoint}?${query}`;
  }

  private static generateNonce(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
}