import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";

const GRAPHQL_ENDPOINT = "ws://" + process.env.BACKEND + "/graphql";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const cache = new InMemoryCache();
const link = new WebSocketLink(client);

let store = {};

const apolloClient = new ApolloClient({
  cache,
  link
});

const allCharacters = gql`
  {
    allCharacters{pos{point{x y}} name token players {id} id}
  }
`

export default async function (context) {
  store = context.store;

  apolloClient.query({query: allCharacters})
    .then(({data}) => store.commit("character/loadCharacters", data.allCharacters))
    .catch(console.error);
}
