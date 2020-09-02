import {SubscriptionClient} from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";
import {WebSocketLink} from "apollo-link-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getParameters} from "../utils/ParameterHelper";
import {getPlayer} from "~/plugins/backendComunication/player";
import {getBackgroundLayerNames, loadBackground, subscribeBackgroundLayer} from "~/plugins/backendComunication/map";
import {getFogOfWar, subscribeFogOfWar} from "~/plugins/backendComunication/fogOfWar";
import {loadCharacters, subscribeCharacter} from "~/plugins/backendComunication/characters";
import {getViewport, subscribeViewport} from "~/plugins/backendComunication/viewport";
import devices from "@/enums/devices";

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

export const apolloClient = new ApolloClient({
  cache,
  link,
  defaultOptions
});

export default async function (context) {
  store = context.store;

  getPlayer();

  loadCharacters();
  subscribeCharacter();

  if (store.state.config.device !== devices.MOBILE)
    loadTable();
}

function loadTable() {
  loadBackground();
  subscribeBackgroundLayer();
  getBackgroundLayerNames();

  getFogOfWar();
  subscribeFogOfWar();

  getViewport();
  subscribeViewport();
}

export function logError(...err) {
  console.error(err)
  store.commit("errors/addError", "GraphQL Error")
}
