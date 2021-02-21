# Answers Controller

Prefix: `https://localhost:5001/Answers/` or just `/Answers`

## End Points

### Delete an Answer

Suffix: `/Delete`

Expects **_answer-id_** as query param `/Delete?id=<answer-id>`

### Update an Answer

Suffix: `/Update`

Expects **_answer-id_** as query param `/Update?id=<answer-id>`
Expects **_Answer_** in body

```json
{
  "Value": string,
  "Correct": bool
}
```
