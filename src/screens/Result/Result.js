import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import * as utils from '../../utils';
import QuestionResult from './QuestionResult';

function Results() {
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);
  const resultText = useMemo(() => utils.getResultsText({ quiz, trivia }), [quiz, trivia]);

  if (!quiz.finished) {
    return (
      <React.Fragment>
        <Typography gutterBottom variant="h4">
          No Results
        </Typography>
        <Typography gutterBottom variant="h5">
          Complete a quiz and come back!
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4">
        Results
      </Typography>

      <Typography gutterBottom variant="h5">
        {resultText}
      </Typography>

      {trivia.questions.map((q, index) => (
        <QuestionResult key={q.question} index={index} />
      ))}
    </React.Fragment>
  );
}

export default Results;
