import React from 'react';

export default function HaikuItem({ haiku }) {
  // onClick, redirect to /haiku/:id
  return (
    <>
      <figure>
        <img src={`${haiku.image}`} alt={`${haiku.alt}`} />
      </figure>
    </>
  );
}
