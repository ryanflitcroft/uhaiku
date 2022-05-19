import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHaikuById } from '../../services/fetch-utils';

export default function HaikuDetail() {
  const [haiku, setHaiku] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getHaiku() {
      const data = await getHaikuById(id);
      setHaiku(data);
    }

    getHaiku();
  }, []);

  return (
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
    </section>
  );
}
