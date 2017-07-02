import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import cors from 'cors';
import { schema } from './data/schema';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlExpress({
    schema,
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: `
# This mutation will publish the changed person to any clients subscribed.
mutation {
  changeName(personId: 1, name: "wasBEN") {
    id
    name
  }
}
  `,
  })
);

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`:: listening on port: ${PORT}`);
});

// eslint-disable-next-line
new SubscriptionServer(
  {
    execute,
    subscribe,
    schema,
  },
  {
    path: '/subscriptions',
    server,
  }
);
