# Kwaba API
Welcome to the Kwaba API.
The entire application is contained within the `index.tsx` file which is in the `src` directory.

The application is in a docker container with node version `node:16.16.0-alpine` which is the LTS at the writing of this API.

## Installation
Make sure you have docker and node installed on your pc, then run

```shell
npm i
```

to install the package dependencies. Also provide the `.env` file in the root directory as stated in `.env.example` file.

## Run the app
Make sure docker has started before running any of the commands below.

###### To start the development environment run

```shell
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```

###### To stop the development environment run

```shell
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
```

###### To start a previously stopped environment run

```shell
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```

###### To build the docker images for production run

```shell
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build
```

###### To view lendsQR logs run

```shell
docker logs -f kwaba-api
```

###### To interact with lendsQR CLI run

```shell
docker exec -it kwaba-api /bin/sh
```

The application is behind an **nginx** proxy server which is listening on port **80**.
After you've started the application, visit the endpoint below to make sure its running properly

    http://localhost

You should get the message below

```json
{
    "message": "Welcome to Kwaba api 🔥🔥🔥"
}
```

## Run migration
To create an up migrations

```shell
npm run knex:migrate
```

To create a down migration

```shell
npm run knex:rollback
```

## Run the tests
The test uses an `in memory database` for sqlite3, hence making the tests extremely fast.

```shell
npm run test
```

All tests are written in the `src/__test__` directory.

# REST API

The REST API to the *kwaba app* is described below.
The base URL is

    http://localhost/api/v1

## Register a User

### Request

`POST /auth/register`

```json
{
    "email": "johndoe@gmail.com",
    "fullName": "John Doe",
    "tag": "jDoe",
    "password": "password"
}
```

Tag must be unique. You send invites with the user's tag

### Response

```json
{
    "message": "success",
    "data": {
        "id": 1,
        "fullName": "John Doe",
        "tag": "jDoe",
        "email": "johndoe@gmail.com"
    }
}
```

## Login a user

### Request

`POST /auth/signin`

```json
{
    "email": "johndoe@gmail.com",
    "password": "password"
}
```

### Response

```json
{
    "message": "success",
    "data": {
        "id": 1,
        "fullName": "john doe",
        "email": "johndoe@gmail.com",
        "tag": "jDoe",
        "createdAt": "2022-08-21T17:48:01.000Z",
        "updatedAt": "2022-08-21T17:48:01.000Z"
    }
}
```


## Logout a user

### Request

`GET /auth/signout`

```json
{}
```

### Response

```json
{
    "message": "success",
    "data": {
        "message": "Logged out successfully"
    }
}
```

## Get the current user

### Request

`GET auth/current-user`

```json
{}
```

### Response

```json
{
    "message": "success",
    "currentUser": {
        "id": 1,
        "email": "johndoe@gmail.com",
        "iat": 1660638949
    }
}
```

## Create a saving

### Request

`POST /saving`

```json
{
    "title":"for home",
    "numberOfBuddies":"5",
    "hasTarget": "no",
    "savingType": "Automatic",
    "frequency":"weekly",
    "amount":"625000",
    "duration":"3 months",
    "startDate":"2022/09/25",
    "endDate":"2022/12/25",
    "relationship":"family"
}
```

### Response

```json
{
    "message": "success",
    "data": {
        "id": 2,
        "title": "for home",
        "numberOfBuddies": "5",
        "createdBy": 1,
        "hasTarget": "no",
        "savingType": "Automatic",
        "frequency": "weekly",
        "amount": "625000",
        "duration": "3 months",
        "startDate": "2022/09/25",
        "endDate": "2022/12/25",
        "relationship": "family",
        "createdAt": "2022-08-21T17:49:47.000Z",
        "updatedAt": "2022-08-21T17:49:47.000Z"
    }
}
```

## Get all user's invite

### Request

`GET /saving`

```json
{}
```

### Response

```json
{
    "message": "success",
    "data": [
        {
            "id": 2,
            "title": "for home",
            "numberOfBuddies": "5",
            "createdBy": 1,
            "hasTarget": "no",
            "savingType": "Automatic",
            "frequency": "weekly",
            "amount": "625000",
            "duration": "3 months",
            "startDate": "2022/09/25",
            "endDate": "2022/12/25",
            "relationship": "family",
            "createdAt": "2022-08-21T17:49:47.000Z",
            "updatedAt": "2022-08-21T17:49:47.000Z"
        }
    ]
}
```

## Get a user's account

### Request

`GET /account`

```json
{}
```

### Response

```json
{
    "message": "success",
    "data": {
        "id": 9,
        "accountNumber": "2444594569",
        "balance": "5000",
        "type": "Savings",
        "currency": "USD",
        "createdAt": "2022-08-16T08:37:10.000Z",
        "updatedAt": "2022-08-16T08:37:10.000Z",
        "userID": 17
    }
}
```

## Send Invite

### Request

`POST /saving/invite`

```json
{
    "tag": "codesInML",
    "savingID": "2"
}
```

### Response

```json
{
    "message": "success",
    "data": {
        "id": 2,
        "from": 1,
        "to": 3,
        "status": "PENDING",
        "saving_id": 2,
        "createdAt": "2022-08-21T17:50:10.000Z",
        "updatedAt": "2022-08-21T17:50:10.000Z"
    }
}
```

## view invites

### Request

`GET /saving/invite`

```json
{}
```

### Response

```json
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "from": 3,
            "to": 1,
            "status": "PENDING",
            "saving_id": 1,
            "createdAt": "2022-08-21T17:49:10.000Z",
            "updatedAt": "2022-08-21T17:49:10.000Z"
        }
    ]
}
```

## Update invite
- Only the invitee can update the invite
- Invite can only be updated once
- A user can choose to accept or decline the invite

### Request

`PATCH /saving/invite`

```json
{
    "inviteID": "2",
    "status": "decline"
}
```

### Response

```json
{
    "message": "success",
    "data": {
        "id": 2,
        "from": 1,
        "to": 3,
        "status": "DECLINED",
        "saving_id": 2,
        "createdAt": "2022-08-21T17:50:10.000Z",
        "updatedAt": "2022-08-21T17:50:10.000Z"
    }
}
```
