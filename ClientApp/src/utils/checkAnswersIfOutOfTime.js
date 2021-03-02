export const checkAnswersIfOutOfTime = (questionAndAnswerMap, numberOfQuestions) => {
  let updatedQuestionAndAnswerMap = questionAndAnswerMap;

  for (let i = 0; i < numberOfQuestions; i++) {
    if (updatedQuestionAndAnswerMap.get(i) === undefined) {
      updatedQuestionAndAnswerMap.set(i, [-99]);
    }
  }

  //   for (let [k, v] of updatedQuestionAndAnswerMap) {
  //     if (v === undefined) {
  //       updatedQuestionAndAnswerMap.set(k, [-1]);
  //     }
  //   }

  return updatedQuestionAndAnswerMap;
};
