import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import List from './List';

const Home = ({ data: { loading, error, person } }) => {
  if (loading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return person
    ? <div>
        <h1>Hello {person.name}</h1>
        <List />
      </div>
    : <div>Hello no one</div>;
};

const personQuery = gql`
  query {
    person(id: 1) {
      id
      name
    }
  }
`;

export default graphql(personQuery)(Home);
