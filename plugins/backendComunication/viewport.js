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
    let matrix = data.matrix;
    stage.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
  })
  .catch(logError);
}

export function setViewport() {
  apolloClient.mutate({
    mutation: gql`
      mutation setViewport($matrix:JSON!){
        updateViewport(matix:$matrix) { matrix }
      }
    `,
    variables: {
      name: stage.getTransform().getMatrix()
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
      let matrix = data.matrix;
      stage.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }
  });
}
