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

const allCharacters = gql`
  {
    allCharacters{pos{point{x y} rot size} name token players {id} id}
  }
`

const getBackgroundLayer = gql`
  {
    getBackgroundLayer {layer}
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

const updateBackgroundLayerSubscription = gql`
  subscription {
    updateBackgroundLayer {layer}
  }
`

const mutationBackgroundLayer = gql`
  mutation setBackgroundLayer($layer:JSON!){
    updateBackgroundLayer(layer:$layer) {layer}
  }
`

export default async function (context) {
  store = context.store;

  loadCharacters();
  subscribeCharacter();
  loadBackground();
  subscribeBackgroundLayer();

  setTimeout(() => {
    setBackgroundLayer([
        {
          "pos": {
            "x": 100,
            "y": 250,
            "width": 120,
            "height": 600
          },
          "draggable": false,
          "snapToGrid": true,
          "type": "rect",
          "color": "red",
          "rotation": 0
        },
        {
          "pos": {
            "x": 700,
            "y": 200,
            "width": 300,
            "height": 400
          },
          "draggable": false,
          "snapToGrid": true,
          "type": "img",
          "src": "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
          "rotation": 100
        }
      ]
    );
  }, 10000)
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

function setBackgroundLayer(layer) {
  apolloClient.mutate({
    mutation: mutationBackgroundLayer,
    variables: {
      layer: layer
    }
  }).catch(console.error);
}

function subscribeCharacter() {
  apolloClient.subscribe({
    query: updateCharacterSubscription
  }).subscribe({
    next({data}) {
      store.commit("character/updateCharacter", data.updateCharacter);
      tokenInit();
    }
  });
}

function subscribeBackgroundLayer() {
  apolloClient.subscribe({
    query: updateBackgroundLayerSubscription
  }).subscribe({
    next({data}) {
      setBackgroundObjects(data.updateBackgroundLayer.layer);
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

function loadBackground() {
  apolloClient.query({query: getBackgroundLayer})
    .then(({data}) => {
      setBackgroundObjects(data.getBackgroundLayer.layer);
    })
    .catch(console.error);
}
