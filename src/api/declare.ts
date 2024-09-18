import { REQ_METHODS, createApiRequest, isUndefined, ApiPromiseResultTypeBuilder } from '@suey/pkg-utils';
import { StringFilters } from '@libs/filters';
import type { AxiosError } from 'axios';
import { getAccessToken } from '@/features';

export type { RequestConfig, Interceptors } from '@suey/pkg-utils';
export { REQ_METHODS, createApiRequest, createRequest } from '@suey/pkg-utils';

/** 请求 hConfig 配置 */
export interface ApiHConfig {
  /**
   * 默认都需要认证
   * @default true
   */
  needAuth?: boolean;
}

/** 基本响应结构体的内容 */
export interface ApiBasicResponse {
  status: number;
  flag: string;
  data: any;
  more?: {
    pako?: boolean;
  }
  descriptor: string;
  _t: number;
}
export interface ApiSuccessResponse extends ApiBasicResponse {
  flag: 'ApiResponseOk';
}
export interface ApiFailResponse extends ApiBasicResponse {
  flag: 'ApiResponseFal';

  /** 更多的错误信息 */
  INNER: {
    stack: string;
    name: AxiosError<Omit<ApiFailResponse, 'INNER'>, any>['name'];
    config: AxiosError<Omit<ApiFailResponse, 'INNER'>, any>['config'];
    request: AxiosError<Omit<ApiFailResponse, 'INNER'>, any>['request'];
    response: AxiosError<Omit<ApiFailResponse, 'INNER'>, any>['response'];
  }
}

/**
 * RApiPromiseLike, 可以通过 then, catch 获得不同的相应数据类型提示
 * 也可以通过 toPicket 获取类型
 *
 * ```ts
 * declare const pr: RApiPromiseLike<number,  string>;
 * const [err, res] = await toPicket(pr);
 * if (err) {
 *   console.log(err.descriptor);
 *   return;
 * }
 * res;
 * //
 * ```
 */
export type ApiPromiseLike<Success, Fail = {}> = ApiPromiseResultTypeBuilder<ApiSuccessResponse, ApiFailResponse, Success, Fail>;


export const { apiGet, apiPost, request, createApi } = createApiRequest<ApiHConfig, ApiSuccessResponse, ApiFailResponse>('http://oupro.cn/api/v1.0.0/', {
  timeout: 5000
}, {
  async onFulfilled(config) {
    if (!config.hConfig) config.hConfig = { needAuth: true };
    if (isUndefined(config.hConfig.needAuth)) config.hConfig.needAuth = true;
    if (config.hConfig.needAuth && config.headers) {
      // TODO:
      const accessToken = await getAccessToken();
      if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
      // config.headers['_t'] = `${+new Date()}`;
    }
  },
}, {
  onFulfilled(response) {
    // nestjs server response.
    if (response.data && response.data.flag && response.data.status) {
      if (response.data.flag === 'ApiResponseOk') return Promise.resolve(response.data);
      if (response.data.flag === 'ApiResponseFal') {
        console.error(response.data);

        return Promise.reject(response.data);
      }

      return response;
    }
    return response;
  },
  onRejected(err) {
    return Promise.reject<ApiFailResponse>({
      status: +(err.response?.status ?? 0),
      flag: 'ApiResponseFal',
      data: err.response?.data,
      descriptor: StringFilters.toValidStr(err.message, '未知错误'),
      _t: +new Date(),
      INNER: {
        stack: err.stack,
        config: err.config,
        request: err.request,
        response: err.response,
        name: err.name
      }
    } as ApiFailResponse);
  }
})

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDelete = createApi(REQ_METHODS.DELETE);

export const apiPatch = createApi('PATCH');
