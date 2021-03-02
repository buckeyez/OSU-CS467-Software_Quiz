export const areAllQuestionsAnswered = (questionAndAnswerMap, numberOfQuestions) => {
  let unansweredQuestionsRemain = false;

  if (questionAndAnswerMap.size !== numberOfQuestions) {
    unansweredQuestionsRemain = true;
  }

  for (let [k, v] of questionAndAnswerMap) {
    const value = questionAndAnswerMap.get(k);

    if (typeof value === String) {
      if (value === '') {
        unansweredQuestionsRemain = true;
      }
    }

    if (Array.isArray(v)) {
      if (questionAndAnswerMap.get(k).length === 0) {
        unansweredQuestionsRemain = true;
      }
    }
  }

  return unansweredQuestionsRemain;
};
