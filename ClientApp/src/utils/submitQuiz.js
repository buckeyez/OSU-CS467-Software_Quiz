import axios from 'axios';

export const submitQuizToBackend = async (QuizAssignmentId, TimeTaken, UserSelections) => {
  //Required data for reqeust body
  const data = {
    QuizAssignmentId: QuizAssignmentId,
    TimeTaken: TimeTaken,
    UserSelections: UserSelections,
  };
  const headers = {};

  const response = await axios.post(`/quizzes/submit`, data, headers).catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
