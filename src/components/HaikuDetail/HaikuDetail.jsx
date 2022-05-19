import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHaikuById } from '../../services/fetch-utils';
import { useAuth } from '../../hooks/useAuth';
import { useHaiku } from '../../hooks/useHaiku';

export default function HaikuDetail() {
  const [haiku, setHaiku] = useState({});
  const [title, setTitle] = useState('');
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [lineThree, setLineThree] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const { updateHaiku } = useHaiku();
  const action = user.id === haiku.user_id ? 'edit' : 'copy';

  useEffect(() => {
    async function getHaiku() {
      const data = await getHaikuById(id);
      setHaiku(data);
    }

    getHaiku();
  }, []);

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
    const update = await updateHaiku( haiku.id, { 
      title: title,
      line_one: lineOne,
      line_two: lineTwo,
      line_three: lineThree
    });
    
    // setHaiku(update);
    setIsEditing(false);
  }

  let content;
  
  if (!isEditing) {
    content = (
    <section>
      <figure>
        <h2>{haiku.title}</h2>
        <p>By: {haiku.profiles?.username}</p>
        <img src={haiku.image} alt={haiku.alt}/>
        <figcaption>
          <span>{haiku.line_one}</span>
          <span>{haiku.line_two}</span>
          <span>{haiku.line_three}</span>
        </figcaption>
      </figure>
      <button onClick={() => setIsEditing(true)}>{action}</button>
      <button>Delete</button>
    </section>
    )} else {
      content = (
      <section>
      <form
        onSubmit={handleUpdate}
      >
        <label htmlFor="title">Give your Haiku a title:</label>
        <input 
          type="text"
          name="title"
          placeholder={haiku.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required/>
        <p>By: {haiku.profiles?.username}</p>
        <img src={haiku.image} alt={haiku.alt}/>
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
      <button>Save</button>
      </form>
    </section>
    )}
    return content;
  }


