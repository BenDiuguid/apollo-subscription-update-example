import { find } from 'lodash';
import { pubsub } from './schema';

const persons = [
  { id: 1, name: 'BEN' },
  { id: 2, name: 'STEPHEN' },
];

const resolveFunctions = {
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
      console.log('publishing :: nameChanged');
      pubsub.publish('nameChanged', person);
      return person;
    },
  },
  Subscription: {
    nameChanged(person) {
      return person;
    },
  },
};

export default resolveFunctions;
