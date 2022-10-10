import { createContext } from 'react';

export type KeyInput = {
  w: boolean,
  a: boolean,
  s: boolean,
  d: boolean,
}

export interface InputContextInterface {
  [sessionId: string]: KeyInput
}

export const InputContext = createContext<InputContextInterface | null>(null);
