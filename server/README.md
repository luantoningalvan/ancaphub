# AncapHub Server

<div >
  <img src="https://img.shields.io/badge/dynamic/json?color=43BD15&label=Express&query=dependencies.express&url=https%3A%2F%2Fraw.githubusercontent.com%2Fancaphub%2Fancaphub%2Fmaster%2Fserver%2Fpackage.json">
  <img src="https://img.shields.io/badge/dynamic/json?color=informational&label=Mongoose&query=dependencies.mongoose&url=https%3A%2F%2Fraw.githubusercontent.com%2Fancaphub%2Fancaphub%2Fmaster%2Fserver%2Fpackage.json">
  <img src="https://img.shields.io/badge/dynamic/json?color=F16AAD&label=AWS-SDK&query=dependencies['aws-sdk']&url=https%3A%2F%2Fraw.githubusercontent.com%2Fancaphub%2Fancaphub%2Fmaster%2Fserver%2Fpackage.json">
</div >

## Requirements

You'll need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) to run [MongoDB](https://hub.docker.com/_/mongo), where the application data persists, and [localstack](https://hub.docker.com/r/localstack/localstack), where AWS services are emulated locally (currently only S3 service is being used). You can see more about using localstack in its [repository](https://github.com/localstack/localstack).

## Running the project

First install its dependencies:

```sh
$ yarn # npm i
```

Then create a copy of `.env.example` as `.env`, you can change the variables values or leave it as it is. After that, start the Docker containers and the server application:

```sh
$ yarn docker:up # npm run docker:up
$ yarn dev # npm run dev
```

## Scripts

- **dev**  
  Starts the application in watch mode.
- **start**  
  Starts the application.
- **docker:up**  
  Starts Docker containers.
- **docker:down**  
  Stops and removes the Docker containers.
