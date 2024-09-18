import { RSA_PUBLIC_KEY } from '@/secure';
import { isUnDef, rsaEncryptAlgorithm } from '@suey/pkg-utils';
import { apiPost } from './declare';
import type { ApiPromiseLike } from './declare';

// ==================================================================================

export type LoginResponse = {
  userinfo: {
    id: number;
    token: string;
  }
}

export interface LoginReqPayload {
  username: string;
  password: string;
}
export type LoginReqPromise = ApiPromiseLike<LoginResponse, null>;
export const loginReq = (payload: LoginReqPayload) => {

  return new Promise<LoginResponse>((resolve, reject) => {
    if (isUnDef(payload.username) || isUnDef(payload.password)) return reject({
      data: {
        userinfo: {
          id: null,
          token: null
        }
      }
    })

    return resolve({
      data: {
        userinfo: {
          id: 23,
          token: 'asdsadewrfewrexxxawe'
        }
      }
    } as any)
  }) as unknown as ApiPromiseLike<LoginResponse, LoginResponse>;



  return apiPost<LoginResponse, {}>('/user/login', {
    hConfig: {
      needAuth: false
    },
    data: {
      username: payload.username,
      password: rsaEncryptAlgorithm(payload.password, RSA_PUBLIC_KEY)
    }
  });
}

// ==================================================================================

export type UserinfoResponse = Partial<{
  id: number;
  username: string;
  nickname: string;
  roles: string[];
  isVip: number;
  vipTime: number;
  sex: boolean | null;
  avatarUrl: string;
  age: number;
  qq: string;
  email: string;
  phone: string;
  address: string;
}>;
export type GetUserinfoReqPromise = ApiPromiseLike<UserinfoResponse>;
export const getUserinfoReq = () => {
  return apiPost<UserinfoResponse>('/user/getUserinfo', {

  });
}


// ==================================================================================

export type RegisterSuccessResponse = {

}
export const registerReq = () => {
  return apiPost<RegisterSuccessResponse, null>('/user/register', {

  })
}


export const logoutReq = () => {
  return apiPost<null, null>('/user/logout');
}
