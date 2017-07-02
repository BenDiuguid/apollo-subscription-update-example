import { find } from 'lodash';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const persons = [{ id: 1, name: 'BEN' }, { id: 2, name: 'STEPHEN' }];

const resolvers = {
  Query: {
    person(_, { id }) {
      return find(persons, { id });
    },
    persons() {
      return persons;
    },
  },
  Mutation: {
    changeName(_, { personId, name }) {
      const person = find(persons, { id: personId });
      if (!person) {
        throw new Error(`Couldn't find person with id ${personId}`);
      }
      person.name = name;
      console.log(`publishing :: nameChanged id: ${personId} to ${name}`);
      pubsub.publish('nameChanged', { nameChanged: person });
      return person;
    },
  },
  Subscription: {
    nameChanged: {
      subscribe: () => pubsub.asyncIterator('nameChanged'),
    },
  },
};

export { resolvers, pubsub };
