# Users Controller

Prefix: `https://localhost:5001/Users/` or just `/Users`

## End Points

### Add

Suffix: `/Add`

Expects **_NewUser_** in body

```json
{
  "Name": string,
  "FirstName": string,
  "LastName": string,
  "Email": string,
  "Password": string
}
```

Returns **_NewUser_** minus password

### Delete

Suffix: `/Delete`

Expects **_user-id_** as query param `/Delete?id=<user-id>`

### Sign In

Suffix: `/SignIn`

Expects **_Login_** in body

```json
{
  "Email": string,
  "Password": string,
  "ReturnUrl": string (if redirect desired)
}
```

### Get Single User

Suffix: `/<user-id>`

Expects **_user-id_** in route

Returns **_User_**

```json
{
  "Id": string,
  "Name": string,
  "FirstName": string,
  "LastName": string,
  "Email": string
}
```

### Get All Users

Suffix: _none_

Returns an array of **_User_**

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

### Update a User

Suffix: `/Update`

Expects **_User_** in body

```json
{
  "Id": string,
  "Name": string,
  "FirstName": string,
  "LastName": string,
  "Email": string
}
```

### Update User Password

Suffix: `/UpdatePassword`

Expects **_user-id_** and **_password_** as query params `/UpdatePassword?id=<user-id>&password=<new-password>`
