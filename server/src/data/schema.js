import { makeExecutableSchema } from 'graphql-tools';

import { resolvers, pubsub } from './resolvers';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
