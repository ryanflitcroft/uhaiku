import React from 'react';

export default function HaikuItem({ haiku }) {
  return (
    <>
      <figure>
        <h2>{haiku.title}</h2>
        <img src={`${haiku.image}`} alt={`${haiku.alt}`} />
        <figcaption>{haiku.profiles?.username}</figcaption>
      </figure>
    </>
  );
}
