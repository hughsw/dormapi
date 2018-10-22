# Dormapi -- Declarative ORM and API

Dormapi uses a single config file, the API file, to manage your service ORM and API:
- database models and associations
- API endpoints and boilerplate CRUD operations
- hooks for custom business logic
- migrations when the API file is edited

Dormapi eliminated 85% of the boilerplate code for models, routes, and tests of the project it was written for.
At the same time it provided enhanced and more uniform functionality.

## Get Started

Dormapi works with Sequelize ORM and Express JS API.

- Add an API file:
```
PersonName:
  fields:
    prefix: STRING
    firstName: STRING
    middleName: STRING
    lastName: STRING
    suffix: STRING

ApiUser:
  fields:
    userName:
      type: STRING
      unique:
    userEmail: STRING
    salt: STRING
    password: STRING
    PersonName: belongsTo
  defaultScope: [ id, PersonName, userName, userEmail ]
  scopes:
    auth: [ userName, password, salt ]

UserGroup:
  fields:
    groupName: STRING
    groupDescription: STRING
    Members:
      hasMany: PersonName

```
