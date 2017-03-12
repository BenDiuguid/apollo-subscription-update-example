## Apollo subscription update example

To run the server `cd server` and run `yarn run dev` or `npm run dev`.

To run the client `cd client` and run `yarn start` or `npm start`.

To see the subscriptions in action, use [Apollo Dev Tools'](https://github.com/apollographql/apollo-client-devtools) GraphiQL editor to send a `mutation` to the server. If you don't have/want Apollo Dev Tools, you can also navigate to `http://localhost:8080/graphiql` and execute the `mutation` there.

Here is an example mutation:

```graphql
mutation {
  changeName(personId: 1, name: "wasBEN") {
    id
    name
  }
}
```

After this executes in the client, where you saw "BEN" previously, it will now be "wasBEN".
