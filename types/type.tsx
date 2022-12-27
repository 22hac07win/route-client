import { User } from 'firebase/auth';

export type UserState = User | null;
export type Text = string | null;

export type ReqState = Req | null;

export type InputState = Input | null;

export type Input = {
  key: string;
  body: string;
};

export type Req = {
  nextId: string;
  input?: Input;
  optionText?: string;
};

export type Option = {
  optionNumber: number;
  optionText: string;
  nextBlockId: string;
};

export type BlockType = 'Text' | 'Input' | 'Option' | 'Input';

export type ResState = Res | null;

export type Res = {
  id: string;
  blockType: BlockType;
  text: string;
  inputKey?: string;
  options?: Option[];
  nextId?: string;
};
