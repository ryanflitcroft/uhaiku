import React from 'react';

export default function HaikuItem({ haiku }) {
  return (
    <>
      <figure>
        <img src={`${haiku.image}`} alt={`${haiku.alt}`} />
      </figure>
    </>
  );
}
