import { makeExecutableSchema } from 'graphql-tools';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';

import resolvers from './resolvers';
import typeDefs from './schema.graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  // setupFunctions: {
  //   nameChanged: (options, args) => ({
  //     nameChanged: (person) => {
  //       console.log('wat');
  //       return person;
  //     },
  //   }),
  // },
});

export { schema, subscriptionManager, pubsub };
