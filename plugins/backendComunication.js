import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import {init as tokenInit} from "../logic/stage/layers/token/init";
import {setBackgroundObjects} from "../logic/stage/layers/background/init";
import {getParameters} from "./utils/ParameterHelper";
import {reselectTokens} from "../logic/stage/layers/transformer";
import {clearTransformerNodes} from "@/logic/stage/layers/transformer";

const GRAPHQL_ENDPOINT = "ws://" + process.env.BACKEND + "/graphql";

let store = {};
let authID = getParameters().authID;

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
  connectionParams: {
    authID: authID
  },
  connectionCallback: error => error && logError("WS connection error: ", error.message) // ToDo: catch in snackbar
});

const cache = new InMemoryCache();
const link = new WebSocketLink(client);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
  cache,
  link,
  defaultOptions
});

export default async function (context) {
  store = context.store;

  getPlayer();

  loadCharacters();
  subscribeCharacter();

  loadBackground();
  subscribeBackgroundLayer();
  getBackgroundLayerNames();
}

export function getPlayer() {
  apolloClient.query({
    query: gql`
    {
      me {id name}
    }`
  })
  .then(({data}) => store.commit("authentication/setPlayer", data.me))
  .catch(logError);
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
  }).catch(logError);
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
  }).catch((e) => logError("Custom", e));
}

function subscribeCharacter() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        updateCharacter {pos{point{x y} rot size} name token players {id name} id}
      }
    `
  }).subscribe({
    next({data}) {
      store.commit("character/updateCharacter", data.updateCharacter);
      tokenInit();
      reselectTokens();
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
      clearTransformerNodes();
      setBackgroundObjects(data.updateBackgroundLayer.layer);
    }
  });
}

function loadCharacters() {
  apolloClient.query({
    query: gql`
      {
        allCharacters{pos{point{x y} rot size} name token players {id name} id}
      }
    `
  })
    .then(({data}) => {
      store.commit("character/loadCharacters", data.allCharacters);
      tokenInit();
    })
    .catch(logError);
}

export function removeCharacter(charcterID) {
  apolloClient.mutate({
    mutation: gql`
      mutation removeCharacter($id:String!){
        removeCharacter(id:$id)
      }
    `,
    variables: {
      id: charcterID
    }
  }).catch(logError);
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
    .catch(logError);
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
  }).catch(logError);
}

export function getBackgroundLayerNames() {
  apolloClient.query({
    query: gql`
      {
        getMaps { name selected }
      }`
  })
  .then(({data}) => store.commit("backgroundLayerNames/setLayers", data.getMaps))
  .catch(logError);
}

export async function getMonsters() {
  try {
    return await apolloClient.query({
      query: gql`
        {
          getMonsters
        }`
    });
  } catch {
    logError();
  }
}

export function setBackgroundLayerName(layer) {
  apolloClient.mutate({
    mutation: gql`
      mutation setMap($name:String!){
        loadMap(name:$name) { layer }
      }
    `,
    variables: {
      name: layer
    }
  }).catch(logError);
}

export function addMap(name) {
  apolloClient.mutate({
    mutation: gql`
      mutation setMap($name:String!){
        createMap(name:$name) { name selected }
      }
    `,
    variables: {
      name: name
    }
  }).catch(logError);
}

export function removeMap(name) {
  apolloClient.mutate({
    mutation: gql`
      mutation destroyMap($name:String!){
        deleteMap(name:$name) { name selected }
      }
    `,
    variables: {
      name: name
    }
  }).catch(logError);
}

function logError() {
  store.commit("errors/addError", "GraphQL Error")
}
