# Software Quiz Design

Need two (2) / three (3) front end interfaces, one (1) to build quizzes, one (1) to administer the quizzes and one (1) to register candidates.

## Unified

- Maybe one login screens for both interfaces, simple middle of the page dialog, user & pass (may not be the case as the want a unique key, so may need to support user/pwd and key).

## Creation

- Probably want a "pool" of questions
- Questions can then be assigned to quizzes
- Quizzes can then be assigned to candidates

### Creation Requirements

- Set timer for quizzes
- Support T/F, M/C, Check all, Free response

## Adminstration

- Display single questions
- Display all questions

### Adminstration Requirements

- Display timer
- Support T/F, M/C, Check all, Free response

## Registration?

- Register candidate or another test admin

### Registration Requirements

- First & Last Name
- email
- password (optional if candidate?)
- privilege (admin or candidate)
