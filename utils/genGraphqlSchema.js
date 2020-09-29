// npm imports
const path = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { URLTypeDefinition, URLResolver  } = require('graphql-scalars');


// load typeDef & resolver files
//const typesArray = loadFilesSync(path.join(__dirname, "../graphql/**/typedef.*"),{recursive:true});
//const resolversArray = loadFilesSync(path.join(__dirname, "../graphql/**/resolver.*"),{recursive:true});

// load graphql-scalars first
const typesArray = [
  URLTypeDefinition
];

const resolversArray = [
  { URL: URLResolver }
];

// load typeDef and resolver files
typesArray.push( loadFilesSync(path.join(__dirname, "../graphql/**/typedef.*"),{recursive:true}) );
resolversArray.push( loadFilesSync(path.join(__dirname, "../graphql/**/resolver.*"),{recursive:true}) );

// merge typeDefs & merge resolvers
exports.typeDefs = mergeTypeDefs(typesArray);
exports.resolvers = mergeResolvers(resolversArray);