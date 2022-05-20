import React from 'react';
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
            <HaikuItem haiku={haiku} />
          </li>
        ))}
      </ul>
    </section>
  );
}
