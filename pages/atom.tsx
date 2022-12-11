import { atom } from 'recoil';
import { User } from 'firebase/auth';

export type AuthState = User | null;

export const userState = atom<AuthState>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const noteState = atom<string>({
  key: 'note',
  default: '',
  dangerouslyAllowMutability: true,
});

export const tokenState = atom<string>({
  key: 'token',
  default: '',
  dangerouslyAllowMutability: true,
});
