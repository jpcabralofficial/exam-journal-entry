/** @format */
import { createContext } from 'react';
import { FlowContextType } from './type';

export const FlowContext = createContext<FlowContextType>({
  isLoading: false,
  setLoading: () => null,
});
