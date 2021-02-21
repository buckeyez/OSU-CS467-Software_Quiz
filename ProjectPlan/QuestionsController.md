# Questions Controller

Prefix: `https://localhost:5001/Questions/` or just `/Questions`

## End Points

### Add

Suffix: `/Add`

Expects **_QuestionAndAnswers_** in body

```json
{
  "Question": {
    "Value": string,
    "Type": string (must match existing types in DB)
  },
  "Answers": [
    {
      "Value": string,
      "Correct": bool
    }
  ]
}
```

Returns **_QuestionAndAnswers_** in addition to their id's

### Get Entire Question and Answers

Suffix: `/<id>/Entire`

Expects the **_question-id_** in the route

Returns **_QuestionAndAnswers_**

```json
{
  "Question": {
    "Id": number,
    "Value": string,
    "Type": string
  },
  "Answers": [
    {
      "Id": number,
      "Value": string,
      "Correct": bool
    }
  ]
}
```

### Get All Questions

Suffix: _none_

Returns an array of **_Question_**

```json
[
  {
    "Id": number,
    "Value": string,
    "Type": string
  }
]
```

### Delete a Question

Suffix: `/Delete`

Expects **_question-id_** as query param `/Delete?id=<question-id>`

### Update a Question and its Answers

Suffix: `/Update`

Expects **_question-id_** as query param `/Update?id=<question-id>`
Expects **QuestionAndAnswers** in body

```json
{
  "Question": {
    "Value": string,
    "Type": string (must match existing in DB)
  },
  "Answers": [
    {
      "Value": string,
      "Correct": bool
    }
  ]
}
```

Returns **_QuestionAndAnswers_**

```json
{
  "Question": {
    "Id": number,
    "Value": string,
    "Type": string
  },
  "Answers": [
    {
      "Id": number,
      "Value": string,
      "Correct": bool
    }
  ]
}
```
