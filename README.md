# Udacity - Project2 - Storefront

## Package installation

    'npm install' to install the required packages.

## DB Connection
I used a free online database from Elephant sql

```
postgres://mhwlwjuf:2s0DiANmcZOPz7Kz7Ta_JOjWM4ToDM3f@abul.db.elephantsql.com/mhwlwjuf
```

## Ports

    express port : localhost:3000

## Jasmine tests

    'npm run test' to run jasmine tests. It will change the environment to test and perform tests using the test DB. It will run DB migrtions on the test DB.

## Start express

    'npm run start' to start express

## DB Migrate

    'db-migrate up' to perform migration. Please run this migrate command before accessing any endpoint

## Prepare env
- I saved and added a `.env` file in the root directory and I kept all environment parameters becuase I am using free online postgres db provider 


## Set up commands

```
        "start": "node src/server.ts",
        "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
        "test": "cls && db-migrate --env test reset && db-migrate --env test up && jasmine-ts && db-migrate db:drop test",
        "tsc": "tsc",
        "reset": "db-migrate reset && db-migrate up"
```

## Test the app
- I added a `database.json` file in the root directory and kept all parameters
```
{
    "dev": {
        "driver": "pg",
        "host": "abul.db.elephantsql.com",
        "database": "mhwlwjuf",
        "user": "mhwlwjuf",
        "password": "2s0DiANmcZOPz7Kz7Ta_JOjWM4ToDM3f"
    },
    "test": {
        "driver": "pg",
        "host": "abul.db.elephantsql.com",
        "database": "mhwlwjuf",
        "user": "mhwlwjuf",
        "password": "2s0DiANmcZOPz7Kz7Ta_JOjWM4ToDM3f"
    }
}
```
- `npm run test` to run all tests and migrate db

## Start the app
- `npm run watch` to start the app and get access via http://localhost:3000


