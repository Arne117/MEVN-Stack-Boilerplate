# Server
### Install
Install [NodeJS](https://nodejs.org/en/)
and [MongoDB](https://www.mongodb.com)

Run `mongod` and fill it with test data `mongoimport --db bachelorarbeit --collection surveys --type json --file /server/surveyTestData.json --jsonArray`

Then run `npm i`

Copy example credentials with `cp .env.example .env`
and edit these.  

### Run
`npm run start`
