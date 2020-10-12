/*
  Exports the GraphQL schema Typedefs, Resolver array, and context,
  to be used in the 'index.js' apollo-server constructor.
*/


// npm imports
const path = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { URLTypeDefinition, URLResolver,
      EmailAddressTypeDefinition, EmailAddressResolver,
      NonNegativeFloatTypeDefinition, NonNegativeFloatResolver
      } 
      = require('graphql-scalars');

// file imports      
const generateCourseModel = require('../graphql/models/Course');
const generateUserModel = require('../graphql/models/User');
const User = require('../models/user');;

// load graphql-scalars first
const typesArray = [
  URLTypeDefinition, 
  EmailAddressTypeDefinition, 
  NonNegativeFloatTypeDefinition
];

const resolversArray = [
  { URL: URLResolver, 
    EmailAddress: EmailAddressResolver, 
    NonNegativeFloat: NonNegativeFloatResolver 
  }
];

// load typeDef and resolver files
typesArray.push( loadFilesSync(path.join(__dirname, "../graphql/schema/**/typedef.*"),{recursive:true}) );
resolversArray.push( loadFilesSync(path.join(__dirname, "../graphql/schema/**/resolver.*"),{recursive:true}) );

const context = async ( {req, res } ) => {
  const session = req.session._id ? req.session : null; // checks for session existence
  
  let user;
  if(session) 
    user = await User.findById(req.session._id).lean().exec();

    return {
    user,
    req,
    res,
    models: {
      Course: generateCourseModel(session),
      User: generateUserModel(session),

    }
  }
}

// merge typeDefs & merge resolvers
exports.typeDefs = mergeTypeDefs(typesArray);
exports.resolvers = mergeResolvers(resolversArray);
exports.context = context;
