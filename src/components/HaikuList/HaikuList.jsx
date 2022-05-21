import React, { useEffect } from 'react';
import { useHaiku } from '../../hooks/useHaiku';
import HaikuItem from '../HaikuItem/HaikuItem';
import styles from './HaikuList.css'

export default function HaikuList() {
  const { haikuList } = useHaiku();
  if (!haikuList) return null;

  return (
    <section className={styles.list}>
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
