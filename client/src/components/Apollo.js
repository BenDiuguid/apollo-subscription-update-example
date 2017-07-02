import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});

const wsClient = new SubscriptionClient(`ws://localhost:8080/subscriptions`, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id
});

const Apollo = ({ children }) =>
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>;

export default Apollo;
