import {apolloClient, logError} from "~/plugins/backendComunication/backendComunication";
import {init as tokenInit, updateCharacterAttrs} from "~/logic/stage/layers/token/init";
import gql from "graphql-tag";
import {store} from "~/logic/stage/main";
import {removeKonvaCharacter} from "@/logic/stage/layers/token/init";

export function setCharacterAttrs(id, rot, size) {
  apolloClient.mutate({
    mutation: gql`
      mutation fogOfWar($id:String!, $rot:Float!, $size:Int!){
        setCharacterRotationAndSize(id:$id, rot:$rot, size:$size) { id }
      }
    `,
    variables: {
      id: id,
      rot: rot,
      size: size
    }
  }).catch(logError);
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

export function loadCharacters() {
  apolloClient.query({
    query: gql`
      {
        allCharacters{pos{point{x y} rot size} name token players {id name} id details}
      }
    `
  })
  .then(({data}) => {
    store.commit("character/loadCharacters", data.allCharacters);
    tokenInit();
  })
  .catch(logError);
}

export function subscribeCharacter() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        updateCharacter {pos{point{x y} rot size} name token players {id name} id details}
      }
    `
  }).subscribe({
    next({data}) {
      store.commit("character/updateCharacter", data.updateCharacter);
      updateCharacterAttrs(data.updateCharacter);
    }
  });
}

export function subscribeRemoveCharacter() {
  apolloClient.subscribe({
    query: gql`
      subscription {
        removeCharacter
      }
    `
  }).subscribe({
    next({data}) {
      store.commit("character/removeCharacter", data.removeCharacter);
      removeKonvaCharacter(data.removeCharacter);
    }
  });
}

export function setCharacterPosition(characterID, point) {
  apolloClient.mutate({
    mutation: gql`
      mutation setCharacterPosition($id:String!, $x:Int!, $y:Int!){
        updateCharacterPosition(id:$id, x:$x, y:$y) {pos{point{x y} rot size} name token players {id} id}
      }
    `,
    variables: {
      id: characterID,
      x: point.x,
      y: point.y
    }
  }).catch(logError);
}

export function setCharacterPlayers(characterID, players) {
  apolloClient.mutate({
    mutation: gql`
      mutation setCharacterPlayers($id:String!, $players:[String!]!){
        setCharacterPlayers(id:$id, players:$players) {pos{point{x y} rot size} name token players {id} id}
      }
    `,
    variables: {
      id: characterID,
      players: players
    }
  }).catch(logError);

}

export function setCharacterDetails(characterID, details) {
  apolloClient.mutate({
    mutation: gql`
      mutation setCharacterDetails($id:String!, $details:JSON!){
        setCharacterDetails(id:$id, details:$details) {pos{point{x y} rot size} name token players {id} id}
      }
    `,
    variables: {
      id: characterID,
      details: details
    }
  }).catch(logError);

}
