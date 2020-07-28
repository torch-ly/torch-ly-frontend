import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import {init as tokenInit} from "../logic/stage/layers/token/init";

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
    allCharacters{pos{point{x y} rot size} name token players {id} id}
  }
`
const mutationCharacterPosition = gql`
  mutation setCharacterPosition($id:String!, $x:Int!, $y:Int!){
    updateCharacterPosition(id:$id, x:$x, y:$y) {pos{point{x y} rot size} name token players {id} id}
  }
`

const updateCharacterSubscription = gql`
  subscription {
    updateCharacter {pos{point{x y} rot size} name token players {id} id}
  }
`

export default async function (context) {
  store = context.store;

  loadCharacters();
  subscribeCharacterUpdate();
}

export function setCharacterPosition(charcterID, point) {
  apolloClient.mutate({
    mutation: mutationCharacterPosition,
    variables: {
      id: charcterID,
      x: point.x,
      y: point.y
    }
  }).catch(console.error);
}

function subscribeCharacterUpdate() {
  apolloClient.subscribe({
    query: updateCharacterSubscription
  }).subscribe({
    next({data}) {
      console.log(data.updateCharacter);
      store.commit("character/updateCharacter", data.updateCharacter);
      tokenInit();
    }
  });
}

function loadCharacters() {
  apolloClient.query({query: allCharacters})
    .then(({data}) => {
      store.commit("character/loadCharacters", data.allCharacters);
      tokenInit();
    })
    .catch(console.error);
}
