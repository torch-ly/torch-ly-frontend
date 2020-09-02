import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import gql from "graphql-tag";
import {store} from "~/logic/stage/main";

export function getPlayer() {
  apolloClient.query({
    query: gql`
      {
        me {id name gm}
      }`
  })
  .then(({data}) => store.commit("authentication/setPlayer", data.me))
  .catch(logError);
}
