# Quizzes Controller

Prefix: `https://localhost:5001/Quizzes/` or just `/Quizzes`

## End Points

### Add

Suffix: `/Add`

Expects **_name_** as query `/Add?name=<quiz-name>`

Returns a **_Quiz_** object

```json
{ "Id": int, "Name": string }
```

### Assign

Suffix: `/Assign`

Expects **_QuizAssignmentNew_** from body

```json
"QuizId": int,
"UserId": string,
"TimeAllotment": int
```

Returns above plus **Id** of the assignment

### Delete

Suffix: `/Delete`

Expects **_id_** as query `/Delete?id=<quiz-id>`

### Quizzes

Suffix: _none_

Returns an array of **_Quiz_** objects

```json
[
  { "Id": int, "Name": string }
]
```

### Quiz

Suffix: `/<quiz-id>/<partial>`

Expects the id of the quiz in the route and whether you want it to be the partial quiz or full quiz.
Difference between the 2 is partial returns just questions, full returns questions and answers
(idea is that you would use partial on the quiz builder page).

Returns an array of **_QuestionsAndAnswers_** objects

```json
[
  {
    "Question": { <question-object> },
    "Answers": [ { <answer-object> } ]
  }
]
```

### Get Quiz Assignment via Key

Suffix: `/Assignment/<key>`

Expects the key that was assigned to the user and quiz assignment (emailed to the user).
Will be a part of the URL the user clicks `/candidate-home/?key=<key>`.

Returns **_QuizAssignment_**

```json
{
  "id": int,
  "quiz": {
    "id": int,
    "name": string
  },
  "user": {
    "id": string,
    "name": string,
    "firstName": string,
    "lastName": string,
    "email": string
  },
  "timeAllotment": int
}
```

### Get Quiz Assignment Result

Suffix: `/Results/<key>`

Expects the key that was assigned to the user and quiz assignment (emailed to the user).
Will be a part of the URL the user clicks `/candidate-result/?key=<key>`.

Returns **_QuizResults_**

```json
{
  "User": <user-object>,
  "Grade": int,
  "QuestionResults": [
    {
      "Question": <question-object>,
      "Answers": [ <answer-object> ],
      "UserSelection": [ <answer-object> ],
      "FreeResponse": string
    }
  ]
}
```

### Assignments

Suffix: `/Assignments`

Returns an array of **_QuizAssignment_** objects

```json
[
  {
    "Id": int,
    "Quiz": { <quiz-object> },
    "User": { <user-object> },
    "TimeAllotment": int
  }
]
```

### Quiz Assignments for a User

Suffix: `/User/<user-id>`

Expects **_user-id_** as part of the route

Returns an array of **_Quiz_** objects

```json
[
  {
    "Id": int,
    "Name": string
  }
]
```

### Get Quiz Rankings

Suffix: `/Rankings`

Returns an array of **_QuizRanking_** objects

```json
[
  {
    "User": <user-obj>,
    "Grade": int,
    "AssignmentKey": string
  }
]
```

### Users Assigned to Quiz

Suffix: `/<quiz-id>/Users`

Expects the **_quiz-id_** as part of the route

Returns an array of **_User_** objects

```json
[
  {
    "Id": string,
    "Name": string,
    "FirstName": string,
    "LastName": string,
    "Email": string
  }
]
```

### Delete Quiz Assignment

Suffix: `/Assignments/Delete`

Expects **_quizAssignmentId_** as a query `.../Delete?quizAssignmentId=<id>`

### Quiz Submission

Suffix: `/Submit`

Expects **_QuizSubmission_** object in body

```json
{
  "QuizAssignmentId": int,
  "TimeTaken": int,
  "UserSelections": [
    {
      "QuestionId": int,
      "AnswerIds": int[],
      "FreeResponse": string
    }
  ]
}
```

Note: the inner object is **_AnswerSubmission_** and either AnswerId or FreeResponse should be submitted, but not both - however there is nothing in place to warn if either is missing or both are filled. TLDR only _AnswerId_ should be filled or _FreeResponse_.

### Update Quiz Assignment

Suffix: `/Assignments/Update`

Expects **_id_** from query `/Assignments/Update?id=<id>`

and **_QuizAssignmentNew_** object in body

```json
{
  "QuizId": int,
  "UserId": string,
  "TimeAllotment": int
}
```

### Add/Remove Quiz Questions

Suffix: `/Update`

Expects **_quiz-id_** as query `/Update?id=<quiz-id>`

and **_QuizUpdates_** object in body

```json
{
  "EntityIdsToAdd": int[],
  "EntityIdsToRemove": int[]
}
```

### Update Quiz Name

Suffix: `/Update/Name`

Expects **_id_** from query and **_name_** `/Update/Name?id=<quiz-id>&name=<quiz-name>`
