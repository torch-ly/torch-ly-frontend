import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import {stage} from "~/logic/stage/main";
import gql from "graphql-tag";

export function getViewport() {
  apolloClient.query({
    query: gql`
      {
        getViewport {matrix}
      }`
  })
  .then(({data}) => {
    let matrix = data.getViewport;
    stage.scale(matrix.scale);
    stage.x(matrix.x);
    stage.y(matrix.y);
    stage.batchDraw();
  })
  .catch(logError);
}

export function setViewport() {
  console.log({
    matrix: {
      scale: stage.scale(),
      x: stage.x(),
      y: stage.y()
    }
  })
  apolloClient.mutate({
    mutation: gql`
      mutation setViewport($matrix:JSON!){
        updateViewport(matrix:$matrix) { matrix }
      }
    `,
    variables: {
      matrix: {
        scale: stage.scale(),
        x: stage.x(),
        y: stage.y()
      }
    }
  }).catch(logError);
}

export function subscribeViewport() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        updateViewport { matrix }
      }
    `
  }).subscribe({
    next({data}) {
      let matrix = data.updateViewport.matrix;
      stage.scale(matrix.scale);
      stage.x(matrix.x);
      stage.y(matrix.y);
      stage.batchDraw();
    }
  });
}
