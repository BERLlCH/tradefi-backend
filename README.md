# DaoSign Backend Server

## Requirements

[NodeJS](https://nodejs.org/en/)

## Getting Started

### Install dependencies

```bash
yarn install
```

### Create `.env` file

In the root of project create `.env` file and fill it according to `.env.example` and following table:

| Environment variable        | Description                                               | Example value           |
| --------------------------- | --------------------------------------------------------- | ----------------------- |
| `PORT`                      | Port for HTTP/GraphQL server                              | `8000`                  |
| `TYPEORM_HOST`              | Host address of database                                  | `127.0.0.1`             |
| `TYPEORM_USERNAME`          | Username for database access                              | `db_user`               |
| `TYPEORM_PASSWORD`          | Password for database access                              | `db_password`           |
| `TYPEORM_DATABASE`          | Name of database                                          | `db_name`               |
| `TYPEORM_PORT`              | Port of database                                          | `25433`                 |
| `TYPEORM_LOGGING`           | Should database make logs of transactions or not          | `false`                 |
| `JWT_SECRET`                | Secret string used to sign JWT tokens                     | `secret`                |
| `ASSETS_BUCKET_NAME`        | Name of bucket for DO Spaces Object Storage               | **secret**              |
| `ASSETS_ENDPOINT`           | Endpoint to connecting to DO                              | **secret**              |
| `ASSETS_BUCKET_DOMAIN_NAME` | Link for keeping files and other assets                   | **secret**              |
| `ASSETS_ACCESS_KEY`         | Access key ID for DO                                      | **secret**              |
| `ASSETS_SECRET_KEY`         | Secret access key for DO                                  | **secret**              |
| `ASSETS_REGION`             | Default region for DO                                     | **secret**              |
| `MAIL_HOST`                 | Host for using SMTP from Mailtrap account credentials     | `smtp.mailtrap.io`      |
| `MAIL_PORT`                 | Port for using SMTP from Mailtrap account credentials     | `2525`                  |
| `MAIL_USER`                 | Username for using SMTP from Mailtrap account credentials | **secret**              |
| `MAIL_PASSWORD`             | Password for using SMTP from Mailtrap account credentials | **secret**              |
| `MAIL_FROM`                 | Email from which mails should be send                     | `no-reply@daosign.io`   |
| `FRONTEND_URL`              | Link to frontend app                                      | `http://localhost:3000` |
| `OPENAI_API_KEY`            | API key for OpenAI                                        | **secret**              |

### Launch PostgreSQL in Docker

For that you need to have `docker`
and `docker-compose` installed.

Use following command:

```bash
docker-compose up
```

Login and password for default user can be found and changed in `docker-compose.yml` file
at the root of the project.

### Run database migrations

After launching PostgreSQL in docker use following command to run migrations:

```bash
yarn migrate:up
```

## Start the server

Run in development mode

```bash
yarn dev
```

Run in production mode

```bash
yarn prod
```

## Dev notes

Create new migration

```bash
yarn migration:create <MigrationName>
```

Example:

```bash
yarn migration:create AddUserTable
```
