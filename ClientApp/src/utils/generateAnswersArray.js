export const generateAnswersArrayForSubmission = (questionAndAnswerMap, quizData) => {
  const questions = quizData.questions;
  let userSelectionsArray = [];

  console.log(questions);
  questions.forEach((questionObj, index) => {
    const questionID = questionObj.question.id;
    const answerId = questionAndAnswerMap.get(index);

    //Generates a UserSelection array of objetcts
    //if quetion is an int, that corresponds to an AnswerId, else a FreeResponse property
    //in the UserSelections object
    if (typeof questionID === 'number') {
      console.log('found an int');
      userSelectionsArray.push({ QuestionId: questionID, AnswerId: answerId });
    } else if (typeof questionID === 'string') {
      console.log('found an string');
      userSelectionsArray.push({ QuestionId: questionID, FreeResponse: answerId });
    }
  });

  return userSelectionsArray;
};
