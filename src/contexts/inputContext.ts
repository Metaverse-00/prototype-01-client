import { createContext } from 'react';

export type KeyInput = {
  w: boolean,
  a: boolean,
  s: boolean,
  d: boolean,
}

export type KeyInputMap = {
  [sessionId: string]: KeyInput
}

export interface InputContextInterface {
  keyInputs: KeyInputMap
}

export const InputContext = createContext<InputContextInterface | null>(null);
