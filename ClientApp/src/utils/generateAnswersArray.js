export const generateAnswersArrayForSubmission = (questionAndAnswerMap, quizData) => {
  const questions = quizData.questions;
  let userSelectionsArray = [];

  questions.forEach((questionObj, index) => {
    const questionID = questionObj.question.id;
    const answers = questionAndAnswerMap.get(index);

    //Generates a UserSelection array of objetcts
    //if quetion is an int, that corresponds to an AnswerId, else a FreeResponse property
    //in the UserSelections object

    if (Array.isArray(answers)) {
      userSelectionsArray.push({ QuestionId: questionID, AnswerIds: answers });
    } else if (typeof answers === 'string') {
      userSelectionsArray.push({ QuestionId: questionID, FreeResponse: answers });
    }
  });

  return userSelectionsArray;
};
