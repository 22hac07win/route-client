import { atom } from 'recoil';
import { UserState, ResState, ReqState, InputState } from '../types/type';

export const userState = atom<UserState>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const nextIdState = atom<string>({
  key: 'nextIdState',
  default: '',
  dangerouslyAllowMutability: true,
});

export const reqState = atom<ReqState>({
  key: 'reqState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const resState = atom<ResState>({
  key: 'resState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const inputState = atom<string>({
  key: 'inputState',
  default: '',
  dangerouslyAllowMutability: true,
});

export const tokenState = atom<string>({
  key: 'token',
  default: '',
  dangerouslyAllowMutability: true,
});
