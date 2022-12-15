import { User } from 'firebase/auth';

export type UserState = User | null;
export type Text = string | null;

export type Request = {
  nextId: string;
  input?: string;
  optionText?: string;
};

export type Option = {
  optionNumber: number;
  optionText: string;
  nextBlockId: string;
};

export type BlockType = 'Text' | 'Input' | 'Option' | 'Input';

export type Response = {
  id: string;
  blockType: BlockType;
  text: string;
  haveInput: boolean;
  options?: Option[];
  nextId?: string;
};
