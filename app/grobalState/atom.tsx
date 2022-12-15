import { atom } from 'recoil';
import { UserState } from '../types/type';

export const userState = atom<UserState>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const messageState = atom<string>({
  key: 'note',
  default: '',
  dangerouslyAllowMutability: true,
});

export const sendTextState = atom<string>({
  key: 'sendMessage',
  default: '',
  dangerouslyAllowMutability: true,
});

export const tokenState = atom<string>({
  key: 'token',
  default: '',
  dangerouslyAllowMutability: true,
});
