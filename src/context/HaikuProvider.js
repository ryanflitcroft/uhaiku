import { createContext, useReducer } from "react";
import { createHaiku, getHaikus } from "../services/fetch-utils";

export const HaikuContext = createContext();

// haiku: {id: 1, title: 'seashore', content: 'this is the best haiku', image: 'image.url.com'}
const haikuReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HAIKU':
      await createHaiku(action.payload);
      return action.payload;
  }
}

export default async function HaikuProvider({ children }) {
  const initialHaikus = await getHaikus();
  const [haikuList, dispatch] = useReducer(haikuReducer, initialHaikus || []);

  function addHaiku(haiku) {
    dispatch({ type: 'ADD_HAIKU', payload: haiku });
  }

  const haikuState = {
    addHaiku,
    haikuList
  };

  return (
    <HaikuContext.Provider value={haikuState}>
      {children}
    </HaikuContext.Provider>
  );
}