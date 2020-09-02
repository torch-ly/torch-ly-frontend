import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import {setBackgroundObjects} from "~/logic/stage/layers/background/init";
import {clearTransformerNodes} from "~/logic/stage/layers/transformer";
import gql from "graphql-tag";
import {store} from "~/logic/stage/main";

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

export function loadBackground() {
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

export function subscribeBackgroundLayer() {
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
