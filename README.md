## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need Node.js, yarn and an IDE like Webstorm installed.
The use of Docker for development is optional but recommended.

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

This project can be build with Docker with this simple line :

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

```
gcloud builds submit --tag gcr.io/<GCP_PROJECT_NAME>/clean-code-api-boilerplate
gcloud run deploy template-api-development --update-env-vars NODE_ENV=development --image gcr.io/<GCP_PROJECT_NAME>/clean-code-api-boilerplate --region northamerica-northeast1 --memory 512Mi --platform managed --quiet --allow-unauthenticated
gcloud run deploy template-api-staging --update-env-vars NODE_ENV=staging --image gcr.io/<GCP_PROJECT_NAME>/clean-code-api-boilerplate --region northamerica-northeast1 --memory 512Mi --platform managed --quiet --allow-unauthenticated
gcloud run deploy template-api-production --update-env-vars NODE_ENV=production --image gcr.io/<GCP_PROJECT_NAME>/clean-code-api-boilerplate --region northamerica-northeast1 --memory 512Mi --platform managed --quiet --allow-unauthenticated
```
