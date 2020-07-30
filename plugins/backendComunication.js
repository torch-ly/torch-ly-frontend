import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import {init as tokenInit} from "../logic/stage/layers/token/init";
import {setBackgroundObjects} from "../logic/stage/layers/background/init";
import {getParameters} from "./utils/ParameterHelper";

const GRAPHQL_ENDPOINT = "ws://" + process.env.BACKEND + "/graphql";

let store = {};
let authID = getParameters().authID;

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
  connectionParams: {
    authID: authID
  },
  connectionCallback: error => error && console.error("WS connection error: ", error.message) // ToDo: catch in snackbar
});

const cache = new InMemoryCache();
const link = new WebSocketLink(client);


const apolloClient = new ApolloClient({
  cache,
  link
});

export default async function (context) {
  store = context.store;

  getPlayer();

  loadCharacters();
  subscribeCharacter();

  loadBackground();
  subscribeBackgroundLayer();
}

export function getPlayer() {
  apolloClient.query({
    query: gql`
    {
      me {id name}
    }`
  })
  .then(({data}) => store.commit("authentication/setPlayer", data.me))
  .catch(console.error);
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

export function addCharacter(character) {
  if (character.pos.point.x == undefined) {
    character.pos.point.x = 0;
  } else {
    character.pos.point.x = parseInt(character.pos.point.x);
  }

  if (character.pos.point.y == undefined) {
    character.pos.point.y = 0;
  } else {
    character.pos.point.y = parseInt(character.pos.point.y);
  }

  if (character.pos.size == undefined) {
  } else {
    character.pos.size = parseInt(character.pos.size);
  }


  apolloClient.mutate({
    mutation: gql`
      mutation addNewCharacter($name: String, $token: URL!, $pos: PositionSquareInput!, $sheet: URL, $visible: Boolean, $players: [String!]!){
        addCharacter(name:$name, token:$token, pos:$pos, sheet:$sheet, visible:$visible, players:$players) {id}
      }
    `,
    variables: {
      name: character.name,
      token: character.token,
      pos: character.pos,
      sheet: character.sheet !== "" ? character.sheet : null,
      visible: character.visible,
      players: character.player
    }
  }).catch(console.error);
}
