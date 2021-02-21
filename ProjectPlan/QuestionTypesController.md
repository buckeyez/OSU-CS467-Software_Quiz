# QuestionTypes Controller

Prefix: `https://localhost:5001/QuestionTypes/` or just `/QuestionTypes`

## End Points

### Add

Suffix: `/Add`

Expects **_type_** in query `/Add?type=Multiple Choice`

Returns **_type_** as string

### Get All Types

Suffix: _none_

Returns an array or **_types_** as strings

### Delete a Type

Suffix: `/Delete`

Expects **_type_** as query param `/Delete?type=Multiple Choice`

### Update a Type

Suffix: `/Update`

Expects **_newType_** and **_oldType_** as query params `/Update?newType=MC&oldType=Multiple Choice`

Returns updated **_type_** as string
