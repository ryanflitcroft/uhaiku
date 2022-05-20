import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HaikuItem.css';

export default function HaikuItem({ haiku }) {
  return (
    <>
      <figure className={styles.item}>
        <Link to={`/haiku/${haiku.id}`}>
          <img src={`${haiku.image}`} alt={`${haiku.alt}`} />
        </Link>
        <figcaption>{haiku.title}</figcaption>
      </figure>
    </>
  );
}
