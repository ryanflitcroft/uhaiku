import React from 'react';
import { Link } from 'react-router-dom';
import { useHaiku } from '../../hooks/useHaiku';
import HaikuItem from '../HaikuItem/HaikuItem';

export default function HaikuList() {
  const { haikuList } = useHaiku();
  if (!haikuList) return null;

  return (
    <section>
      <ul>
        {haikuList.map((haiku, i) => (
          <li key={`${haiku.id} - ${i}`}>
            <Link to={`/haiku/${haiku.id}`}>
              <HaikuItem haiku={haiku} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
