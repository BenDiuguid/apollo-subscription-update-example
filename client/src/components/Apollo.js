import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql',
});

const wsClient = new SubscriptionClient(`ws://localhost:8080/subscriptions`, {
  reconnect: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};
//     }
//
//     // get the authentication token from local storage if it exists
//     if (localStorage.getItem('auth0IdToken')) {
//       req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`;
//     }
//     next();
//   },
// }]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
});

const Apollo = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default Apollo;
