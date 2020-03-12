export const getResultsText = ({ trivia = {}, quiz = {} }) => {
  const checkAnswer = q => quiz.selectedAnswers[q.question] === q.correct_answer;
  const correctCount = trivia.questions.filter(checkAnswer).length;
  return `${correctCount} of ${trivia.questions.length} questions were correct`;
};
