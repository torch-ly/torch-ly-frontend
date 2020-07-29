import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import {init as tokenInit} from "../logic/stage/layers/token/init";
import {setBackgroundObjects} from "../logic/stage/layers/background/init";

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

export default async function (context) {
  store = context.store;

  loadCharacters();
  subscribeCharacter();

  loadBackground();
  subscribeBackgroundLayer();
}

export function setCharacterPosition(charcterID, point) {
  apolloClient.mutate({
    mutation: gql`
      mutation setCharacterPosition($id:String!, $x:Int!, $y:Int!){
        updateCharacterPosition(id:$id, x:$x, y:$y) {pos{point{x y} rot size} name token players {id} id}
      }
    `,
    variables: {
      id: charcterID,
      x: point.x,
      y: point.y
    }
  }).catch(console.error);
}

export function setBackgroundLayer(layer) {
  apolloClient.mutate({
    mutation: gql`
      mutation setBackgroundLayer($layer:JSON!){
        updateBackgroundLayer(layer:$layer) {layer}
      }
    `,
    variables: {
      layer: layer
    }
  }).catch(console.error);
}

function subscribeCharacter() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        updateCharacter {pos{point{x y} rot size} name token players {id} id}
      }
    `
  }).subscribe({
    next({data}) {
      store.commit("character/updateCharacter", data.updateCharacter);
      tokenInit();
    }
  });
}

function subscribeBackgroundLayer() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        updateBackgroundLayer {layer}
      }
    `
  }).subscribe({
    next({data}) {
      setBackgroundObjects(data.updateBackgroundLayer.layer);
    }
  });
}

function loadCharacters() {
  apolloClient.query({
    query: gql`
      {
        allCharacters{pos{point{x y} rot size} name token players {id} id}
      }
    `
  })
  .then(({data}) => {
    store.commit("character/loadCharacters", data.allCharacters);
    tokenInit();
  })
  .catch(console.error);
}

function loadBackground() {
  apolloClient.query({
    query: gql`
      {
        getBackgroundLayer {layer}
      }
    `
  })
  .then(({data}) => {
    setBackgroundObjects(data.getBackgroundLayer.layer);
  })
  .catch(console.error);
}
