import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HaikuItem.css';

export default function HaikuItem({ haiku }) {
  return (
    <>
      <Link to={`/haiku/${haiku.id}`}>
        <figure className={styles.item}>
          <img src={`${haiku.image}`} alt={`${haiku.alt}`} />
          <figcaption>{haiku.title}</figcaption>
        </figure>
      </Link>
    </>
  );
}
