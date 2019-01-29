# SETUP INSTRUCTIONS

This test is divided in four repositories:

- https://github.com/JuanCarlosllh/MFAFront
- https://github.com/JuanCarlosllh/MFAGateway
- https://github.com/JuanCarlosllh/MFAQuery
- https://github.com/JuanCarlosllh/MFACooker

Each one contains its own .env file which can be edited to change its configuration, but it should not be necessary since they are already configured. (this .env files are uploaded to github repository just for convenience, they should never be pushed!)

Instructions:

- First clone each project.
- Execute the command `yarn install` or `npm install` on each project to install dependencies
- Launch _MFAGateway_, _MFAQuery_ and _MFACooker_ which `yarn dev` or `npm run dev` and launch _MFAFront_ with `yarn start` or `npm start` (can be executed in any order)
- Open `http://localhost:3001` on any web browser

# Architecture

This test is composed by four microservies, each one with its own specific functionality based on CQRS pattern. All of them are stateless, independent and can be easily edited or replaced without affecting the others.

- MFACooker: This service is responsible for product scraping. It's just a node process which executes the scraping function based on a provided crontab (configurable on its .env file). It could be easily replaced by a function (using Faas) or replaced by a rest command service (based on CQRT command model)

- MFAQuery: This service is actually a mix between Query and Command CQRT models. They have been in mixed to make this test simple, easy to review and less time-consuming. It's responsible for querying products and inserting and querying users and favorites. It exposes a rest API which should be only accessible by other private microservices.

- MFAGateway: This service contains the graphql endpoint and it's responsible for user authentication and exposing data to final user.

- MFAFront: This is an SPA built with react that exposes all required functionality.
