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

- Add an API file, `core.yml`, next to your top-level Express App:
```yaml
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

- Add the endpoint routes to the App, e.g. in `index.js`:
```javascript
const dormapi = require('dormapi');
const { models, routes } = dormapi.loadApiSync(['./core.yml']);

// setup routes
app.use('/', routes);


// to be used elsewhere
app.set('apiModels', models);
```

- The `models` object has Sequelize models for use in custom business logic, e.g.
```javascript
  const models = app.get('apiModels');
  ...

  const numGroups = models.UserGroup.count();

  ...
```

- Also, to run Sequelize migrations, once a DB connection has been established:
```javascript
  ...

  app.get('apiModels').SequelizeMeta.runMigration();

  ...
```
