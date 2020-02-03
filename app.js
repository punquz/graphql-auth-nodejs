const dotenv = require('dotenv');
const color = require('colors');
const express = require('express');
const cors = require('cors');
const graphqlHttp = require('express-graphql');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolvers/index');

//auth middleware
const { protect } = require('./middleware/auth');

const app = express();

//cors
app.use(cors());

app.use(protect);

//Single graphql endpoint
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message
    })
  })
);

const PORT = process.env.PORT || 3000;

/*
==========================
Magic happens at port 8080
==========================
**/
const server = app.listen(
  PORT,
  console.log('App listening on port 8080!'.yellow.bold)
);

//handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
