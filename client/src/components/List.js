import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { findIndex } from 'lodash';

const changeNameSubscription = gql`
  subscription {
    nameChanged {
      id
      name
    }
  }
`;

const personsQuery = gql`
  query {
    persons {
      id
      name
    }
  }
`;

class List extends React.Component {
  // eslint-disable-next-line
  state = {
    subscription: null
  };

  componentDidMount() {
    this.subscription = this.subscribe();
  }

  componentDidUnMount() {
    this.subscription.unsubscribe();
  }

  // eslint-disable-next-line
  subscribe = () => {
    return this.props.data.subscribeToMore({
      document: changeNameSubscription,
      updateQuery: ({ persons }, { subscriptionData, variables }) => {
        debugger;
        const updatedPerson = subscriptionData.data.nameChanged;
        const index = findIndex(persons, ['id', updatedPerson.id]);
        const newPersons = [
          ...persons.slice(0, index),
          updatedPerson,
          ...persons.slice(index + 1)
        ];
        return {
          persons: newPersons
        };
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.data.loading
          ? <div>loading</div>
          : this.props.data.persons.map(p =>
              <p key={p.id}>
                {p.name}
              </p>
            )}
      </div>
    );
  }
}

export default graphql(personsQuery)(List);
