## The project

This project tries to offer you a relatively clean (for complains, contact the writer) REST API skeleton with the following features : 
- A 100% typescript codebase than uses Domain Driven Design
- A live server that compile and reload the server at every file change
- Dockerized
- With environments configuration (local, dev, staging, prod by default)
- A Configured swagger documentation (expect for production env)
- API fully secured with an API_KEY
- Authentication already set with jwt token and working endpoints
- Basic Users Domain already written for the example

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need Node.js, yarn and an IDE like Webstorm installed.
The use of Docker for development is optional but recommended.
The project uses a mongodb database, for local development you can use a local instance on your host machine or the once used by default in the docker-compose
You can get a free sandbox for dev, staging and prod environment (do not put a mongodb container in Google Cloud Run) at https://cloud.mongodb.com/

### Configure the project

Change the following placeholders to have a fully working project 
In cloudbuild.yaml : 
- <GCP_PROJECT_NAME> : Your Google Cloud Plateform Project Name (only if you intend to use Google Cloud Build for CI/CD)
In *.env
- <CHOOSE_AN_API_KEY> : An API Key of your choice that will be used as a security layer for the API calls
- <DOMAIN> : You domain name (where you will publish your environments)
- <CHOOSE_A_SECRET_TOKEN> : A secret token of your choice that will be used to decrypt the JWT token
- <MONGO_USERNAME>, <MONGO_PASSWORD>, <MONGO_URL> : Your mongodb access infos


## Running with Docker

This project can be built with Docker with this simple line command :

```
yarn start:docker
```
or
```
docker-compose up --build
```

The server starts with the local env by default, to change the NODE_ENV: 'local' to another env conf if need 

### Running locally

Install the dependencies

```
yarn
```

How to launch the API ?

```
yarn watch # to build typescript in background
yarn dev # to launch server on the specified port in the .env file at root
yarn start # to launch watch and dev simultaneously
```

You can now go to http://localhost:3000/api-docs to see the API Doc

## Running the tests

```
yarn test
```

## Deploy on Google Cloud Run

To deploy your API into a Google Cloud Run instance, you need a Google Cloud plateform account configured with a billing account and the gcloud cli installed and configured : https://cloud.google.com/run/docs/quickstarts/build-and-deploy

Change the project name in the package.json scripts gcp-build and gcp-deploy-* to match your gcp project name : gcr.io/PROJECT-ID/container-name

Then, run the following command to build and push the container to gcp : 

```
yarn gcp-build
```

And the following commands to deploy your environments : 

```
yarn gcp-deploy-dev
yarn gcp-deploy-staging
yarn gcp-deploy-prod
```