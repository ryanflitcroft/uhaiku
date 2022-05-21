import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useHaiku } from '../../hooks/useHaiku';
import { getHaikuById } from '../../services/fetch-utils';

export default function HaikuUpdate({
  haiku,
  setHaiku,
  user,
  isOwner,
  setIsEditing,
}) {
  const { addHaiku, updateHaiku, deleteHaiku } = useHaiku();
  const [title, setTitle] = useState('');
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [lineThree, setLineThree] = useState('');
  const history = useHistory();

  useEffect(() => {
    handleFormState();
  }, [haiku]);

  function handleFormState() {
    setTitle(haiku.title);
    setLineOne(haiku.line_one);
    setLineTwo(haiku.line_two);
    setLineThree(haiku.line_three);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (isOwner) {
      await updateHaiku(haiku.id, {
        title: title,
        line_one: lineOne,
        line_two: lineTwo,
        line_three: lineThree,
      });
      setIsEditing(false);
      const updated = await getHaikuById(haiku.id);
      setHaiku(updated);
    } else {
      await addHaiku({
        user_id: user.id,
        image: haiku.image,
        alt: haiku.alt,
        title,
        line_one: lineOne,
        line_two: lineTwo,
        line_three: lineThree,
      });
      history.replace('/');
    }
  }

  async function handleDelete() {
    await deleteHaiku(haiku.id);
    history.replace('/');
  }
  return (
    <>
      <section>
        <form aria-label='input and submit data to update your haiku' onSubmit={handleUpdate}>
          <label htmlFor="title">Give your Haiku a title:</label>
          <input
            type="text"
            name="title"
            placeholder={haiku.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <img src={haiku.image} alt={haiku.alt} />
          <label htmlFor="lineOne">Five syllables:</label>
          <input
            type="text"
            name="lineOne"
            placeholder={haiku.line_one}
            value={lineOne}
            onChange={(e) => setLineOne(e.target.value)}
            required
          />
          <label htmlFor="lineTwo">Seven syllables:</label>
          <input
            type="text"
            name="lineTwo"
            placeholder={haiku.line_two}
            value={lineTwo}
            onChange={(e) => setLineTwo(e.target.value)}
            required
          />
          <label htmlFor="lineThree">Five syllables:</label>
          <input
            type="text"
            name="lineThree"
            placeholder={haiku.line_three}
            value={lineThree}
            onChange={(e) => setLineThree(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          {!isOwner && (
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          )}
          {isOwner && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </form>
      </section>
    </>
  );
}
