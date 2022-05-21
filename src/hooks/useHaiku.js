import { useContext, useEffect } from 'react';
import { haikuContext } from '../context/HaikuProvider';
import {
  getHaikus,
  createHaiku,
  updateHaikuById,
  deleteHaikuById,
} from '../services/fetch-utils';

export const useHaiku = () => {
  const context = useContext(haikuContext);

  if (context === undefined) {
    throw new Error('useHaiku must be used within HaikuProvider');
  }

  const { haikuList, dispatch } = context;

  useEffect(() => {
    if (haikuList) return;

    const load = async () => {
      try {
        const payload = await getHaikus();
        dispatch({ type: 'RESET', payload });
      } catch (error) {
        console.error(error);
        throw err;
      }
    };
    load();
  }, []);

  async function addHaiku(item) {
    const haiku = await createHaiku(item);
    dispatch({ type: 'ADD_HAIKU', payload: haiku });
  }

  async function updateHaiku(id, { title, line_one, line_two, line_three }) {
    const haiku = await updateHaikuById(id, {
      title,
      line_one,
      line_two,
      line_three,
    });

    dispatch({ type: 'UPDATE_HAIKU', payload: haiku });
  }

  async function deleteHaiku(id) {
    const payload = await deleteHaikuById(id);
    dispatch({ type: 'DELETE_HAIKU', payload });
  }

  return { haikuList, addHaiku, updateHaiku, deleteHaiku };
};
