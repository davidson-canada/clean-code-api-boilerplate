FROM node:14-slim as build
WORKDIR /clean-code-api-boilerplate
COPY package.json yarn.lock tsconfig.json *.env ./
RUN ["yarn"]
COPY src ./src
RUN ["yarn", "build"]

FROM node:14-slim
WORKDIR /clean-code-api-boilerplate
COPY package.json yarn.lock *.env ./
RUN ["yarn", "--production"]
COPY --from=build /clean-code-api-boilerplate/dist ./dist
CMD ["node", "dist/server.js"]

