import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import HaikuUpdate from '../HaikuUpdate/HaikuUpdate';
import { getHaikuById } from '../../services/fetch-utils';
import style from './HaikuDetail.css';

export default function HaikuDetail() {
  const [haiku, setHaiku] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const isOwner = user.id === haiku.user_id;
  const action = isOwner ? 'edit' : 'copy';

  useEffect(() => {
    async function getData() {
      const data = await getHaikuById(id);
      setHaiku(data);
    }
    getData();
  }, []);

  let content;

  if (!isEditing) {
    content = (
      <section className={style.detail}>
        <figure>
          <h2>{haiku.title}</h2>
          <p>by {haiku.profiles?.username}</p>
          <img src={haiku.image} alt={haiku.alt} />
          <figcaption>
            <span>{haiku.line_one}</span>
            <span>{haiku.line_two}</span>
            <span>{haiku.line_three}</span>
          </figcaption>
        </figure>
        <button onClick={() => setIsEditing(true)}>{action}</button>
      </section>
    );
  } else {
    content = (
      <HaikuUpdate
        haiku={haiku}
        setHaiku={setHaiku}
        user={user}
        isOwner={isOwner}
        setIsEditing={setIsEditing}
      />
    );
  }
  return content;
}
