# Graphql workflow/ Getting started

1. what is Graphql?
   GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
2. Graphql Operation
   There are three operations that can be performed in Graphql.
   The Query: allows you to fetch data.
   The Mutation: allows you to change the data.
   The Subscription: allows you to watch data for changes.
3. Graphql Schema
   Your GraphQL server uses a schema to describe the shape of your data graph. This schema defines a hierarchy of types with fields that are populated from your back-end data stores.
4. Graphql resolver
   Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler. Every resolver function in a GraphQL schema accepts four positional arguments as given below − fieldName:(root, args, context, info) => { result }
5. To get started:
   Helpful links: https://graphql.org/
   A youtube tutorial from maxmillian: https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_&index=1

Instruction
Base Url: http://localhost:8080/graphql
Install mongodb
Install nodemon globally(npm i -g nodemon)
Rename example.config.env to config.env
To Run

1.  clone the Repo
2.  npm i (to install all the dependencies)
3.  create a config.env file in config folder
4.  In terminal Execute npm run dev to run in development mode

## Technology Stack

1. Nodejs(A javascrpt runtime to run our JS code in the server)
2. Expressjs(Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.)
3. Express-graphql(The express-graphql module provides a simple way to create an Express server that runs a GraphQL API)
4. mongoose(A mongodb ODM for nodejs, Mongoose provides a straight-forward, schema-based solution to model your application data)
5. jsonwebtoken(JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties)
