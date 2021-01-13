# Software Quiz Database

- Will use a relational database

## Tables

### Users

- user name
- first name
- last name
- email
- privilege id

### Privileges

- access
  - owner/admin
  - candidate

### Question Types

- type (might be able to slim down)
  - M/C
  - T/F
  - All that apply
  - Free response

### Questions

- question
- type id

### Answers

- answer
- correct
- question id

### Quizzes

- name/identifier

### Questions To Quiz

- question id
- quiz id

### Quiz Assignment

- user id
- quiz id
- time allotment
- time taken

### Quiz Results

- quiz assignment id
- question id
- answer id
