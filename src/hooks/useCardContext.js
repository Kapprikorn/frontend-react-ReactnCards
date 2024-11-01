import { useContext } from 'react';
import CardContext from '../context/CardContext.jsx';

export const useCardContext = () => {
  return useContext(CardContext);
};