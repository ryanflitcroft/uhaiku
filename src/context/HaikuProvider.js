import { createContext, useReducer } from 'react';
import { createHaiku, getHaikus } from '../services/fetch-utils';

export const haikuContext = createContext();

// haiku: {id: 1, title: 'seashore', content: 'this is the best haiku', image: 'image.url.com'}
const haikuReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_HAIKU':
      return [payload, ...state];
    case 'RESET':
      return payload;
  }
};

export default function HaikuProvider({ children }) {
  const [haikuList, dispatch] = useReducer(haikuReducer);

  const haikuState = {
    haikuList,
    dispatch,
  };

  return (
    <haikuContext.Provider value={haikuState}>{children}</haikuContext.Provider>
  );
}
