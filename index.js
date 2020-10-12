require('dotenv').config();

// npm imports
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var cookieParser = require('cookie-parser')

// file imports
const { typeDefs, resolvers, context } = require('./utils/genGraphqlSchema');


const startServer = async () => {
  const app = express();

  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });

  app.use(cookieParser(process.env.SECRET));

  let sessionStore = new MongoDBStore({
    uri: process.env.DB_HOST,
    collection: 'sessions'
  });

  app.use(session({
    secret: process.env.SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
      //expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    name: "US" // User Session
  }));

  // to disable __resolveType warning. no option for it in ApolloServer()
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false },
  });

  const server = new ApolloServer({
    schema,
    context
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}

startServer();
