import React, { useState } from 'react';
import style from './index.module.css';

export const FirstExample: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={style.example}>
      {count}
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
};
