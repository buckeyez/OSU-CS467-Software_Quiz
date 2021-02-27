# Roles Controller

Prefix: `https://localhost:5001/Roles/` or just `/Roles`

## End Points

### Add

Suffix: `/Add`

Expects **_name_** as query param `/Add?name=<role-name>`

Returns **_Role_**

```json
{
  "Id": string,
  "Name": string
}
```

### Delete

Suffix: `/Delete`

Expects **_role-id_** as query param `/Delete?id=<role-id>`

### Get Role by Name

Suffix:`/<role-name>`

Expects **_role-name_** as part of route

Returns **_Role_**

```json
{
  "Id": string,
  "Name": string
}
```

### Get All Roles

Suffix: _none_

Returns an array of **_Role_**

```json
[
  {
    "Id": string,
    "Name": string
  }
]
```

### Get Users in Role

Suffix: `/<role-id>/Edit`

Expects **_role-id_** as part of route

Returns **_RoleEdit_**

```json
{
  "Members": [
    {
      "Id": string,
      "Name": string,
      "FirstName": string,
      "LastName": string,
      "Email": string
    }
  ],
  "NonMembers": [
    <user-objects> (as shown above)
  ]
}
```

### Update Role Members

Suffix: `/Update`

Expects **_RoleModification_** in body

```json
  "Id": string,
  "Name": string,
  "AddIds": string[],
  "DeleteIds": string[]
```
