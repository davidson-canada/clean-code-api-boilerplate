FROM node:14-slim as build
WORKDIR /clean-code-api-boilerplate
COPY package.json tsconfig.json *.env ./
RUN ["yarn"]
COPY src ./src
RUN ["yarn", "build"]

FROM node:14-slim
WORKDIR /clean-code-api-boilerplate
COPY package.json *.env ./
RUN ["yarn", "--production"]
COPY --from=build /clean-code-api-boilerplate/dist ./dist
CMD ["yarn", "start:prod"]

