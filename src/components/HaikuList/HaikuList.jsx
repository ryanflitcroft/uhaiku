import React, { useState } from 'react';
import HaikuItem from '../HaikuItem/HaikuItem';

export default function HaikuList() {
  const [haikuList, setHaikuList] = useState([]);

  return (
    <section>
      <ul>
      {haikuList.map((haiku, i) => (
        <li key={`${haiku.id} - ${i}`}>
          <HaikuItem 
            haiku={haiku}/>
        </li>
      ))}
      </ul>
    </section>
  );
}
