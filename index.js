require('dotenv').config();

// npm imports
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}

startServer();
