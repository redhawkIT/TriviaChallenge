import React, { useCallback, useState } from 'react';

import * as hooks from '../hooks';
import Question from '../components/Question';

function Quiz() {
  const [trivaItems, error] = hooks.useTriviaAPI({ amount: 10 });
  const [index, setIndex] = useState(0);

  const count = index + 1;
  const total = trivaItems.length;

  const next = useCallback(() => setIndex(prevIndex => prevIndex + 1), []);
  const back = useCallback(() => setIndex(prevIndex => prevIndex - 1), []);

  if (error) {
    return <h1>Somthing went wrong...</h1>;
  }

  return (
    <React.Fragment>
      <h1>QUIZ</h1>
      <h3>{`Questions ${count} of ${total}`}</h3>
      <Question back={back} count={count} next={next} total={total} triva={trivaItems[index]} />
    </React.Fragment>
  );
}

export default Quiz;
