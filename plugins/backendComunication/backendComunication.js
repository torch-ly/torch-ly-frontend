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
import {getInitiative, subscribeInitiative} from "@/plugins/backendComunication/initiative";
import {getAllPlayers} from "@/plugins/backendComunication/player";
import {subscribeRemoveCharacter} from "@/plugins/backendComunication/characters";
import {
  getAllDrawingObjects,
  subscribeClearAllDrawings,
  subscribeDrawing,
  subscribeRemoveDrawing
} from "@/plugins/backendComunication/drawing";
import {getBackendUrl} from "@/store/config";
import {getAuthID} from "@/store/authentication";

const secure = location.protocol === "https:" ? "wss" : "ws";
const GRAPHQL_ENDPOINT = secure + "://" + (getBackendUrl()) + ":5000/graphql";

let store = {};
let authID = getAuthID();

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
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
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
  getAllPlayers();

  loadCharacters();
  subscribeCharacter();
  subscribeRemoveCharacter();

  getAllDrawingObjects();
  subscribeDrawing();
  subscribeRemoveDrawing();
  subscribeClearAllDrawings();

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

  getInitiative();
  subscribeInitiative();
}

export function logError(err) {
  console.error(err)
  store.commit("errors/addError", "GraphQL Error")
}
