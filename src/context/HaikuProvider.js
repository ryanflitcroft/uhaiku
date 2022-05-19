import { createContext, useReducer } from 'react';

export const haikuContext = createContext();

// haiku: {id: 1, title: 'seashore', content: 'this is the best haiku', image: 'image.url.com'}
const haikuReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_HAIKU':
      return [payload, ...state];
    case 'RESET':
      return payload;
    case 'UPDATE_HAIKU':
      return state.map((haiku) => (haiku.id === payload.id ? payload : haiku));
    case 'DELETE_HAIKU':
      return state.filter((haiku) => haiku.id !== payload.id);
    default:
      throw Error(`Unknown action: ${type}`);
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
