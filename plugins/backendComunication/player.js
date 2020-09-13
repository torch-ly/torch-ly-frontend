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

export function getAllPlayers() {
  //TODO add function
  console.log("get all players is not implemented yet")
  return [
    {
      id: "5f2983d7599a67fb4618c93a",
      name: "Ondolin"
    },
    {
      id: "5f2997012b10402e988db93f",
      name: "EricHier"
    },
    {
      id: "5f4e286d8b8c353cccb1971c",
      name: "Camaendir"
    }
  ]
}
